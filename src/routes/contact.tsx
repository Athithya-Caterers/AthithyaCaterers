// Contact page with form (client-side validation), info, and embedded map.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Athithya Caterers" },
      { name: "description", content: "Get in touch — phone, WhatsApp, email and address. Send us a quick inquiry." },
    ],
  }),
  component: ContactPage,
});

const PHONE_DISPLAY = "+91 9845172865, +91 9980124787";
const PHONE_E164 = "9845172865";
// const EMAIL = "hello@athithya.in";

// Zod schema for inquiry form
const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  eventType: z.string().min(1, "Pick an event type"),
  guests: z.coerce.number().min(1).max(10000),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[String(i.path[0])] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    // In a real app, post to a server function or webhook.
    console.log("Inquiry:", parsed.data);
    setSent(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold lg:text-5xl">
          Let's plan your <span className="text-gradient-gold">celebration</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Reach us by phone, WhatsApp, email — or send a quick inquiry below and our
          event manager will get back within a few hours.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Form */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 lg:p-8">
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <h2 className="font-display text-2xl font-semibold">Inquiry received</h2>
              <p className="max-w-md text-muted-foreground">
                Thank you! We've noted your request and will reach out within a few hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 rounded-full border border-border px-5 py-2 text-sm font-semibold"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <Field label="Your name" name="name" error={errors.name} required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" error={errors.phone} required />
                <Field label="Email" name="email" type="email" error={errors.email} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">Event type</span>
                  <select
                    name="eventType"
                    defaultValue=""
                    className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="" disabled>Select…</option>
                    {["Wedding", "Reception", "Corporate", "Birthday", "Family function", "Other"].map((e) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                  {errors.eventType && <span className="text-xs text-destructive">{errors.eventType}</span>}
                </label>
                <Field label="Guest count" name="guests" type="number" defaultValue="100" error={errors.guests} required />
              </div>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Message (optional)</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Date, venue, preferences…"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" /> Send inquiry
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <div className="grid content-start gap-4">
          <ContactCard icon={Phone} label="Call us" value={PHONE_DISPLAY} href={`tel:${PHONE_E164}`} />
          <ContactCard
            icon={MessageCircle}
            label="WhatsApp"
            value="Chat instantly"
            href={`https://wa.me/${PHONE_E164}`}
            external
            highlight
          />
          {/* <ContactCard icon={Mail} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} /> */}
          {/* <ContactCard icon={MapPin} label="Visit" value="MG Road, Bengaluru, Karnataka" /> */}

          {/* Map */}
          {/* <div className="overflow-hidden rounded-2xl border border-border/70">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Bengaluru&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              className="block"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", error, required, defaultValue,
}: { label: string; name: string; type?: string; error?: string; required?: boolean; defaultValue?: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}{required && <span className="text-primary"> *</span>}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </label>
  );
}

function ContactCard({
  icon: Icon, label, value, href, external, highlight,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; external?: boolean; highlight?: boolean }) {
  const Wrap: any = href ? "a" : "div";
  return (
    <Wrap
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-4 rounded-2xl border p-5 transition-colors ${
        highlight
          ? "border-primary/50 bg-primary/10 hover:bg-primary/15"
          : "border-border/70 bg-card/60 hover:border-primary/40"
      }`}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-semibold">{value}</p>
      </div>
    </Wrap>
  );
}
