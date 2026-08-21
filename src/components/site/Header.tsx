import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { business, navLinks } from "@/config/business";
import { generalEnquiryUrl } from "@/lib/whatsapp";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="hidden border-b border-border bg-surface lg:block">
        <div className="section-x flex h-9 items-center justify-between text-xs text-muted-foreground">
          <span>{business.addressLine}</span>
          <div className="flex items-center gap-5">
            <span>{business.hours}</span>
            <a href={`tel:${business.phoneHref}`} className="font-semibold text-primary-dark hover:text-primary">
              {business.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="section-x flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-[0.92rem] font-medium text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: link.to === "/" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phoneHref}`}
            className="hidden h-10 w-10 items-center justify-center border border-border text-primary-dark transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            aria-label="Call us"
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a
            href={generalEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 border border-border px-3 text-sm font-medium text-primary-dark transition-colors hover:border-primary hover:text-primary sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            to="/book"
            className="inline-flex h-10 items-center bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Book a Ride
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border border-border text-primary-dark lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="section-x flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/70 py-3 text-base font-medium text-foreground/90 last:border-0"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <a href={`tel:${business.phoneHref}`} className="py-3 text-base font-medium text-primary">
              Call {business.phone}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
