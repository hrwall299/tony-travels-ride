import { ClientOnly, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useContent } from "@/lib/content";

const OrbitDeliveryHero = lazy(() => import("@/components/ui/orbit-delivery-hero"));

export function Hero() {
  const hero = useContent("hero");
  const [line1, ...rest] = hero.heading.split("\n");

  return (
    <section className="border-b border-border bg-surface">
      <div className="section-x grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-8 lg:py-14">
        <div className="relative z-10">
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
              to={hero.primaryTo}
              className="inline-flex h-12 items-center bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:brightness-95"
            >
              {hero.primaryLabel}
            </Link>
            <Link
              to={hero.secondaryTo}
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

        <div className="relative min-h-[400px] overflow-hidden sm:min-h-[460px] lg:-my-8 lg:min-h-[560px]" aria-label="Interactive travel animation">
          <ClientOnly fallback={<div className="h-[400px] w-full bg-surface-strong sm:h-[460px] lg:h-[560px]" />}>
            <Suspense fallback={<div className="h-[400px] w-full bg-surface-strong sm:h-[460px] lg:h-[560px]" />}>
              <OrbitDeliveryHero theme="light" />
            </Suspense>
          </ClientOnly>
        </div>
      </div>
    </section>
  );
}
