import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCurrentSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in — Flower Ranch Hawaii",
  // Sign-in screen — keep it out of the index.
  robots: { index: false, follow: false },
};

/** Only allow internal, non-auth paths as a post-login destination. */
function safeReturnTo(raw: string | undefined): string {
  if (!raw) return "/account";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/api/auth")) {
    return "/account";
  }
  return raw;
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  // Already signed in → straight to the account.
  const session = await getCurrentSession();
  if (session) redirect("/account");

  const { return_to } = await searchParams;
  const dest = safeReturnTo(return_to);
  // The actual credential entry happens on the hosted Souped login; these
  // buttons route there. The email/password fields below are presentational
  // for now (the visual matches a standard storefront sign-in).
  const loginHref = `/api/auth/login?return_to=${encodeURIComponent(dest)}`;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-5 py-16"
      style={{ backgroundColor: "#fbfdf8" }}
    >
      <div className="w-full max-w-md rounded-2xl border border-fr-border bg-white p-8 shadow-[0_24px_60px_-34px_rgba(0,70,85,0.4)] sm:p-10">
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto flex w-fit items-center justify-center"
          aria-label="Flower Ranch Hawaii — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="" className="h-12 w-auto" />
          <span className="sr-only">Flower Ranch Hawaii</span>
        </Link>

        <h1 className="mt-6 text-center font-heading text-3xl font-bold tracking-tight text-fr-ink">
          Sign in
        </h1>
        <p className="mt-2 text-center text-sm text-fr-muted">
          Welcome back — sign in to your account.
        </p>

        {/* Form (presentational for now — buttons route to secure sign-in) */}
        <div className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-fr-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              className="h-12 w-full rounded-xl border border-fr-border bg-white px-4 text-sm text-fr-ink outline-none transition-colors placeholder:text-fr-muted/70 focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/40"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-fr-ink">
                Password
              </label>
              <a href={loginHref} className="text-sm text-fr-muted transition-colors hover:text-fr-teal">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-fr-border bg-white px-4 text-sm text-fr-ink outline-none transition-colors placeholder:text-fr-muted/70 focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/40"
            />
          </div>
        </div>

        {/* Actions — site button language (rounded pills, brand colors) */}
        <a
          href={loginHref}
          className="mt-7 flex h-12 w-full items-center justify-center rounded-full bg-fr-lime text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
        >
          Sign in
        </a>
        <a
          href={loginHref}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-fr-border bg-white text-sm font-semibold text-fr-teal transition-colors hover:bg-fr-wash"
        >
          Create account
        </a>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fr-ink/70 transition-colors hover:text-fr-teal"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to store
      </Link>
    </main>
  );
}
