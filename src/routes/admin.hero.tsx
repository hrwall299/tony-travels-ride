import { createFileRoute } from "@tanstack/react-router";
import { HeroEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/hero")({
  component: HeroEditor,
});
