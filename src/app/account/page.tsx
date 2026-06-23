import type { Metadata } from "next";
import Link from "next/link";
import { Package, User } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";

export const metadata: Metadata = {
  title: "Your Account — Flower Ranch Hawaii",
};

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <span className="font-mono text-xs uppercase tracking-widest text-fr-teal/70">
            Your Account
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink">Welcome back</h1>
          <p className="mt-3 text-lg text-fr-muted">
            Manage your profile and track your orders. (Account features are wired with Souped auth.)
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-fr-border p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fr-wash text-fr-teal">
                <User className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-fr-ink">Profile</h2>
              <p className="mt-1 text-sm text-fr-muted">Your name, email, and shipping address.</p>
            </div>
            <div className="rounded-3xl border border-fr-border p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fr-wash text-fr-teal">
                <Package className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-fr-ink">Orders</h2>
              <p className="mt-1 text-sm text-fr-muted">Track current and past longan orders.</p>
            </div>
          </div>

          <Link
            href="/api/auth/logout"
            className="mt-10 inline-flex h-11 items-center justify-center rounded-full border border-fr-border px-6 text-sm font-semibold text-fr-teal transition-colors hover:bg-fr-wash"
          >
            Sign out
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
