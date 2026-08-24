import { useState } from "react";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

export function VehicleDetails() {
  const vehicle = useContent("vehicle");
  const groups = vehicle.details ?? [];
  const [active, setActive] = useState(groups[0]?.id ?? "");
  const tab = groups.find((t) => t.id === active) ?? groups[0];

  if (!tab) return null;

  return (
    <section className="section-x py-16 lg:py-20">
      <p className="eyebrow">Vehicle Detail</p>
      <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
        Take a Closer Look
      </h2>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
        {groups.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              t.id === tab.id
                ? "border-accent text-primary-dark"
                : "border-transparent text-muted-foreground hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-6 max-w-2xl text-muted-foreground">{tab.intro}</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tab.images.map((img, i) => (
          <figure key={`${tab.id}-${img.src}-${i}`} className="border border-border">
            <img
              src={mediaUrl(img.src)}
              alt={`${vehicle.name} — ${img.alt}`}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-foreground">
              {img.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
