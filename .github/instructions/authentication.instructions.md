---
description: This file describes the authentication rules for the project.
---

# Authentication

## Rules

- **Clerk is the only permitted authentication method.** Never implement custom sessions, JWTs, or any third-party auth library.
- All auth logic must use `@clerk/nextjs` (client) or `@clerk/nextjs/server` (server).

## Route Protection

### `/dashboard` — protected route

`/dashboard` must only be accessible to signed-in users. Enforce this in `proxy.ts` using `createRouteMatcher`:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});
```

### Homepage redirect for signed-in users

If an authenticated user visits `/`, redirect them to `/dashboard`:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher(["/dashboard(.*)"]);
const isHome = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();

  const { userId } = await auth();
  if (isHome(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});
```

### Homepage redirect for unauthenticated users

If an unauthenticated user tries to access any protected route, redirect them to `/` instead of Clerk's default sign-in page. Use `NextResponse.redirect` after checking `userId` rather than calling `auth.protect()`:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher(["/dashboard(.*)"]);
const isHome = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtected(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isHome(req) && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});
```

Do **not** call `auth.protect()` for routes where the desired unauthenticated fallback is the homepage — it redirects to Clerk's hosted sign-in page instead.

## Sign-In / Sign-Up Modals

Sign-in and sign-up must always open as **modals** — never navigate to a dedicated page. Use Clerk's `mode="modal"` prop on the trigger components:

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignedOut>
  <SignInButton mode="modal">
    <button>Sign in</button>
  </SignInButton>
  <SignUpButton mode="modal">
    <button>Sign up</button>
  </SignUpButton>
</SignedOut>
```

Do **not** create `app/sign-in/` or `app/sign-up/` route pages.

## Layout

Wrap the entire app in `<ClerkProvider>` in `app/layout.tsx`. Place auth UI components (`SignedIn`, `SignedOut`, `UserButton`) in the shared header inside the root layout.

## Server-Side Auth

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId } = await auth(); // lightweight — userId only
const user = await currentUser(); // full user object, use sparingly
```

- Always verify `userId` is non-null before performing any database mutation.
- Store Clerk's `userId` string as `user_id` in database tables.

## Client-Side Auth

```tsx
"use client";
import { useUser } from "@clerk/nextjs";

const { user, isLoaded } = useUser();
```

Use client hooks only inside `"use client"` components. Gate UI on `isLoaded` to avoid hydration flashes.
