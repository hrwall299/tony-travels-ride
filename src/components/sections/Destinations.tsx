import { Link } from "@tanstack/react-router";
import hyderabad from "@/assets/dest-hyderabad.jpg";
import khammam from "@/assets/dest-khammam.jpg";
import vijayawada from "@/assets/dest-vijayawada.jpg";
import warangal from "@/assets/dest-warangal.jpg";
import { Reveal } from "@/components/site/Reveal";

export const destinations = [
  {
    name: "Hyderabad",
    image: hyderabad,
    text: "City drops, business travel and airport transfers from Khammam.",
  },
  {
    name: "Warangal",
    image: warangal,
    text: "Temple visits, family trips and day journeys.",
  },
  {
    name: "Vijayawada",
    image: vijayawada,
    text: "Comfortable travel into Andhra Pradesh.",
  },
  {
    name: "Khammam & nearby",
    image: khammam,
    text: "Local pickups, hourly travel and short-distance trips.",
  },
];

export function Destinations() {
  return (
    <section className="bg-surface py-16 lg:py-20">
      <div className="section-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow">Routes</p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
              Where We Travel
            </h2>
            <p className="mt-3 text-muted-foreground">
              Khammam to Hyderabad, Warangal, Suryapet, Vijayawada, Secunderabad and many other
              towns across Telangana and Andhra Pradesh.
            </p>
          </div>
          <Link
            to="/book"
            className="inline-flex h-11 items-center bg-primary px-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Plan My Trip
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <Reveal key={d.name} delay={i * 60}>
              <article className="h-full border border-border bg-background">
                <img
                  src={d.image}
                  alt={`Travel to ${d.name}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                  <Link
                    to="/book"
                    className="mt-4 inline-flex text-sm font-semibold text-primary hover:text-accent"
                  >
                    Plan This Trip →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-l-2 border-accent bg-background px-5 py-4">
          <p className="text-sm text-foreground">
            Need a different destination? Tell us where you&apos;re going — we travel beyond these
            routes too.
          </p>
          <Link to="/contact" className="text-sm font-semibold text-primary hover:text-accent">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
