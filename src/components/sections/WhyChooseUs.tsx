import { Clock, MessageCircle, Map, ShieldCheck, Sparkles } from "lucide-react";

const points = [
  { icon: Clock, title: "Reliable Pickup", text: "We value your time." },
  { icon: Sparkles, title: "Comfortable Travel", text: "Clean and comfortable rides." },
  {
    icon: ShieldCheck,
    title: "Experienced Service",
    text: "Local travel knowledge and dependable service.",
  },
  { icon: MessageCircle, title: "Easy Booking", text: "Book directly through WhatsApp." },
  {
    icon: Map,
    title: "Flexible Destinations",
    text: "Travel across Telangana, Andhra Pradesh and beyond.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-x py-16 lg:py-20">
      <p className="eyebrow">Why Choose Us</p>
      <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
        Built On Everyday Dependability
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {points.map((p) => (
          <div key={p.title} className="border-t-2 border-surface-strong pt-4">
            <p.icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
            <h3 className="mt-3 text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
