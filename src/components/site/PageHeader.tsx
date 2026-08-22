export function PageHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="section-x py-12 lg:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold uppercase leading-tight text-primary-dark sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}
