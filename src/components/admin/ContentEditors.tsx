import type {
  GalleryImage,
  RouteItem,
  ServiceItem,
  VehicleDetailGroup,
} from "@/content/defaults";
import { useDraft } from "./useDraft";
import {
  AdminCard,
  MediaField,
  MoveButtons,
  SaveBar,
  TextArea,
  TextInput,
  inputClass,
  move,
} from "./ui";

/* ------------------------------- shared bits ------------------------------ */

function ImageListEditor({
  title,
  description,
  images,
  onChange,
}: {
  title: string;
  description?: string;
  images: GalleryImage[];
  onChange: (next: GalleryImage[]) => void;
}) {
  const setAt = (i: number, patch: Partial<GalleryImage>) =>
    onChange(images.map((img, idx) => (idx === i ? { ...img, ...patch } : img)));

  return (
    <AdminCard title={title} {...(description ? { description } : {})}>
      <div className="space-y-4">
        {images.map((img, i) => (
          <div key={`${img.src}-${i}`} className="border border-border p-4">
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                #{i + 1}
              </span>
              <MoveButtons
                index={i}
                length={images.length}
                onMove={(from, to) => onChange(move(images, from, to))}
                onDelete={(idx) => onChange(images.filter((_, x) => x !== idx))}
              />
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <MediaField
                label="Image"
                value={img.src}
                onChange={(src) => setAt(i, { src })}
              />
              <TextInput
                label="Description (alt text)"
                value={img.alt}
                onChange={(alt) => setAt(i, { alt })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...images, { src: "", alt: "" }])}
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold text-primary-dark hover:border-primary"
        >
          Add image
        </button>
      </div>
    </AdminCard>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function HeroEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("hero");

  return (
    <div className="space-y-6">
      <AdminCard title="Hero section" description="The first thing visitors see on the homepage.">
        <TextInput label="Eyebrow" value={draft.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        <TextArea
          label="Heading"
          value={draft.heading}
          onChange={(v) => update({ heading: v })}
          rows={2}
        />
        <TextArea
          label="Description"
          value={draft.description}
          onChange={(v) => update({ description: v })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Primary button text"
            value={draft.primaryLabel}
            onChange={(v) => update({ primaryLabel: v })}
          />
          <TextInput
            label="Secondary button text"
            value={draft.secondaryLabel}
            onChange={(v) => update({ secondaryLabel: v })}
          />
        </div>
        <MediaField
          label="Hero vehicle image"
          value={draft.image}
          onChange={(image) => update({ image })}
        />
      </AdminCard>

      <AdminCard title="Hero highlights" description="Short facts shown under the hero.">
        {draft.stats.map((s, i) => (
          <div key={i} className="grid gap-4 border border-border p-4 sm:grid-cols-2">
            <TextInput
              label="Label"
              value={s.label}
              onChange={(label) =>
                update({ stats: draft.stats.map((x, idx) => (idx === i ? { ...x, label } : x)) })
              }
            />
            <TextInput
              label="Value"
              value={s.value}
              onChange={(value) =>
                update({ stats: draft.stats.map((x, idx) => (idx === i ? { ...x, value } : x)) })
              }
            />
          </div>
        ))}
      </AdminCard>

      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

/* -------------------------------- vehicle --------------------------------- */

export function VehicleEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("vehicle");

  const setDetail = (i: number, patch: Partial<VehicleDetailGroup>) =>
    update({ details: draft.details.map((g, idx) => (idx === i ? { ...g, ...patch } : g)) });

  return (
    <div className="space-y-6">
      <AdminCard title="Vehicle information">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Vehicle name" value={draft.name} onChange={(v) => update({ name: v })} />
          <TextInput
            label="Model / year"
            value={draft.variant}
            onChange={(v) => update({ variant: v })}
          />
        </div>
        <TextArea
          label="Description"
          value={draft.description}
          onChange={(v) => update({ description: v })}
        />
        <TextArea
          label="Features (one per line)"
          rows={5}
          value={draft.features.join("\n")}
          onChange={(v) => update({ features: v.split("\n").filter((x) => x.trim() !== "") })}
        />
      </AdminCard>

      <ImageListEditor
        title="Vehicle gallery"
        description="Automatic slideshow on the website. Order controls the sequence."
        images={draft.gallery}
        onChange={(gallery) => update({ gallery })}
      />

      <ImageListEditor
        title="360° viewer frames"
        description="Order controls the rotation. Upload frames from front, going around the car."
        images={draft.threeSixty}
        onChange={(threeSixty) => update({ threeSixty })}
      />

      <AdminCard title="Vehicle video" description="Uploaded video shown on the website.">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Section title"
            value={draft.video.title}
            onChange={(title) => update({ video: { ...draft.video, title } })}
          />
          <TextInput
            label="Section description"
            value={draft.video.description}
            onChange={(description) => update({ video: { ...draft.video, description } })}
          />
        </div>
        <MediaField
          label="Video file"
          kind="video"
          accept="video/*"
          value={draft.video.src}
          onChange={(src) => update({ video: { ...draft.video, src } })}
        />
        <MediaField
          label="Poster image"
          value={draft.video.poster}
          onChange={(poster) => update({ video: { ...draft.video, poster } })}
        />
      </AdminCard>

      <AdminCard
        title="Exterior / Interior / Boot / Comfort"
        description="Tabs on the Our Cars page."
      >
        {draft.details.map((g, i) => (
          <div key={g.id} className="border border-border p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Tab label" value={g.label} onChange={(label) => setDetail(i, { label })} />
              <TextInput label="Intro text" value={g.intro} onChange={(intro) => setDetail(i, { intro })} />
            </div>
            <div className="mt-4 space-y-3">
              {g.images.map((img, j) => (
                <div key={j} className="border border-border p-3">
                  <div className="flex justify-end">
                    <MoveButtons
                      index={j}
                      length={g.images.length}
                      onMove={(from, to) => setDetail(i, { images: move(g.images, from, to) })}
                      onDelete={(idx) =>
                        setDetail(i, { images: g.images.filter((_, x) => x !== idx) })
                      }
                    />
                  </div>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    <MediaField
                      label="Image"
                      value={img.src}
                      onChange={(src) =>
                        setDetail(i, {
                          images: g.images.map((x, idx) => (idx === j ? { ...x, src } : x)),
                        })
                      }
                    />
                    <TextInput
                      label="Caption"
                      value={img.alt}
                      onChange={(alt) =>
                        setDetail(i, {
                          images: g.images.map((x, idx) => (idx === j ? { ...x, alt } : x)),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDetail(i, { images: [...g.images, { src: "", alt: "" }] })}
                className="inline-flex h-9 items-center border border-border px-3 text-sm font-medium text-primary-dark hover:border-primary"
              >
                Add image to {g.label}
              </button>
            </div>
          </div>
        ))}
      </AdminCard>

      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

/* -------------------------------- services -------------------------------- */

const serviceIcons = ["Building2", "Route", "Repeat", "Plane", "MapPinned", "Car"];

export function ServicesEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("services");
  const items = draft.items;
  const setAt = (i: number, patch: Partial<ServiceItem>) =>
    update({ items: items.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });

  return (
    <div className="space-y-6">
      <AdminCard title="Services" description="Shown on the homepage and Services page.">
        {items.map((s, i) => (
          <div key={s.id} className="border border-border p-4">
            <div className="flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={s.enabled !== false}
                  onChange={(e) => setAt(i, { enabled: e.target.checked })}
                />
                Visible on website
              </label>
              <MoveButtons
                index={i}
                length={items.length}
                onMove={(from, to) => update({ items: move(items, from, to) })}
                onDelete={(idx) => update({ items: items.filter((_, x) => x !== idx) })}
              />
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <TextInput label="Title" value={s.title} onChange={(title) => setAt(i, { title })} />
              <label className="block">
                <span className="text-sm font-medium text-foreground">Icon</span>
                <select
                  className={inputClass}
                  value={s.icon}
                  onChange={(e) => setAt(i, { icon: e.target.value })}
                >
                  {serviceIcons.map((ic) => (
                    <option key={ic}>{ic}</option>
                  ))}
                </select>
              </label>
            </div>
            <TextArea label="Description" value={s.text} onChange={(text) => setAt(i, { text })} />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update({
              items: [
                ...items,
                {
                  id: `service-${Date.now()}`,
                  title: "New service",
                  text: "",
                  icon: "Car",
                  enabled: true,
                },
              ],
            })
          }
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold text-primary-dark hover:border-primary"
        >
          Add service
        </button>
      </AdminCard>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

/* --------------------------------- routes --------------------------------- */

export function RoutesEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("routes");
  const items = draft.items;
  const setAt = (i: number, patch: Partial<RouteItem>) =>
    update({ items: items.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });

  return (
    <div className="space-y-6">
      <AdminCard
        title="Routes & destinations"
        description="Leave the image empty to show a clean text-only route card."
      >
        {items.map((r, i) => (
          <div key={r.id} className="border border-border p-4">
            <div className="flex justify-end">
              <MoveButtons
                index={i}
                length={items.length}
                onMove={(from, to) => update({ items: move(items, from, to) })}
                onDelete={(idx) => update({ items: items.filter((_, x) => x !== idx) })}
              />
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <TextInput label="Route name" value={r.name} onChange={(name) => setAt(i, { name })} />
              <MediaField
                label="Destination image (optional)"
                value={r.image}
                onChange={(image) => setAt(i, { image })}
              />
            </div>
            <TextArea
              label="Description"
              value={r.description}
              onChange={(description) => setAt(i, { description })}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update({
              items: [
                ...items,
                {
                  id: `route-${Date.now()}`,
                  name: "Khammam → ",
                  description: "",
                  image: "",
                },
              ],
            })
          }
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold text-primary-dark hover:border-primary"
        >
          Add destination
        </button>
      </AdminCard>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

/* ---------------------------------- about --------------------------------- */

const aboutIcons = ["Clock", "Sparkles", "ShieldCheck", "MessageCircle", "Map", "Car"];

export function AboutEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("about");

  return (
    <div className="space-y-6">
      <AdminCard title="Travel with confidence" description="The 'Why choose us' block.">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput label="Eyebrow" value={draft.eyebrow} onChange={(v) => update({ eyebrow: v })} />
          <TextInput label="Heading" value={draft.heading} onChange={(v) => update({ heading: v })} />
        </div>
        {draft.points.map((p, i) => (
          <div key={i} className="border border-border p-4">
            <div className="flex justify-end">
              <MoveButtons
                index={i}
                length={draft.points.length}
                onMove={(from, to) => update({ points: move(draft.points, from, to) })}
                onDelete={(idx) => update({ points: draft.points.filter((_, x) => x !== idx) })}
              />
            </div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <TextInput
                label="Title"
                value={p.title}
                onChange={(title) =>
                  update({ points: draft.points.map((x, idx) => (idx === i ? { ...x, title } : x)) })
                }
              />
              <label className="block">
                <span className="text-sm font-medium text-foreground">Icon</span>
                <select
                  className={inputClass}
                  value={p.icon}
                  onChange={(e) =>
                    update({
                      points: draft.points.map((x, idx) =>
                        idx === i ? { ...x, icon: e.target.value } : x,
                      ),
                    })
                  }
                >
                  {aboutIcons.map((ic) => (
                    <option key={ic}>{ic}</option>
                  ))}
                </select>
              </label>
            </div>
            <TextArea
              label="Text"
              value={p.text}
              onChange={(text) =>
                update({ points: draft.points.map((x, idx) => (idx === i ? { ...x, text } : x)) })
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            update({ points: [...draft.points, { title: "New point", text: "", icon: "Car" }] })
          }
          className="inline-flex h-10 items-center border border-border px-4 text-sm font-semibold text-primary-dark hover:border-primary"
        >
          Add point
        </button>
      </AdminCard>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

/* ------------------------------ contact/footer ----------------------------- */

export function ContactEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("contact");

  return (
    <div className="space-y-6">
      <AdminCard
        title="Contact details"
        description="Used across the header, contact page, footer and WhatsApp booking."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Display phone number"
            value={draft.phone}
            onChange={(v) => update({ phone: v })}
          />
          <TextInput
            label="Call link number"
            value={draft.phoneHref}
            onChange={(v) => update({ phoneHref: v })}
            hint="Example: +919876543210"
          />
          <TextInput
            label="WhatsApp number"
            value={draft.whatsapp}
            onChange={(v) => update({ whatsapp: v })}
            hint="Country code + number, digits only. Example: 919876543210"
          />
          <TextInput
            label="Instagram URL"
            value={draft.instagram}
            onChange={(v) => update({ instagram: v })}
          />
          <TextInput
            label="Google Maps URL"
            value={draft.mapsUrl}
            onChange={(v) => update({ mapsUrl: v })}
          />
          <TextInput
            label="Address line"
            value={draft.addressLine}
            onChange={(v) => update({ addressLine: v })}
          />
          <TextInput
            label="Working hours"
            value={draft.hours}
            onChange={(v) => update({ hours: v })}
          />
        </div>
      </AdminCard>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}

export function FooterEditor() {
  const { draft, update, save, saving, saved, error } = useDraft("footer");

  return (
    <div className="space-y-6">
      <AdminCard title="Footer">
        <TextArea
          label="Footer description"
          value={draft.description}
          onChange={(v) => update({ description: v })}
        />
        <TextInput
          label="Credit line"
          value={draft.credit}
          onChange={(v) => update({ credit: v })}
        />
      </AdminCard>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
}
