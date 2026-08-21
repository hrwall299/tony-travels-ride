/**
 * Central business configuration.
 * Change contact details here only — never hard-code them in components.
 */
export const business = {
  name: "TONY TOUR & TRAVELS",
  shortName: "Tony Tour & Travels",
  tagline: "Your Journey. Our Responsibility.",
  city: "Khammam",
  state: "Telangana",
  addressLine: "Khammam, Telangana, India",
  /** Display phone number */
  phone: "+91 98765 43210",
  /** tel: link value */
  phoneHref: "+919876543210",
  /** WhatsApp number in international format, digits only */
  whatsapp: "919876543210",
  email: "",
  instagram: "https://instagram.com/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Khammam%2C+Telangana",
  hours: "Available 24x7 for bookings",
} as const;

export const vehicles = [
  {
    id: "venue",
    name: "Hyundai Venue",
    variant: "Facelift · 2022–2025",
    seats: "4 passengers",
  },
] as const;

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Our Cars", to: "/our-cars" },
  { label: "Services", to: "/services" },
  { label: "Routes", to: "/routes" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
