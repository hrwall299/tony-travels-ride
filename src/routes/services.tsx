import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Travel Services — Local, Outstation & Airport | Tony Tour & Travels" },
      {
        name: "description",
        content:
          "Local travel in Khammam, outstation trips across Telangana and Andhra Pradesh, one-way and round trips, and airport transfers.",
      },
      { property: "og:title", content: "Travel Services | Tony Tour & Travels" },
      {
        property: "og:description",
        content: "Local, outstation, one-way, round trip and airport transfer services.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Travel Services From Khammam"
        text="Whether it is a short local ride or a multi-day outstation journey, we plan the trip around your schedule."
      />
      <Services compact />
      <WhyChooseUs />
    </>
  );
}
