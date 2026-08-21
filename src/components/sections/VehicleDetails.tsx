import { useState } from "react";
import boot from "@/assets/boot.jpg";
import exteriorSide from "@/assets/car-090.jpg";
import exteriorFront from "@/assets/car-315.jpg";
import exteriorRear from "@/assets/car-135.jpg";
import dash from "@/assets/interior-dash.jpg";
import seats from "@/assets/interior-seats.jpg";

type Tab = {
  id: string;
  label: string;
  intro: string;
  images: { src: string; alt: string; caption: string }[];
};

const tabs: Tab[] = [
  {
    id: "exterior",
    label: "Exterior",
    intro: "Well-maintained bodywork, clean paint and regularly serviced tyres.",
    images: [
      { src: exteriorFront, alt: "Vehicle front view", caption: "Front" },
      { src: exteriorSide, alt: "Vehicle side profile", caption: "Side profile" },
      { src: exteriorRear, alt: "Vehicle rear view", caption: "Rear" },
    ],
  },
  {
    id: "interior",
    label: "Interior",
    intro: "A clean cabin, working air conditioning and comfortable seating for every trip.",
    images: [
      { src: dash, alt: "Dashboard and steering wheel", caption: "Dashboard & controls" },
      { src: seats, alt: "Rear passenger seats", caption: "Rear seats" },
    ],
  },
  {
    id: "boot",
    label: "Boot / Luggage",
    intro: "Space for suitcases and travel bags on outstation and airport trips.",
    images: [{ src: boot, alt: "Boot space with luggage loaded", caption: "Boot with luggage" }],
  },
  {
    id: "comfort",
    label: "Passenger Comfort",
    intro:
      "Air-conditioned travel, clean seating and steady, safety-focused driving on long routes.",
    images: [
      { src: seats, alt: "Comfortable rear seating", caption: "Seating comfort" },
      { src: dash, alt: "Air conditioning controls", caption: "Climate control" },
    ],
  },
];

export function VehicleDetails() {
  const [active, setActive] = useState(tabs[0]!.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <section className="section-x py-16 lg:py-20">
      <p className="eyebrow">Vehicle Detail</p>
      <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
        Take a Closer Look
      </h2>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              t.id === active
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
        {tab.images.map((img) => (
          <figure key={`${tab.id}-${img.caption}`} className="border border-border">
            <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-foreground">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
