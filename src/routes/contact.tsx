import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { useContent } from "@/lib/content";
import { generalEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tony Tour & Travels, Khammam" },
      {
        name: "description",
        content:
          "Call or WhatsApp Tony Tour & Travels in Khammam for car travel bookings, fare quotes and airport transfers. Available 24x7.",
      },
      { property: "og:title", content: "Contact Tony Tour & Travels" },
      {
        property: "og:description",
        content: "Call or WhatsApp us in Khammam for bookings and fare quotes.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const contact = useContent("contact");
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk To Us About Your Trip"
        text="Call or message us with your pickup, destination and travel time — we'll confirm the fare and the car."
      />

      <section className="section-x grid gap-6 py-16 sm:grid-cols-2 lg:py-20">
        <a
          href={`tel:${contact.phoneHref}`}
          className="border border-border p-6 transition-colors hover:border-primary"
        >
          <Phone className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">Call us</h2>
          <p className="mt-1 text-muted-foreground">{contact.phone}</p>
        </a>

        <a
          href={generalEnquiryUrl(contact.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border p-6 transition-colors hover:border-primary"
        >
          <MessageCircle className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">WhatsApp</h2>
          <p className="mt-1 text-muted-foreground">Send your trip details for a quick quote</p>
        </a>

        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border p-6 transition-colors hover:border-primary"
        >
          <MapPin className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">Where we are</h2>
          <p className="mt-1 text-muted-foreground">{contact.addressLine}</p>
        </a>

        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-border p-6 transition-colors hover:border-primary"
        >
          <Instagram className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">Instagram</h2>
          <p className="mt-1 text-muted-foreground">Trip photos and updates</p>
        </a>

        <div className="border-l-2 border-accent bg-surface p-6 sm:col-span-2">
          <Clock className="h-6 w-6 text-primary" strokeWidth={1.6} />
          <h2 className="mt-4 text-lg font-semibold text-foreground">{contact.hours}</h2>
          <p className="mt-1 text-muted-foreground">
            Ready with your trip details? Fill the booking form and send it straight to WhatsApp.
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex h-11 items-center bg-primary px-5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            Book a Ride
          </Link>
        </div>
      </section>
    </>
  );
}
