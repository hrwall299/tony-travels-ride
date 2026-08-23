import { Link } from "@tanstack/react-router";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export function Hero() {
  const hero = useContent("hero");
  const [line1, ...rest] = hero.heading.split("\n");

  return (
    <section className="border-b border-border bg-surface">
      <div className="section-x grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 lg:py-16">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-primary-dark sm:text-5xl lg:text-6xl">
            {line1}
            {rest.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex h-12 items-center bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:brightness-95"
            >
              {hero.primaryLabel}
            </Link>
            <Link
              to="/our-cars"
              className="inline-flex h-12 items-center border border-primary px-6 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {hero.secondaryLabel}
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 bottom-0 top-10 -z-10 bg-primary/5" aria-hidden="true" />
          <img
            src={mediaUrl(hero.image)}
            alt="Hyundai Venue used by Tony Tour & Travels for car travel in Khammam"
            width={1600}
            height={1000}
            className="w-full"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
