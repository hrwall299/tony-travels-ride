import { Link } from "@tanstack/react-router";
import { Car, Home, Phone } from "lucide-react";
import { useContent } from "@/lib/content";
import { generalEnquiryUrl } from "@/lib/whatsapp";

/** Floating WhatsApp button (all viewports) + sticky action bar on mobile. */
export function QuickActions() {
  const contact = useContent("contact");

  return (
    <>
      <a
        href={generalEnquiryUrl(contact.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 md:bottom-6"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.17 8.17 0 0 1-1.25-4.36c0-4.53 3.7-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.23 8.22z" />
        </svg>
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background md:hidden">
        <Link
          to="/book"
          className="flex flex-col items-center gap-1 py-2 text-[11px] font-medium text-primary-dark"
        >
          <Car className="h-[18px] w-[18px] text-primary" />
          Book
        </Link>
        <a
          href={`tel:${contact.phoneHref}`}
          className="flex flex-col items-center gap-1 border-l border-border py-2 text-[11px] font-medium text-primary-dark"
        >
          <Phone className="h-[18px] w-[18px] text-primary" />
          Call
        </a>
        <Link
          to="/our-cars"
          className="flex flex-col items-center gap-1 border-l border-border py-2 text-[11px] font-medium text-primary-dark"
        >
          <Home className="h-[18px] w-[18px] text-accent" />
          Our Car
        </Link>
      </div>
    </>
  );
}
