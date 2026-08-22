import { createFileRoute } from "@tanstack/react-router";
import { Destinations } from "@/components/sections/Destinations";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/routes")({
  head: () => ({
    meta: [
      { title: "Routes & Destinations From Khammam | Tony Tour & Travels" },
      {
        name: "description",
        content:
          "Khammam to Hyderabad, Warangal, Suryapet, Vijayawada, Secunderabad and other towns across Telangana and Andhra Pradesh.",
      },
      { property: "og:title", content: "Routes & Destinations | Tony Tour & Travels" },
      {
        property: "og:description",
        content: "Popular routes we travel from Khammam across Telangana and Andhra Pradesh.",
      },
    ],
  }),
  component: RoutesPage,
});

function RoutesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Routes"
        title="Where We Travel"
        text="Popular routes from Khammam — and plenty of destinations beyond them."
      />
      <Destinations />
    </>
  );
}
