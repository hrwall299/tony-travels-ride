import { useRef, useState } from "react";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { uploadMedia } from "@/lib/admin";
import { mediaUrl } from "@/lib/media";

export const inputClass =
  "mt-1.5 h-10 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary";

export const areaClass =
  "mt-1.5 w-full border border-border bg-background p-3 text-sm text-foreground outline-none transition-colors focus:border-primary";

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string | undefined;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string | undefined;
}) {
  return (
    <AdminField label={label} hint={hint}>
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </AdminField>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <AdminField label={label}>
      <textarea
        className={areaClass}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </AdminField>
  );
}

export function SaveBar({
  onSave,
  saving,
  saved,
  error,
}: {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  error?: string | null | undefined;
}) {
  return (
    <div className="sticky bottom-0 mt-8 flex flex-wrap items-center gap-3 border-t border-border bg-background/95 py-3 backdrop-blur">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex h-10 items-center bg-primary px-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
      {saved ? <span className="text-sm text-primary">Saved. The website is updated.</span> : null}
      {error ? <span className="text-sm text-destructive">{error}</span> : null}
    </div>
  );
}

export function AdminCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border p-5">
      <h2 className="font-display text-lg font-bold uppercase text-primary-dark">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

/** Upload button + inline preview for a single stored file (image or video). */
export function MediaField({
  label,
  value,
  onChange,
  accept = "image/*",
  kind = "image",
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
  accept?: string;
  kind?: "image" | "video";
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setErr(null);
    try {
      onChange(await uploadMedia(file));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="mt-2 flex flex-wrap items-start gap-4">
        <div className="h-24 w-40 shrink-0 border border-border bg-surface">
          {value ? (
            kind === "video" ? (
              <video src={mediaUrl(value)} className="h-full w-full object-cover" muted />
            ) : (
              <img src={mediaUrl(value)} alt="" className="h-full w-full object-cover" />
            )
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No file
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={ref}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => void pick(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={busy}
            className="inline-flex h-9 items-center gap-2 border border-border px-3 text-sm font-medium text-primary-dark hover:border-primary disabled:opacity-60"
          >
            <Upload className="h-4 w-4" /> {busy ? "Uploading…" : value ? "Replace" : "Upload"}
          </button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex h-9 items-center gap-2 border border-border px-3 text-sm text-destructive hover:border-destructive"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          ) : null}
          {err ? <span className="text-xs text-destructive">{err}</span> : null}
        </div>
      </div>
    </div>
  );
}

export function MoveButtons({
  index,
  length,
  onMove,
  onDelete,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Move up"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="inline-flex h-8 w-8 items-center justify-center border border-border disabled:opacity-40"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Move down"
        disabled={index === length - 1}
        onClick={() => onMove(index, index + 1)}
        className="inline-flex h-8 w-8 items-center justify-center border border-border disabled:opacity-40"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        onClick={() => onDelete(index)}
        className="inline-flex h-8 w-8 items-center justify-center border border-border text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function move<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  if (item === undefined) return arr;
  copy.splice(to, 0, item);
  return copy;
}
