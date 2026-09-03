import { createFileRoute } from "@tanstack/react-router";
import { AboutEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/about")({
  component: AboutEditor,
});
