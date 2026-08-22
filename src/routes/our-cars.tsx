import { createFileRoute } from "@tanstack/react-router";
import { VehicleDetails } from "@/components/sections/VehicleDetails";
import { VehicleViewer } from "@/components/sections/VehicleViewer";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/our-cars")({
  head: () => ({
    meta: [
      { title: "Our Cars — Hyundai Venue | Tony Tour & Travels" },
      {
        name: "description",
        content:
          "See the vehicle you travel in: a well-maintained Hyundai Venue with clean interiors, air conditioning and ample luggage space.",
      },
      { property: "og:title", content: "Our Cars — Hyundai Venue | Tony Tour & Travels" },
      {
        property: "og:description",
        content: "Exterior, interior and luggage space of our Hyundai Venue.",
      },
    ],
  }),
  component: OurCars,
});

function OurCars() {
  return (
    <>
      <PageHeader
        eyebrow="Our Fleet"
        title="The Car You Travel In"
        text="A well-maintained Hyundai Venue kept clean and serviced for every journey."
      />
      <VehicleViewer />
      <VehicleDetails />
    </>
  );
}
