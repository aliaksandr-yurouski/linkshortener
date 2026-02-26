---
description: Rules for writing and organizing server actions in this project.
---

# Server Actions

## File Organization

- Server action files **must** be named `actions.ts`.
- Each `actions.ts` file must be **collocated** in the same directory as the component that calls it.

## Calling Convention

- Server actions must be called **from Server Components only**.

## Input Types

- All data passed to a server action must have an explicit **TypeScript type**.
- Never use `FormData` as a parameter type — define a typed object instead.

## Validation

- All incoming data **must be validated with Zod** before any business logic or DB access.

## Authentication

- Every server action **must check for a logged-in user** (via Clerk) as its first step before proceeding with any database operations.

## Return Value

- Every server action must return a plain object with either a `success` or `error` property.
- Example: `{ success: true }` or `{ error: "Something went wrong" }`.
- Never throw errors from a server action — catch them and return `{ error: message }` instead.

## Database Access

- Server actions **must not** use Drizzle queries directly.
- All DB operations must go through **helper functions** located in the `/data` directory.
