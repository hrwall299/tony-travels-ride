import { createFileRoute } from "@tanstack/react-router";
import { FooterEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/footer")({
  component: FooterEditor,
});
