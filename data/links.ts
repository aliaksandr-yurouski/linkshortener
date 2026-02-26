import { db } from '@/db';
import { links } from '@/db/schema';
import type { Link } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.createdAt));
}

export interface CreateLinkInput {
  slug: string;
  originalUrl: string;
  userId: string;
}

export async function createLink(input: CreateLinkInput): Promise<Link> {
  const [link] = await db.insert(links).values(input).returning();
  return link;
}

export interface UpdateLinkInput {
  slug: string;
  originalUrl: string;
}

export async function updateLink(id: number, userId: string, input: UpdateLinkInput): Promise<Link | null> {
  const [link] = await db
    .update(links)
    .set(input)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link ?? null;
}

export async function deleteLink(id: number, userId: string): Promise<void> {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkBySlug(slug: string): Promise<Link | null> {
  const [link] = await db.select().from(links).where(eq(links.slug, slug));
  return link ?? null;
}
