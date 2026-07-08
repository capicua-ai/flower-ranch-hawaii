import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  // Credential entry happens on Souped's secure hosted sign-in (email one-time
  // code). This branded screen is the app-native lead-in; the CTA hands off to
  // the OAuth flow. We never collect credentials in-app.
  const loginHref = `/api/auth/login?return_to=${encodeURIComponent(dest)}`;

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-5 py-16"
      style={{ backgroundColor: "#fbfdf8" }}
    >
      <div className="w-full max-w-md rounded-2xl border border-fr-border bg-white p-8 text-center shadow-[0_24px_60px_-34px_rgba(0,70,85,0.4)] sm:p-10">
        {/* Logo */}
        <Link
          href="/"
          className="mx-auto flex w-fit items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fr-lime"
          aria-label="Flower Ranch Hawaii — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="" className="h-12 w-auto" />
          <span className="sr-only">Flower Ranch Hawaii</span>
        </Link>

        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-fr-ink">
          Sign in to your account
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-fr-muted">
          We&rsquo;ll email you a one-time code — no password to remember. Sign in to
          track your orders and manage your account.
        </p>

        {/* Primary action — hands off to the secure Souped sign-in */}
        <a
          href={loginHref}
          className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fr-lime text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
        >
          Continue to sign in
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <p className="mt-4 text-xs leading-relaxed text-fr-muted">
          New here? Continue and create your account in the same step.
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-fr-ink/70 transition-colors hover:text-fr-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to store
      </Link>
    </main>
  );
}
