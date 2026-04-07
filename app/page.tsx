"use client"

import Link from "next/link";
import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-amber-400 font-bold text-xl tracking-tight">
          ClerkStarter
        </span>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton>
              <button className="text-sm text-white/70 hover:text-white transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="text-sm bg-amber-400 hover:bg-amber-300 text-black font-semibold px-4 py-2 rounded-lg transition">
                Get Started
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="text-sm bg-amber-400 hover:bg-amber-300 text-black font-semibold px-4 py-2 rounded-lg transition">
              Dashboard
            </Link>
          </Show>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 gap-6">
        <div className="inline-block bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-2">
          Next.js + Clerk + Neon
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight max-w-3xl tracking-tight">
          Auth that just <span className="text-amber-400">works.</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl">
          A minimal starter with Clerk authentication, Neon database, and
          Drizzle ORM. Sign up and your account syncs automatically.
        </p>
        <div className="flex gap-4 mt-4">
          <Show when="signed-out">
            <SignUpButton>
              <button className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-xl transition text-sm">
                Create Account
              </button>
            </SignUpButton>
            <SignInButton>
              <button className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white px-6 py-3 rounded-xl transition text-sm">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="bg-amber-400 hover:bg-amber-300 text-black font-bold px-6 py-3 rounded-xl transition text-sm">
              Go to Dashboard →
            </Link>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto px-6 pb-32">
        {[
          {
            title: "Clerk Auth",
            desc: "Sign up, sign in, and user management out of the box.",
          },
          {
            title: "Neon + Drizzle",
            desc: "Serverless Postgres with a type-safe ORM.",
          },
          {
            title: "Webhook Sync",
            desc: "Users auto-synced to your database on registration.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition">
            <h3 className="text-amber-400 font-semibold mb-2">{f.title}</h3>
            <p className="text-white/50 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}