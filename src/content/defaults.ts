import boot from "@/assets/boot.jpg";
import car000 from "@/assets/car-000.jpg";
import car090 from "@/assets/car-090.jpg";
import car135 from "@/assets/car-135.jpg";
import car180 from "@/assets/car-180.jpg";
import car270 from "@/assets/car-270.jpg";
import car315 from "@/assets/car-315.jpg";
import destHyderabad from "@/assets/dest-hyderabad.jpg";
import destKhammam from "@/assets/dest-khammam.jpg";
import destVijayawada from "@/assets/dest-vijayawada.jpg";
import destWarangal from "@/assets/dest-warangal.jpg";
import dash from "@/assets/interior-dash.jpg";
import seats from "@/assets/interior-seats.jpg";
import road from "@/assets/road.jpg";

export type HeroContent = {
  eyebrow: string;
  heading: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel: string;
  secondaryTo: string;
  image: string;
  stats: { label: string; value: string }[];
};

export type GalleryImage = { src: string; alt: string };

export type VehicleContent = {
  name: string;
  variant: string;
  description: string;
  features: string[];
  gallery: GalleryImage[];
  threeSixty: GalleryImage[];
  video: { src: string; poster: string; title: string; description: string };
  details: VehicleDetailGroup[];
};

export type VehicleDetailGroup = {
  id: string;
  label: string;
  intro: string;
  images: GalleryImage[];
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  points: { title: string; text: string; icon: string }[];
};

export type ServiceItem = {
  id: string;
  title: string;
  text: string;
  icon: string;
  enabled: boolean;
};

export type RouteItem = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export type ContactContent = {
  phone: string;
  phoneHref: string;
  whatsapp: string;
  instagram: string;
  mapsUrl: string;
  addressLine: string;
  hours: string;
};

export type FooterContent = {
  description: string;
  credit: string;
};

export const defaultHero: HeroContent = {
  eyebrow: "Car Travels · Khammam, Telangana",
  heading: "Your Journey.\nOur Responsibility.",
  description:
    "Reliable car travel services from Khammam to Hyderabad, Warangal, Suryapet, Vijayawada and other destinations across Telangana and Andhra Pradesh.",
  primaryLabel: "Book Your Ride",
  primaryTo: "/book",
  secondaryLabel: "Explore Our Cars",
  secondaryTo: "/our-cars",
  image: car000,
  stats: [
    { label: "Local & outstation", value: "One way / Round trip" },
    { label: "Vehicle", value: "Hyundai Venue" },
    { label: "Booking", value: "Direct on WhatsApp" },
  ],
};

export const defaultVehicle: VehicleContent = {
  name: "Hyundai Venue",
  variant: "Facelift · 2022–2025",
  description:
    "A well-maintained Hyundai Venue Facelift kept clean and serviced for every journey — air-conditioned cabin, comfortable seating for four passengers and space for luggage.",
  features: [
    "4 passengers",
    "Air conditioned",
    "Clean, serviced interiors",
    "Ample boot space",
    "Experienced driver",
  ],
  gallery: [
    { src: car000, alt: "Hyundai Venue front three-quarter view" },
    { src: car315, alt: "Hyundai Venue front right view" },
    { src: car090, alt: "Hyundai Venue side profile" },
    { src: road, alt: "Hyundai Venue on the highway" },
    { src: dash, alt: "Hyundai Venue dashboard and controls" },
    { src: seats, alt: "Hyundai Venue rear passenger seats" },
    { src: boot, alt: "Hyundai Venue boot space with luggage" },
  ],
  threeSixty: [
    { src: car000, alt: "Front three-quarter" },
    { src: car315, alt: "Front right" },
    { src: car270, alt: "Right side" },
    { src: car180, alt: "Rear" },
    { src: car135, alt: "Rear left" },
    { src: car090, alt: "Left side" },
  ],
  video: {
    src: "",
    poster: road,
    title: "See The Car In Motion",
    description:
      "A short walkaround of the Hyundai Venue Facelift used for all Tony Tour & Travels trips.",
  },
  details: [
    {
      id: "exterior",
      label: "Exterior",
      intro: "Well-maintained bodywork, clean paint and regularly serviced tyres.",
      images: [
        { src: car315, alt: "Front" },
        { src: car090, alt: "Side profile" },
        { src: car135, alt: "Rear" },
      ],
    },
    {
      id: "interior",
      label: "Interior",
      intro: "A clean cabin, working air conditioning and comfortable seating for every trip.",
      images: [
        { src: dash, alt: "Dashboard & controls" },
        { src: seats, alt: "Rear seats" },
      ],
    },
    {
      id: "boot",
      label: "Boot / Luggage",
      intro: "Space for suitcases and travel bags on outstation and airport trips.",
      images: [{ src: boot, alt: "Boot with luggage" }],
    },
    {
      id: "comfort",
      label: "Passenger Comfort",
      intro:
        "Air-conditioned travel, clean seating and steady, safety-focused driving on long routes.",
      images: [
        { src: seats, alt: "Seating comfort" },
        { src: dash, alt: "Climate control" },
      ],
    },
  ],
};

export const defaultAbout: AboutContent = {
  eyebrow: "Why Choose Us",
  heading: "Built On Everyday Dependability",
  points: [
    { title: "Reliable Pickup", text: "We value your time.", icon: "Clock" },
    { title: "Comfortable Travel", text: "Clean and comfortable rides.", icon: "Sparkles" },
    {
      title: "Experienced Service",
      text: "Local travel knowledge and dependable service.",
      icon: "ShieldCheck",
    },
    { title: "Easy Booking", text: "Book directly through WhatsApp.", icon: "MessageCircle" },
    {
      title: "Flexible Destinations",
      text: "Travel across Telangana, Andhra Pradesh and beyond.",
      icon: "Map",
    },
  ],
};

export const defaultServices: ServiceItem[] = [
  {
    id: "local",
    title: "Local Trip",
    text: "Convenient local travel within Khammam and nearby areas, by trip or by the hour.",
    icon: "Building2",
    enabled: true,
  },
  {
    id: "oneway",
    title: "Outstation — One Way",
    text: "Point-to-point travel from your pickup to your destination, no return leg.",
    icon: "Route",
    enabled: true,
  },
  {
    id: "roundtrip",
    title: "Outstation — Round Trip",
    text: "Travel to your destination and return with the same car and driver.",
    icon: "Repeat",
    enabled: true,
  },
  {
    id: "airport",
    title: "Airport Transfer",
    text: "Timed pickup and drop for flights, with your travel time planned around the schedule.",
    icon: "Plane",
    enabled: true,
  },
];

export const defaultRoutes: RouteItem[] = [
  {
    id: "hyderabad",
    name: "Khammam → Hyderabad",
    description: "City drops, business travel and airport transfers from Khammam.",
    image: destHyderabad,
  },
  {
    id: "warangal",
    name: "Khammam → Warangal",
    description: "Temple visits, family trips and comfortable day journeys.",
    image: destWarangal,
  },
  {
    id: "vijayawada",
    name: "Khammam → Vijayawada",
    description: "Comfortable one-way and round-trip travel into Andhra Pradesh.",
    image: destVijayawada,
  },
  {
    id: "khammam",
    name: "Khammam & nearby",
    description: "Local pickups, hourly travel and short-distance trips.",
    image: destKhammam,
  },
  {
    id: "suryapet",
    name: "Khammam → Suryapet",
    description: "Reliable one-way and round-trip travel on the highway route.",
    image: "",
  },
  {
    id: "secunderabad",
    name: "Khammam → Secunderabad",
    description: "Direct drops for railway station and city destinations.",
    image: "",
  },
];

export const defaultContact: ContactContent = {
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "919876543210",
  instagram: "https://instagram.com/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Khammam%2C+Telangana",
  addressLine: "Khammam, Telangana, India",
  hours: "Available 24x7 for bookings",
};

export const defaultFooter: FooterContent = {
  description:
    "Car travel and cab services from Khammam to destinations across Telangana and Andhra Pradesh.",
  credit: "Designed by Webarqn",
};

export const contentDefaults = {
  hero: defaultHero,
  vehicle: defaultVehicle,
  services: { items: defaultServices },
  routes: { items: defaultRoutes },
  about: defaultAbout,
  contact: defaultContact,
  footer: defaultFooter,
};

export type ContentKey = keyof typeof contentDefaults;
