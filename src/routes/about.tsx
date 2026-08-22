import { createFileRoute, Link } from "@tanstack/react-router";
import road from "@/assets/road.jpg";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PageHeader } from "@/components/site/PageHeader";
import { business } from "@/config/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Tony Tour & Travels, Khammam" },
      {
        name: "description",
        content:
          "Tony Tour & Travels is a Khammam-based car travel service offering dependable local and outstation journeys across Telangana and Andhra Pradesh.",
      },
      { property: "og:title", content: "About Tony Tour & Travels, Khammam" },
      {
        property: "og:description",
        content: "A local car travel service built on punctuality, clean cars and clear pricing.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Travel With Confidence"
        text={`${business.shortName} is a ${business.city}-based car travel service built on punctual pickups, clean vehicles and straightforward communication.`}
      />

      <section className="section-x grid gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <img
          src={road}
          alt="Highway journey from Khammam"
          loading="lazy"
          className="w-full object-cover"
        />
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-primary-dark">
            A Local Service You Can Call Directly
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We run travel from Khammam every day — office commutes, hospital visits, family
            functions, temple trips and airport runs. Every booking is handled personally, so you
            always know who is driving and what the trip will cost.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            No apps, no call centres and no surge pricing. Send your trip details on WhatsApp and
            we confirm availability and fare before you travel.
          </p>
          <Link
            to="/book"
            className="mt-8 inline-flex h-12 items-center bg-primary px-6 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Book Your Ride
          </Link>
        </div>
      </section>

      <WhyChooseUs />
    </>
  );
}
