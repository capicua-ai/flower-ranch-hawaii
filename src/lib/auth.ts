import { getSession } from "@souped-tools/auth-nextjs";
import { redirect } from "next/navigation";
import type { User } from "@/generated/prisma/client";
import { db } from "@/lib/db";

export type CurrentSession = Awaited<ReturnType<typeof getSession>>;

const LOGIN_PATH = "/api/auth/login";

/**
 * Single entry point for reading the current user's session from server
 * components, server actions, and route handlers. Returns `null` if there
 * is no session. The JWT carries `sub`, `email`, and `roles`.
 */
export async function getCurrentSession(): Promise<CurrentSession> {
  return getSession();
}

/**
 * Lazy-sync: ensure a local `User` row mirrors the Souped JWT, and return it.
 * Upserts on every call keyed by the JWT `sub`. Returns `null` when there is
 * no active session (caller decides whether that's allowed).
 */
export async function getOrCreateUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;

  return db.user.upsert({
    where: { soupedId: session.sub },
    create: {
      soupedId: session.sub,
      email: session.email,
      roles: session.roles ?? [],
    },
    update: {
      email: session.email,
      roles: session.roles ?? [],
      lastSyncAt: new Date(),
    },
  });
}

/**
 * Require an authenticated user. Redirects to the Souped login flow when
 * there is no session. Use at the top of any protected server component or
 * action — defense in depth alongside the proxy matcher.
 */
export async function requireUser(): Promise<User> {
  const user = await getOrCreateUser();
  if (!user) redirect(LOGIN_PATH);
  return user;
}

/**
 * Require an authenticated user that holds `role`. Redirects unauthenticated
 * users to login; sends authenticated-but-unauthorized users home.
 */
export async function requireRole(role: string): Promise<User> {
  const user = await requireUser();
  if (!user.roles.includes(role)) redirect("/");
  return user;
}
