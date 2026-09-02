import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";

export function Logo({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const taps = useRef<number[]>([]);

  const handleTap = (e: React.MouseEvent) => {
    const now = Date.now();
    taps.current = [...taps.current, now].filter((t) => now - t < 1200);
    if (taps.current.length >= 3) {
      taps.current = [];
      e.preventDefault();
      void navigate({ to: "/admin" });
    }
  };

  return (
    <Link
      to="/"
      onClick={handleTap}
      className={`inline-flex flex-col leading-none ${className}`}
      aria-label="Tony Tour & Travels — home"
    >
      <span className="font-display text-[1.75rem] font-bold uppercase tracking-[0.02em] text-primary-dark sm:text-[2rem]">
        Tony
      </span>
      <svg
        viewBox="0 0 120 8"
        preserveAspectRatio="none"
        className="-mt-1 h-[6px] w-full text-accent"
        aria-hidden="true"
      >
        <path
          d="M0 6 C 30 1, 70 1, 118 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:text-[0.65rem]">
        Tour &amp; Travels
      </span>
    </Link>
  );
}
