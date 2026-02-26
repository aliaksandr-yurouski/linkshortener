# Agent Instructions — Link Shortener

This file is the entry point for LLM coding agents working on this project. Read it before making any changes.

## Project Summary

A URL shortening application built with Next.js 16 (App Router), TypeScript, Drizzle ORM on Neon PostgreSQL, styled with Tailwind CSS v4, and authenticated via Clerk.

## Quick Rules

1. **TypeScript strict** — no `any`, no unchecked non-null assertions.
2. **Server Components by default** — add `"use client"` only when necessary.
3. **All DB access through `@/db`** — never instantiate a new Drizzle client.
4. **Never use `middleware.ts`** — `middleware.ts` is deprecated in later Next.js versions; use `proxy.ts` instead for middleware/proxy behavior.
5. **All auth through Clerk** — never bypass `clerkMiddleware` or roll custom sessions.
6. **shadcn/ui components only** — never build custom UI components; always use or compose shadcn/ui primitives.
7. **Tailwind utilities only** — no custom CSS unless registering a design token in `@theme`.
8. **Path alias `@/*`** — use it instead of relative imports going two or more levels up.
9. **Never edit auto-generated files** — `types/routes.d.ts`, `types/validator.ts`, `next-env.d.ts`.
10. **Run `npx drizzle-kit generate` after schema changes** and commit the resulting migration files.
