// About page — story, values, event types served, gallery and FAQ.
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Sparkles, Clock, ChevronDown } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Athithya Caterers" },
      { name: "description", content: "Our story, values and the events we cater — weddings, corporate, family gatherings and more." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, title: "Made with love", desc: "Family recipes refined over generations." },
  { icon: ShieldCheck, title: "Safe & hygienic", desc: "FSSAI-certified kitchens, sealed transport." },
  { icon: Sparkles, title: "Premium presentation", desc: "Plating that complements your décor." },
  { icon: Clock, title: "Always on time", desc: "Punctual setup, hot servings till the last guest." },
];

const EVENTS = ["Weddings", "Receptions", "Corporate events", "Birthdays", "Family functions", "House warmings"];

const FAQ = [
  { q: "How far in advance should I book?", a: "We recommend at least 3-4 weeks for weddings and 1 week for smaller events. Last-minute bookings are accommodated based on availability." },
  { q: "Do you handle setup and serving staff?", a: "Yes. Our quote includes uniformed serving staff, chafing dishes, table linen and complete setup-to-cleanup." },
  { q: "Can I customize a package?", a: "Absolutely. Use our menu builder to pick exact dishes, or speak to our event manager for a fully bespoke menu." },
  { q: "Is the per-plate price final?", a: "It's an indicative estimate. We finalize after understanding venue logistics, special diets and serving style." },
  { q: "Do you cater Jain / Sattvic menus?", a: "Yes — we offer Jain, Sattvic, no-onion-no-garlic and other specialized menus on request." },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Our Story
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold lg:text-5xl">
            Hospitality is our <span className="text-gradient-gold">heritage</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Athithya was born from a simple belief — that the food at your celebration
            should feel as personal as the moment itself. From a single home kitchen
            in 2008 to plating over five hundred events a year, we've stayed true to
            that promise.
          </p>
          <p className="mt-4 text-muted-foreground">
            The word <em>Athithya</em> means hospitality. It's not just our name —
            it's our standard for every guest, every plate, every event.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border/60 shadow-gold">
          <img src={aboutImg} alt="A premium catering spread" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/60 bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold lg:text-4xl">
            What you can <span className="text-gradient-gold">count on</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border/70 bg-background/40 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events served */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <h2 className="font-display text-3xl font-bold lg:text-4xl">
          We cater <span className="text-gradient-gold">every kind</span> of celebration
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {EVENTS.map((e) => (
            <span
              key={e}
              className="rounded-full border border-border/80 bg-card/60 px-5 py-2.5 text-sm font-medium hover:border-primary/60"
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <h2 className="font-display text-3xl font-bold lg:text-4xl">Event gallery</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            "photo-1530103862676-de8c9debad1d",
            "photo-1555244162-803834f70033",
            "photo-1414235077428-338989a2e8c0",
            "photo-1565299624946-b28f40a0ae38",
            "photo-1467003909585-2f8a72700288",
            "photo-1502301103665-0b95cc738daf",
            "photo-1556909114-f6e7ad7d3136",
            "photo-1556910103-1c02745aae4d",
          ].map((id) => (
            <div key={id} className="aspect-square overflow-hidden rounded-xl border border-border/60">
              <img
                src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold lg:text-4xl">
          Frequently <span className="text-gradient-gold">asked</span>
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((f, i) => (
            <FaqItem key={i} {...f} />
          ))}
        </div>
      </section>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-semibold"
      >
        {q}
        <ChevronDown className={`h-5 w-5 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-5 pb-5 text-muted-foreground">{a}</div>}
    </div>
  );
}
