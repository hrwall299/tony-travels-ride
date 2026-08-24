import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

const INTERVAL = 2000;

export function VehicleGallery() {
  const vehicle = useContent("vehicle");
  const images = vehicle.gallery ?? [];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = (delta: number) => {
    if (images.length === 0) return;
    setIndex((i) => (((i + delta) % images.length) + images.length) % images.length);
  };

  useEffect(() => {
    if (paused || images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, images.length]);

  useEffect(() => {
    if (index >= images.length) setIndex(0);
  }, [images.length, index]);

  if (images.length === 0) return null;
  const current = images[index] ?? images[0]!;

  return (
    <section className="section-x py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Gallery</p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
          A Closer Look
        </h2>
        <p className="mt-3 text-muted-foreground">
          Exterior, interior and luggage space of the {vehicle.name} — the slideshow moves on its
          own, or pick a photo below.
        </p>
      </div>

      <div
        className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="relative overflow-hidden border border-border bg-surface"
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX ?? null;
            if (start != null && end != null && Math.abs(end - start) > 40) {
              go(end < start ? 1 : -1);
            }
            touchX.current = null;
            setPaused(false);
          }}
        >
          <img
            key={current.src}
            src={mediaUrl(current.src)}
            alt={current.alt}
            width={1600}
            height={1000}
            className="w-full"
          />

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-background/90 text-primary-dark transition-colors hover:bg-background"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-background/90 text-primary-dark transition-colors hover:bg-background"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-background/90 px-4 py-2 text-xs">
            <span className="font-medium text-primary-dark">{current.alt}</span>
            <span className="text-muted-foreground">
              {index + 1} / {images.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${img.alt}`}
              aria-pressed={i === index}
              className={`overflow-hidden border transition-colors ${
                i === index ? "border-accent" : "border-border hover:border-primary"
              }`}
            >
              <img
                src={mediaUrl(img.src)}
                alt={img.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
