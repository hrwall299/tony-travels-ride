import { createFileRoute } from "@tanstack/react-router";

/**
 * Public read-only proxy for files stored in the private "media" bucket.
 * Admin uploads land in the bucket; the public website reads them through here.
 */
export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Redirect to a signed storage URL so the browser talks to storage
        // directly — that endpoint supports HTTP Range requests, which media
        // playback (seeking, streaming large videos) requires.
        const { data: signed } = await supabaseAdmin.storage
          .from("media")
          .createSignedUrl(path, 60 * 60);

        if (signed?.signedUrl) {
          return new Response(null, {
            status: 302,
            headers: {
              location: signed.signedUrl,
              "cache-control": "public, max-age=300",
            },
          });
        }

        const { data, error } = await supabaseAdmin.storage.from("media").download(path);

        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(data.stream(), {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "cache-control": "public, max-age=300",
            "accept-ranges": "none",
          },
        });
      },

    },
  },
});
