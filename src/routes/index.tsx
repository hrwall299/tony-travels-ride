import { createFileRoute } from "@tanstack/react-router";
import { Destinations } from "@/components/sections/Destinations";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { VehicleGallery } from "@/components/sections/VehicleGallery";
import { VehicleVideo } from "@/components/sections/VehicleVideo";
import { VehicleViewer } from "@/components/sections/VehicleViewer";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tony Tour & Travels — Car Travels in Khammam, Telangana" },
      {
        name: "description",
        content:
          "Reliable car travel and cab service from Khammam to Hyderabad, Warangal, Vijayawada and across Telangana & Andhra Pradesh. Book on WhatsApp.",
      },
      { property: "og:title", content: "Tony Tour & Travels — Car Travels in Khammam" },
      {
        property: "og:description",
        content: "Local and outstation car travel from Khammam. Book your ride on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <VehicleViewer />
      <Services />
      <Destinations />
      <WhyChooseUs />
    </>
  );
}
