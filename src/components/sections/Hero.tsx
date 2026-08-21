import { Link } from "@tanstack/react-router";
import heroCar from "@/assets/car-000.jpg";
import { business } from "@/config/business";

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="section-x grid items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 lg:py-16">
        <div>
          <p className="eyebrow">Car Travels · {business.city}, {business.state}</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-primary-dark sm:text-5xl lg:text-6xl">
            Your Journey.
            <br />
            Our Responsibility.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reliable car travel services from Khammam to Hyderabad, Warangal, Suryapet, Vijayawada
            and other destinations across Telangana and Andhra Pradesh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex h-12 items-center bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-accent-foreground transition-colors hover:brightness-95"
            >
              Book Your Ride
            </Link>
            <Link
              to="/our-cars"
              className="inline-flex h-12 items-center border border-primary px-6 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore Our Cars
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
            <div>
              <dt className="text-muted-foreground">Local &amp; outstation</dt>
              <dd className="mt-1 font-semibold text-foreground">One way / Round trip</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Vehicle</dt>
              <dd className="mt-1 font-semibold text-foreground">Hyundai Venue</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Booking</dt>
              <dd className="mt-1 font-semibold text-foreground">Direct on WhatsApp</dd>
            </div>
          </dl>
        </div>

        <div>
          <img
            src={heroCar}
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
