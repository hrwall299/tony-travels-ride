import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export function Destinations() {
  const { items } = useContent("routes");

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
          {items.map((d, i) => (
            <Reveal key={d.id} delay={i * 60}>
              <article className="flex h-full flex-col border border-border bg-background">
                {d.image ? (
                  <img
                    src={mediaUrl(d.image)}
                    alt={`Travel to ${d.name}`}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col justify-end border-b border-border bg-primary p-5 text-primary-foreground">
                    <MapPin className="h-6 w-6 opacity-80" strokeWidth={1.6} />
                    <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight">
                      {d.name.replace(/^Khammam\s*→\s*/, "")}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-80">From Khammam</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-foreground">{d.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>
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
