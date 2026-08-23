import { RotateCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";

const DRAG_STEP = 45; // px of drag per frame change

export function VehicleViewer() {
  const vehicle = useContent("vehicle");
  const frames = vehicle.threeSixty ?? [];
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  const move = useCallback(
    (clientX: number) => {
      if (!dragging.current || frames.length === 0) return;
      const delta = Math.round((clientX - startX.current) / DRAG_STEP);
      const next = (((startIndex.current - delta) % frames.length) + frames.length) % frames.length;
      setIndex(next);
    },
    [frames.length],
  );

  const start = (clientX: number) => {
    dragging.current = true;
    startX.current = clientX;
    startIndex.current = index;
  };

  const end = () => {
    dragging.current = false;
  };

  if (frames.length === 0) return null;
  const active = frames[Math.min(index, frames.length - 1)]!;

  return (
    <section className="section-x py-16 lg:py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">360° View</p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
          Turn The {vehicle.name}
        </h2>
        <p className="mt-3 text-muted-foreground">{vehicle.description}</p>
      </div>

      <div className="mt-8 border border-border bg-surface">
        <div
          className="relative touch-pan-y select-none"
          onPointerDown={(e) => {
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            start(e.clientX);
          }}
          onPointerMove={(e) => move(e.clientX)}
          onPointerUp={end}
          onPointerCancel={end}
          onPointerLeave={end}
          role="group"
          aria-label="Interactive 360 degree vehicle viewer"
        >
          {frames.map((frame, i) => (
            <img
              key={frame.src + i}
              src={mediaUrl(frame.src)}
              alt={`${vehicle.name} — ${frame.alt} view`}
              width={1600}
              height={1000}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              className={`w-full ${i === index ? "block" : "hidden"}`}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <span className="inline-flex items-center gap-2 bg-background/90 px-3 py-1.5 text-xs font-medium text-primary-dark">
              <RotateCw className="h-3.5 w-3.5 text-accent" />
              Drag left or right to turn the vehicle
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-background px-4 py-3">
          <p className="text-sm font-medium text-foreground">{active.alt}</p>
          <div className="flex gap-1.5">
            {frames.map((frame, i) => (
              <button
                key={frame.src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${frame.alt} view`}
                aria-pressed={i === index}
                className={`h-2 w-6 transition-colors ${i === index ? "bg-accent" : "bg-surface-strong hover:bg-primary/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
