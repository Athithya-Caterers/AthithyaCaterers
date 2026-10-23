// Home / Landing page
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ChefHat, Users, Calendar, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import { MENU, PACKAGES } from "@/lib/menu-data";
import { MenuItemCard } from "@/components/MenuItemCard";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Athithya Caterers — Delicious Catering for Every Celebration" },
      { name: "description", content: "Customize your menu and instantly calculate your per-plate cost. Weddings, receptions, corporate events." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  // Pick a few popular dishes for the homepage preview
  const popular = MENU.filter((m) => m.popular).slice(0, 6);

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Trusted by 100+ celebrations {/* //?? */}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Delicious catering for{" "}
              <span className="text-gradient-gold">every celebration</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Customize your menu from authentic regional classics. From intimate gatherings to grand weddings —
              we plate your moments beautifully.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
              >
                View Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3.5 text-base font-semibold hover:border-primary/60"
              >
                Contact Us
              </Link>
            </div>

            {/* Quick stats */} {/* //?? */}
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { k: "5+", v: "Years" },
                { k: "100+", v: "Events" },
                { k: "50+", v: "Dishes" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-bold text-primary">{s.k}</dt>
                  <dd className="text-sm text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-gold">
              <img
                src={heroImg}
                alt="An elegant Indian catering spread with biryani, curries and naan"
                width={1920}
                height={1080}
                className="h-[480px] w-full object-cover lg:h-[560px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
            </div>
            {/* Floating price card */}
            {/* <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-border/70 bg-card/95 p-4 shadow-gold backdrop-blur md:block">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Starting at</p>
              <p className="font-display text-2xl font-bold text-primary">{formatINR(549)}<span className="text-sm font-normal text-muted-foreground">/plate</span></p>
            </div> */}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */} {/* //?? */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 md:grid-cols-3 lg:px-8">
          {[
            { icon: ChefHat, title: "1. Pick your dishes", desc: "Browse our curated menu and tap to add favorites to your plate." },
            { icon: Users, title: "2. Set guest count", desc: "Enter how many guests you'll host." },
            { icon: Calendar, title: "3. Request a order", desc: "Get a confirmed order and connect with our event manager." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border/70 bg-background/40 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== POPULAR DISHES ===================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold lg:text-4xl">
              Most-loved <span className="text-gradient-gold">signature dishes</span>
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Time-tested favorites that earn repeat orders at every event.
            </p>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            See full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((m) => (
            <MenuItemCard key={m.id} item={m} />
          ))}
        </div>
      </section>

      {/* ===================== PACKAGES ===================== */}
      {/* <section className="border-y border-border/60 bg-card/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold lg:text-4xl">
            Pick a <span className="text-gradient-gold">curated package</span> or build your own
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Recommended menus designed by our chefs for the most common celebrations.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PACKAGES.map((p) => (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br ${p.color} p-7`}
              >
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.ideal}</p>
                <p className="mt-6 font-display text-4xl font-bold text-primary">
                  {formatINR(p.price)}
                  <span className="text-sm font-normal text-muted-foreground"> /plate</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{p.items} hand-picked dishes</p>
                <Link
                  to="/menu"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/50 px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===================== ABOUT TEASER ===================== */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-3xl border border-border/60">
          <img src={aboutImg} alt="A beautifully plated feast on a dark table" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            A family of <span className="text-gradient-gold">passionate culinary artists</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            For over five years, Athithya has plated the most important moments —
            weddings, receptions, corporate galas, birthdays and family gatherings —
            with warmth, hygiene and obsessive attention to flavor. Every dish on our
            menu has been refined across hundreds of events.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-5 py-2.5 text-sm font-semibold hover:border-primary/60"
          >
            Our story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24">
        <h2 className="font-display text-3xl font-bold lg:text-4xl">
          What our clients <span className="text-gradient-gold">say</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { name: "Priya & Karthik", role: "Wedding, Bengaluru", text: "Every guest asked for the chef's name. The biryani disappeared in minutes!" },
            { name: "Anita Rao", role: "Corporate gala, Infosys", text: "Punctual, hygienic, and the presentation was magazine-worthy. Smooth from start to finish." },
            { name: "Vikram Shetty", role: "60th Birthday", text: "Felt like family. They made my father's day truly special." },
          ].map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border/70 bg-card/60 p-6">
              <Quote className="h-6 w-6 text-primary/60" />
              <blockquote className="mt-3 text-foreground/90">"{t.text}"</blockquote>
              <figcaption className="mt-5 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/15 via-card to-card p-10 text-center lg:p-16">
          <h2 className="font-display text-3xl font-bold lg:text-4xl">
            Planning something <span className="text-gradient-gold">memorable</span>?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Build your menu in minutes and we'll handle the rest.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-gold">
              Start building <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-6 py-3.5 font-semibold">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
