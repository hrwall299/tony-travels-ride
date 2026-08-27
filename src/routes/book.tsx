import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { vehicles } from "@/config/business";
import { supabase } from "@/integrations/supabase/client";
import { useContent } from "@/lib/content";
import { buildBookingMessage, whatsappUrl, type BookingDetails } from "@/lib/whatsapp";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Ride — Tony Tour & Travels, Khammam" },
      {
        name: "description",
        content:
          "Fill in your pickup, destination, date and time — your booking is sent to Tony Tour & Travels as a WhatsApp message for instant confirmation.",
      },
      { property: "og:title", content: "Book a Ride | Tony Tour & Travels" },
      {
        property: "og:description",
        content: "Send your car travel booking to us directly on WhatsApp.",
      },
    ],
  }),
  component: BookPage,
});

const tripTypes = [
  "Local Trip",
  "Outstation — One Way",
  "Outstation — Round Trip",
  "Airport Transfer",
];

const inputClass =
  "mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">
        {label} {required ? <span className="text-accent">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const emptyForm: BookingDetails = {
  name: "",
  mobile: "",
  whatsappNumber: "",
  email: "",
  pickup: "",
  drop: "",
  tripType: tripTypes[0]!,
  travelDate: "",
  pickupTime: "",
  passengers: "1",
  vehicle: vehicles[0].name,
  returnDate: "",
  returnTime: "",
  flightNumber: "",
  airportDirection: "",
  notes: "",
};

function BookPage() {
  const contact = useContent("contact");
  const [form, setForm] = useState<BookingDetails>(emptyForm);
  const [sent, setSent] = useState(false);

  const set = (key: keyof BookingDetails) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const isRoundTrip = form.tripType === "Outstation — Round Trip";
  const isAirport = form.tripType === "Airport Transfer";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open WhatsApp first so the browser treats it as a direct user action.
    const url = whatsappUrl(buildBookingMessage(form), contact.whatsapp);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);

    const notes = [
      form.notes,
      form.vehicle ? `Vehicle: ${form.vehicle}` : "",
      isRoundTrip && form.returnDate ? `Return: ${form.returnDate} ${form.returnTime}` : "",
      isAirport && form.airportDirection ? `Airport: ${form.airportDirection}` : "",
      isAirport && form.flightNumber ? `Flight: ${form.flightNumber}` : "",
      form.email ? `Email: ${form.email}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    void supabase.from("enquiries").insert({
      name: form.name.trim().slice(0, 100),
      mobile: form.mobile.trim().slice(0, 20),
      trip_type: form.tripType,
      pickup: form.pickup.trim().slice(0, 200),
      drop_location: form.drop.trim().slice(0, 200),
      travel_date: form.travelDate,
      pickup_time: form.pickupTime,
      passengers: form.passengers,
      message: notes.slice(0, 1000),
    });
  };

  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title="Book Your Ride"
        text="Fill in your trip details below. When you send, everything is turned into a clear WhatsApp message for us to confirm."
      />

      <section className="section-x py-12 lg:py-16">
        <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <fieldset>
              <legend className="font-display text-xl font-bold uppercase text-primary-dark">
                Your Details
              </legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    className={inputClass}
                    required
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                  />
                </Field>
                <Field label="Mobile number" required>
                  <input
                    className={inputClass}
                    required
                    type="tel"
                    inputMode="tel"
                    value={form.mobile}
                    onChange={(e) => set("mobile")(e.target.value)}
                  />
                </Field>
                <Field label="WhatsApp number (if different)">
                  <input
                    className={inputClass}
                    type="tel"
                    value={form.whatsappNumber}
                    onChange={(e) => set("whatsappNumber")(e.target.value)}
                  />
                </Field>
                <Field label="Email">
                  <input
                    className={inputClass}
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </Field>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-xl font-bold uppercase text-primary-dark">
                Trip Details
              </legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Trip type" required>
                  <select
                    className={inputClass}
                    value={form.tripType}
                    onChange={(e) => set("tripType")(e.target.value)}
                  >
                    {tripTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Passengers" required>
                  <select
                    className={inputClass}
                    value={form.passengers}
                    onChange={(e) => set("passengers")(e.target.value)}
                  >
                    {["1", "2", "3", "4"].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pickup location" required>
                  <input
                    className={inputClass}
                    required
                    value={form.pickup}
                    onChange={(e) => set("pickup")(e.target.value)}
                  />
                </Field>
                <Field label="Drop location" required>
                  <input
                    className={inputClass}
                    required
                    value={form.drop}
                    onChange={(e) => set("drop")(e.target.value)}
                  />
                </Field>
                <Field label="Travel date" required>
                  <input
                    className={inputClass}
                    required
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => set("travelDate")(e.target.value)}
                  />
                </Field>
                <Field label="Pickup time" required>
                  <input
                    className={inputClass}
                    required
                    type="time"
                    value={form.pickupTime}
                    onChange={(e) => set("pickupTime")(e.target.value)}
                  />
                </Field>

                {isRoundTrip ? (
                  <>
                    <Field label="Return date">
                      <input
                        className={inputClass}
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => set("returnDate")(e.target.value)}
                      />
                    </Field>
                    <Field label="Return time">
                      <input
                        className={inputClass}
                        type="time"
                        value={form.returnTime}
                        onChange={(e) => set("returnTime")(e.target.value)}
                      />
                    </Field>
                  </>
                ) : null}

                {isAirport ? (
                  <>
                    <Field label="Airport service">
                      <select
                        className={inputClass}
                        value={form.airportDirection}
                        onChange={(e) => set("airportDirection")(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option>Airport Pickup</option>
                        <option>Airport Drop</option>
                      </select>
                    </Field>
                    <Field label="Flight number">
                      <input
                        className={inputClass}
                        value={form.flightNumber}
                        onChange={(e) => set("flightNumber")(e.target.value)}
                      />
                    </Field>
                  </>
                ) : null}
              </div>

              <div className="mt-5">
                <Field label="Additional requirements">
                  <textarea
                    className="mt-2 w-full border border-border bg-background p-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                    rows={4}
                    value={form.notes}
                    onChange={(e) => set("notes")(e.target.value)}
                  />
                </Field>
              </div>
            </fieldset>
          </div>

          <aside className="h-fit border border-border bg-surface p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg font-bold uppercase text-primary-dark">
              Booking Summary
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Vehicle</dt>
                <dd className="font-medium text-foreground">{form.vehicle}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Trip</dt>
                <dd className="text-right font-medium text-foreground">{form.tripType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Route</dt>
                <dd className="text-right font-medium text-foreground">
                  {form.pickup || "—"} → {form.drop || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Passengers</dt>
                <dd className="font-medium text-foreground">{form.passengers}</dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-6 inline-flex h-12 w-full items-center justify-center bg-whatsapp px-5 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:scale-[1.01]"
            >
              Send Booking on WhatsApp
            </button>
            {sent ? (
              <p className="mt-4 border-l-2 border-accent bg-background p-3 text-sm text-foreground">
                Your enquiry has been recorded and a message is prepared in WhatsApp. Send it and
                we&apos;ll confirm availability and fare — the booking is confirmed only once we
                reply.
              </p>
            ) : (
              <p className="mt-4 text-xs text-muted-foreground">
                No payment is taken here. We confirm the fare on WhatsApp before your trip.
              </p>
            )}
          </aside>
        </form>
      </section>
    </>
  );
}
