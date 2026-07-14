// Sticky top navigation. Dark glass with gold accent on active route.
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/lib/cart-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40 transition-transform group-hover:scale-105">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Athithya <span className="text-gradient-gold">Caterers</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-foreground/80 hover:text-primary hover:bg-card"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/quote"
            className="relative inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
          >
            My Plate
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary-foreground/90 px-1 text-xs font-bold text-primary">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium ${
                    active ? "bg-primary/15 text-primary" : "text-foreground/90 hover:bg-card"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
            >
              My Plate {count > 0 && <span>({count})</span>}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
