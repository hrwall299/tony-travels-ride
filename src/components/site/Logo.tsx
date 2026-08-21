import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`inline-flex flex-col leading-none ${className}`} aria-label="Tony Tour & Travels — home">
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
