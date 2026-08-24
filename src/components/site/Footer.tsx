import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { navLinks } from "@/config/business";
import { useContent } from "@/lib/content";
import { generalEnquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  const contact = useContent("contact");
  const footer = useContent("footer");

  return (
    <footer className="mt-16 border-t border-border bg-surface pb-16 md:pb-0">
      <div className="section-x grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold uppercase leading-none text-primary-dark">
            Tony
          </p>
          <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Tour &amp; Travels
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {footer.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">Navigate</h3>
          <ul className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm text-muted-foreground">
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
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={generalEnquiryUrl(contact.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp enquiry
              </a>
            </li>
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Instagram className="h-4 w-4 text-primary" /> Instagram
              </a>
            </li>
            <li>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <MapPin className="h-4 w-4 text-primary" /> {contact.addressLine}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="section-x flex flex-col gap-1.5 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Tony Tour &amp; Travels. All rights reserved.
          </p>
          <p className="font-medium text-primary-dark">{footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
