import { useRef, useState } from "react";
import { Copy, Trash2, Upload } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteMedia, uploadMedia, useMediaLibrary } from "@/lib/admin";
import { mediaUrl } from "@/lib/media";

const isVideo = (name: string) => /\.(mp4|webm|mov|m4v)$/i.test(name);

export function MediaManager() {
  const { data, isLoading } = useMediaLibrary();
  const qc = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["media-library"] });

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setMsg(null);
    try {
      for (const file of Array.from(files)) await uploadMedia(file);
      await refresh();
      setMsg("Upload complete.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={ref}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => void onFiles(e.target.files)}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground disabled:opacity-60"
        >
          <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload files"}
        </button>
        {msg ? <span className="text-sm text-muted-foreground">{msg}</span> : null}
      </div>

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading library…</p>
      ) : !data?.length ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No files uploaded yet. Uploaded files can then be chosen inside each section editor.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.map((f) => (
            <figure key={f.path} className="border border-border">
              {isVideo(f.name) ? (
                <video src={mediaUrl(f.path)} className="aspect-[4/3] w-full object-cover" muted />
              ) : (
                <img
                  src={mediaUrl(f.path)}
                  alt={f.name}
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <figcaption className="border-t border-border p-2">
                <p className="truncate text-xs text-muted-foreground" title={f.name}>
                  {f.name}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => void navigator.clipboard.writeText(f.path)}
                    className="inline-flex h-8 flex-1 items-center justify-center gap-1 border border-border text-xs"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copy path
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await deleteMedia(f.path);
                      await refresh();
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center border border-border text-destructive"
                    aria-label="Delete file"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
