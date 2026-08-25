import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminCard, inputClass } from "./ui";

function PasswordInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <input
          className={`${inputClass} pr-11`}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-0 top-1.5 flex h-10 w-10 items-center justify-center text-muted-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}

export function AccountPanel({ email, onSignOut }: { email: string; onSignOut: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (next.length < 8) {
      setStatus({ ok: false, text: "New password must be at least 8 characters." });
      return;
    }
    if (next !== confirm) {
      setStatus({ ok: false, text: "New password and confirmation do not match." });
      return;
    }

    setBusy(true);
    try {
      // Verify the current password by re-authenticating before changing it.
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: current,
      });
      if (signInError) {
        setStatus({ ok: false, text: "Current password is incorrect." });
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: next });
      if (error) {
        setStatus({ ok: false, text: error.message });
        return;
      }

      setCurrent("");
      setNext("");
      setConfirm("");
      setStatus({ ok: true, text: "Password updated. Use the new password next time you log in." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <AdminCard title="Account" description="The signed-in administrator account.">
        <p className="text-sm text-foreground">
          <span className="text-muted-foreground">Email: </span>
          {email}
        </p>
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold uppercase tracking-wide text-primary-dark hover:border-primary"
        >
          Log out
        </button>
      </AdminCard>

      <AdminCard title="Change password" description="Minimum 8 characters.">
        <form onSubmit={submit} className="space-y-4">
          <PasswordInput label="Current password" value={current} onChange={setCurrent} />
          <PasswordInput label="New password" value={next} onChange={setNext} />
          <PasswordInput label="Confirm new password" value={confirm} onChange={setConfirm} />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex h-10 items-center bg-primary px-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
          {status ? (
            <p className={`text-sm ${status.ok ? "text-primary" : "text-destructive"}`}>
              {status.text}
            </p>
          ) : null}
        </form>
      </AdminCard>
    </div>
  );
}
