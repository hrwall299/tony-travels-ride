import { createFileRoute } from "@tanstack/react-router";
import { ServicesEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/services")({
  component: ServicesEditor,
});
