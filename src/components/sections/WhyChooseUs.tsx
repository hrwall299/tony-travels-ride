import {
  Clock,
  MessageCircle,
  Map,
  ShieldCheck,
  Sparkles,
  Car,
  type LucideIcon,
} from "lucide-react";
import { useContent } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  Clock,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Map,
  Car,
};

export function WhyChooseUs() {
  const about = useContent("about");

  return (
    <section className="section-x py-16 lg:py-20">
      <p className="eyebrow">{about.eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold uppercase text-primary-dark sm:text-4xl">
        {about.heading}
      </h2>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {about.points.map((p) => {
          const Icon = icons[p.icon] ?? Car;
          return (
            <div key={p.title} className="border-t-2 border-surface-strong pt-4">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.7} />
              <h3 className="mt-3 text-base font-semibold text-foreground">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
