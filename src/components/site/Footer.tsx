import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { business, navLinks } from "@/config/business";
import { generalEnquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="section-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold uppercase text-primary-dark">Tony</p>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Tour &amp; Travels
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Car travel and cab services from Khammam to destinations across Telangana and Andhra
            Pradesh.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Navigate</h3>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              <a href={`tel:${business.phoneHref}`} className="inline-flex items-center gap-2 hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> {business.phone}
              </a>
            </li>
            <li>
              <a
                href={generalEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp enquiry
              </a>
            </li>
            <li>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Instagram className="h-4 w-4 text-primary" /> Instagram
              </a>
            </li>
            <li>
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <MapPin className="h-4 w-4 text-primary" /> {business.addressLine}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-x flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Khammam · Hyderabad · Warangal · Suryapet · Vijayawada</p>
        </div>
      </div>
    </footer>
  );
}
