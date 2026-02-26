"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { customAlphabet } from "nanoid";

const nanoidLower = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);
import { revalidatePath } from "next/cache";
import { createLink, updateLink, deleteLink } from "@/data/links";

const slugRule = z
  .string()
  .max(50, "Slug must be 50 characters or fewer")
  .regex(
    /^[a-z0-9-]+$/,
    "Slug may only contain lowercase letters, numbers, and hyphens"
  );

const createLinkSchema = z.object({
  slug: z.union([z.literal(""), slugRule]).optional(),
  originalUrl: z.string().url("Must be a valid URL"),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(
  input: CreateLinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Not authenticated" };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const slug = parsed.data.slug || nanoidLower();

  try {
    await createLink({ slug, originalUrl: parsed.data.originalUrl, userId });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create link";
    if (message.includes("unique")) {
      return { error: "That slug is already taken. Please choose another." };
    }
    return { error: message };
  }
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  slug: slugRule,
  originalUrl: z.string().url("Must be a valid URL"),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Not authenticated" };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    const updated = await updateLink(parsed.data.id, userId, {
      slug: parsed.data.slug,
      originalUrl: parsed.data.originalUrl,
    });
    if (!updated) {
      return { error: "Link not found or you do not have permission." };
    }
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update link";
    if (message.includes("unique")) {
      return { error: "That slug is already taken. Please choose another." };
    }
    return { error: message };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Not authenticated" };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  try {
    await deleteLink(parsed.data.id, userId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to delete link";
    return { error: message };
  }
}
