import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AccountPanel } from "@/components/admin/AccountPanel";
import { EnquiriesPanel } from "@/components/admin/EnquiriesPanel";
import { MediaManager } from "@/components/admin/MediaManager";
import {
  AboutEditor,
  ContactEditor,
  FooterEditor,
  HeroEditor,
  RoutesEditor,
  ServicesEditor,
  VehicleEditor,
} from "@/components/admin/ContentEditors";
import { inputClass } from "@/components/admin/ui";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Tony Tour & Travels" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private content management dashboard." },
    ],
  }),
  component: AdminPage,
});

const TABS = [
  { id: "enquiries", label: "Enquiries" },
  { id: "hero", label: "Home / Hero" },
  { id: "vehicle", label: "Vehicle" },
  { id: "services", label: "Services" },
  { id: "routes", label: "Routes" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "footer", label: "Footer" },
  { id: "media", label: "Media" },
  { id: "account", label: "Account" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("enquiries");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    let alive = true;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (alive) setIsAdmin(Boolean(data));
      });
    return () => {
      alive = false;
    };
  }, [session]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!ready) {
    return <div className="section-x py-24 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!session) return <LoginGate />;

  if (isAdmin === false) {
    return (
      <div className="section-x space-y-4 py-24">
        <h1 className="font-display text-2xl font-bold uppercase text-primary-dark">
          Not authorised
        </h1>
        <p className="text-sm text-muted-foreground">
          This account does not have administrator access.
        </p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold uppercase"
        >
          Log out
        </button>
      </div>
    );
  }

  if (isAdmin === null) {
    return <div className="section-x py-24 text-sm text-muted-foreground">Checking access…</div>;
  }

  return (
    <div className="section-x py-10 lg:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 font-display text-2xl font-bold uppercase text-primary-dark sm:text-3xl">
            Website Administration
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">{session.user.email}</p>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`h-9 border px-3 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-primary-dark hover:border-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="mt-8 space-y-6">
        {tab === "enquiries" ? <EnquiriesPanel /> : null}
        {tab === "hero" ? <HeroEditor /> : null}
        {tab === "vehicle" ? <VehicleEditor /> : null}
        {tab === "services" ? <ServicesEditor /> : null}
        {tab === "routes" ? <RoutesEditor /> : null}
        {tab === "about" ? <AboutEditor /> : null}
        {tab === "contact" ? <ContactEditor /> : null}
        {tab === "footer" ? <FooterEditor /> : null}
        {tab === "media" ? <MediaManager /> : null}
        {tab === "account" ? (
          <AccountPanel email={session.user.email ?? ""} onSignOut={() => void signOut()} />
        ) : null}
      </main>
    </div>
  );
}

function LoginGate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "reset">("login");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      if (mode === "reset") {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/admin`,
        });
        if (err) setError(err.message);
        else setNotice("If that account exists, a password reset link has been sent.");
        return;
      }

      const creds = { email: email.trim().toLowerCase(), password };
      const { error: signInError } = await supabase.auth.signInWithPassword(creds);
      if (!signInError) return;

      // First-time setup: create the account if it does not exist yet.
      const { error: signUpError } = await supabase.auth.signUp(creds);
      if (signUpError) {
        setError("Invalid email or password.");
        return;
      }
      const { error: retry } = await supabase.auth.signInWithPassword(creds);
      if (retry) setNotice("Account created. Please log in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="section-x flex justify-center py-20">
      <form onSubmit={submit} className="w-full max-w-sm border border-border p-6">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 font-display text-2xl font-bold uppercase text-primary-dark">
          {mode === "login" ? "Sign In" : "Reset Password"}
        </h1>

        <label className="mt-6 block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            className={inputClass}
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {mode === "login" ? (
          <label className="mt-4 block">
            <span className="text-sm font-medium text-foreground">Password</span>
            <input
              className={inputClass}
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex h-11 w-full items-center justify-center bg-primary text-sm font-semibold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "login" ? "Log in" : "Send reset link"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "reset" : "login");
            setError(null);
            setNotice(null);
          }}
          className="mt-4 text-sm text-muted-foreground underline"
        >
          {mode === "login" ? "Forgot password?" : "Back to login"}
        </button>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        {notice ? <p className="mt-4 text-sm text-primary">{notice}</p> : null}
      </form>
    </div>
  );
}
