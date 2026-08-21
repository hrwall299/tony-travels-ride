import { RotateCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import f0 from "@/assets/car-000.jpg";
import f1 from "@/assets/car-315.jpg";
import f2 from "@/assets/car-270.jpg";
import f3 from "@/assets/car-180.jpg";
import f4 from "@/assets/car-135.jpg";
import f5 from "@/assets/car-090.jpg";

const frames = [f0, f1, f2, f3, f4, f5];
const labels = [
  "Front three-quarter",
  "Front right",
  "Right side",
  "Rear",
  "Rear left",
  "Left side",
];

const DRAG_STEP = 45; // px of drag per frame change

export function VehicleViewer() {
  const [index, setIndex] = useState(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startIndex = useRef(0);

  const move = useCallback((clientX: number) => {
    if (!dragging.current) return;
    const delta = Math.round((clientX - startX.current) / DRAG_STEP);
    const next = (((startIndex.current - delta) % frames.length) + frames.length) % frames.length;
    setIndex(next);
  }, []);

  const start = (clientX: number) => {
    dragging.current = true;
    startX.current = clientX;
    startIndex.current = index;
  };

  const end = () => {
    dragging.current = false;
  };

  return (
    <div className="border border-border bg-surface">
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
        {frames.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Hyundai Venue — ${labels[i]} view`}
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
        <p className="text-sm font-medium text-foreground">{labels[index]}</p>
        <div className="flex gap-1.5">
          {frames.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${labels[i]} view`}
              aria-pressed={i === index}
              className={`h-2 w-6 transition-colors ${i === index ? "bg-accent" : "bg-surface-strong hover:bg-primary/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
