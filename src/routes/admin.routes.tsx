import { createFileRoute } from "@tanstack/react-router";
import { RoutesEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/routes")({
  component: RoutesEditor,
});
