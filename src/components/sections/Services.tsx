import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, MapPinned, Plane, Repeat, Route } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const services = [
  {
    icon: Building2,
    title: "Local Travel",
    text: "Convenient local travel within Khammam and nearby areas.",
  },
  {
    icon: MapPinned,
    title: "Outstation Travel",
    text: "Comfortable long-distance journeys across Telangana and Andhra Pradesh.",
  },
  { icon: Route, title: "One-Way Trips", text: "Simple point-to-point travel." },
  { icon: Repeat, title: "Round Trips", text: "Convenient return journeys." },
  { icon: Plane, title: "Airport Transfers", text: "Airport pickup and drop services." },
];

export function Services({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section-x py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
          Travel Services That Fit Your Journey
        </h2>
        <p className="mt-3 text-muted-foreground">
          From a short trip inside Khammam to a multi-day outstation journey, we plan the ride
          around your schedule.
        </p>
      </div>

      <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} className="bg-background">
            <div className="h-full p-6">
              <s.icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
        {!compact ? (
          <div className="flex flex-col justify-between bg-primary p-6 text-primary-foreground">
            <p className="text-lg font-semibold">Not sure which option suits your trip?</p>
            <Link
              to="/book"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide"
            >
              Tell us your plan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
