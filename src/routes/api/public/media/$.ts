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
        const { data, error } = await supabaseAdmin.storage.from("media").download(path);

        if (error || !data) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(data.stream(), {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
