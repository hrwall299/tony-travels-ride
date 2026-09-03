import { createFileRoute } from "@tanstack/react-router";
import { VehicleEditor } from "@/components/admin/ContentEditors";

export const Route = createFileRoute("/admin/vehicle")({
  component: VehicleEditor,
});
