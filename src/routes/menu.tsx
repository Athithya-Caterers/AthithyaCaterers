// Interactive Menu page with category tabs, search, veg/non-veg filter,
// and a sticky live price calculator sidebar.
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Leaf, Drumstick, X } from "lucide-react";
import { CATEGORIES, MENU, type CategoryId } from "@/lib/menu-data";
import { MenuItemCard } from "@/components/MenuItemCard";
import { CartSummary } from "@/components/CartSummary";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Athithya Caterers" },
      { name: "description", content: "Browse our full catering menu by category. Build your plate and estimate cost live." },
    ],
  }),
  component: MenuPage,
});

type Filter = "all" | "veg" | "nonveg";

function MenuPage() {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return MENU.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (filter === "veg" && !m.veg) return false;
      if (filter === "nonveg" && m.veg) return false;
      if (query && !`${m.name} ${m.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [category, query, filter]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-bold lg:text-5xl">
          Our <span className="text-gradient-gold">menu</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Tap to add dishes and watch your per-plate price update on the right.
          Adjust quantities and guest count anytime.
        </p>
      </header>

      {/* Search + filters */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="w-full rounded-full border border-border bg-card/60 py-3 pl-11 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          {([
            { id: "all", label: "All", icon: null },
            { id: "veg", label: "Veg", icon: Leaf },
            { id: "nonveg", label: "Non-Veg", icon: Drumstick },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.icon ? <f.icon className="h-3.5 w-3.5" /> : null}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="overflow-x-auto scrollbar scrollbar-h-1 scrollbar-thumb-white/20 scrollbar-track-transparent mt-6 -mx-5 px-5 pb-1 lg:mx-0 lg:px-0">
        <div className="flex min-w-max gap-2">
          <CatBtn active={category === "all"} onClick={() => setCategory("all")}>
            All ({MENU.length})
          </CatBtn>
          {CATEGORIES.map((c) => (
            <CatBtn key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </CatBtn>
          ))}
        </div>
      </div>

      {/* Body: grid + sticky cart */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No dishes match. Try a different search or filter.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((m) => (
                <MenuItemCard key={m.id} item={m} />
              ))}
            </div>
          )}
        </div>

        <CartSummary />
      </div>
    </div>
  );
}

function CatBtn({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
