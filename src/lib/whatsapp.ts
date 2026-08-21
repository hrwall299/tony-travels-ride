import { business } from "@/config/business";

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const generalEnquiryUrl = () =>
  whatsappUrl(
    `Hello ${business.name},\n\nI would like to enquire about your car travel services.`,
  );

export type BookingDetails = {
  name: string;
  mobile: string;
  whatsappNumber?: string;
  email?: string;
  pickup: string;
  drop: string;
  tripType: string;
  travelDate: string;
  pickupTime: string;
  passengers: string;
  vehicle: string;
  returnDate?: string;
  returnTime?: string;
  flightNumber?: string;
  airportDirection?: string;
  notes?: string;
};

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function formatTime(value?: string) {
  if (!value) return "";
  const [hRaw, mRaw] = value.split(":").map(Number);
  const h = hRaw ?? NaN;
  const m = mRaw ?? 0;
  if (Number.isNaN(h)) return value;
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function buildBookingMessage(b: BookingDetails) {
  const lines: string[] = [];
  lines.push(`Hello ${business.name},`, "", "I would like to book a ride.", "");

  lines.push("Customer Details:");
  lines.push(`Name: ${b.name}`);
  lines.push(`Mobile: ${b.mobile}`);
  if (b.whatsappNumber) lines.push(`WhatsApp: ${b.whatsappNumber}`);
  if (b.email) lines.push(`Email: ${b.email}`);
  lines.push("");

  lines.push("Trip Details:");
  lines.push(`Trip Type: ${b.tripType}`);
  lines.push(`Pickup: ${b.pickup}`);
  lines.push(`Drop: ${b.drop}`);
  lines.push(`Travel Date: ${formatDate(b.travelDate)}`);
  lines.push(`Pickup Time: ${formatTime(b.pickupTime)}`);
  if (b.returnDate) lines.push(`Return Date: ${formatDate(b.returnDate)}`);
  if (b.returnTime) lines.push(`Return Time: ${formatTime(b.returnTime)}`);
  lines.push(`Passengers: ${b.passengers}`);
  if (b.airportDirection) lines.push(`Airport Service: ${b.airportDirection}`);
  if (b.flightNumber) lines.push(`Flight Number: ${b.flightNumber}`);
  lines.push("");

  lines.push(`Vehicle: ${b.vehicle}`);

  if (b.notes) {
    lines.push("", "Additional Requirements:", b.notes);
  }

  lines.push("", "Please confirm availability and fare.", "", "Thank you.");
  return lines.join("\n");
}
