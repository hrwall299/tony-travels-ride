import { createFileRoute } from "@tanstack/react-router";
import { ContactEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/contact")({
  component: ContactEditor,
});
