import { Link } from "@tanstack/react-router";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export function Hero() {
  const hero = useContent("hero");
  const [line1, ...rest] = hero.heading.split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Full-width cinematic background */}
      <img
        src={mediaUrl(hero.image)}
        alt="Hyundai Venue used by Tony Tour & Travels for car travel in Khammam"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        fetchPriority="high"
      />
      {/* Subtle readability wash — keeps the car clearly visible */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-background/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent"
        aria-hidden="true"
      />

      <div className="section-x relative flex min-h-[78vh] flex-col justify-center py-20 lg:min-h-[85vh] lg:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-primary-dark sm:text-6xl lg:text-7xl">
            {line1}
            {rest.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-foreground/80 sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex h-12 items-center bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-accent-foreground shadow-lg transition-colors hover:brightness-95"
            >
              {hero.primaryLabel}
            </Link>
            <Link
              to="/our-cars"
              className="inline-flex h-12 items-center border border-primary bg-background/70 px-6 text-sm font-semibold uppercase tracking-wide text-primary backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {hero.secondaryLabel}
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-1 gap-4 border-t border-foreground/15 pt-6 text-sm sm:grid-cols-3">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-foreground/60">{s.label}</dt>
                <dd className="mt-1 font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
