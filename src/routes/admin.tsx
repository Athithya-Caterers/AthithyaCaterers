// Admin Dashboard — beginner-friendly interface for catering owners.
// Local-only demo (state in memory): add/edit/delete dishes, change prices,
// toggle availability, mark popular, and view sample inquiries.
//
// In a real deployment, wire these handlers to Lovable Cloud (Supabase)
// server functions backed by RLS-protected tables.

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Search, X, MessageSquare, Utensils } from "lucide-react";
import { CATEGORIES, MENU, type CategoryId, type MenuItem } from "@/lib/menu-data";
import { formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Athithya Caterers" },
      { name: "description", content: "Manage menu items, prices, availability and inquiries." },
    ],
  }),
  component: AdminPage,
});

// Sample inquiries (demo data)
const SAMPLE_INQUIRIES = [
  { id: 1, name: "Priya R.", phone: "+91 98765 11111", event: "Wedding", guests: 350, date: "2026-07-12", status: "new" },
  { id: 2, name: "Infosys HR", phone: "+91 98765 22222", event: "Corporate", guests: 120, date: "2026-06-21", status: "contacted" },
  { id: 3, name: "Vikram S.", phone: "+91 98765 33333", event: "Birthday", guests: 60, date: "2026-06-30", status: "new" },
];

type Tab = "menu" | "inquiries";

function AdminPage() {
  const [tab, setTab] = useState<Tab>("menu");

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Admin
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold lg:text-5xl">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your menu, prices and customer inquiries — all in one place.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1">
          <TabBtn active={tab === "menu"} onClick={() => setTab("menu")} icon={Utensils}>Menu</TabBtn>
          <TabBtn active={tab === "inquiries"} onClick={() => setTab("inquiries")} icon={MessageSquare}>Inquiries</TabBtn>
        </div>
      </header>

      <div className="mt-10">
        {tab === "menu" ? <MenuManager /> : <Inquiries />}
      </div>
    </section>
  );
}

function TabBtn({ active, onClick, icon: Icon, children }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

// ============= Menu manager =============
function MenuManager() {
  // Local copy — edits don't persist (demo)
  const [items, setItems] = useState<MenuItem[]>(() => MENU.map((m) => ({ ...m, available: m.available ?? true })));
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(
    () => items.filter((i) => `${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  function upsert(item: MenuItem) {
    setItems((all) => {
      const exists = all.some((x) => x.id === item.id);
      return exists ? all.map((x) => (x.id === item.id ? item : x)) : [item, ...all];
    });
    setEditing(null);
    setCreating(false);
  }
  function remove(id: string) {
    if (!confirm("Delete this dish?")) return;
    setItems((all) => all.filter((x) => x.id !== id));
  }
  function toggleAvailable(id: string) {
    setItems((all) => all.map((x) => (x.id === id ? { ...x, available: !x.available } : x)));
  }
  function togglePopular(id: string) {
    setItems((all) => all.map((x) => (x.id === id ? { ...x, popular: !x.popular } : x)));
  }

  return (
    <>
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total dishes" value={items.length.toString()} />
        <Stat label="Available" value={items.filter((i) => i.available).length.toString()} />
        <Stat label="Categories" value={CATEGORIES.length.toString()} />
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <label className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="w-full rounded-full border border-border bg-card/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
        </label>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground shadow-gold"
        >
          <Plus className="h-4 w-4" /> Add dish
        </button>
      </div>

      {/* Table (responsive — cards on mobile, table on lg) */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border/70 bg-card/40">
        <div className="hidden grid-cols-[2.5fr_1.4fr_1fr_1fr_auto] gap-4 border-b border-border/70 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:grid">
          <div>Dish</div><div>Category</div><div>Price</div><div>Status</div><div className="text-right">Actions</div>
        </div>
        <ul className="divide-y divide-border/60">
          {filtered.map((item) => (
            <li key={item.id} className="grid gap-3 p-4 lg:grid-cols-[2.5fr_1.4fr_1fr_1fr_auto] lg:items-center lg:gap-4 lg:px-5">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} loading="lazy" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {CATEGORIES.find((c) => c.id === item.category)?.label}
                <span className={`ml-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${item.veg ? "bg-[var(--veg)]/20 text-[var(--veg)]" : "bg-[var(--nonveg)]/20 text-[var(--nonveg)]"}`}>
                  {item.veg ? "Veg" : "Non-Veg"}
                </span>
              </div>
              <div className="font-display font-semibold text-primary">{formatINR(item.price)}</div>
              <div>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${item.available ? "bg-emerald-500/15 text-emerald-400" : "bg-zinc-500/15 text-zinc-400"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${item.available ? "bg-emerald-400" : "bg-zinc-400"}`} />
                  {item.available ? "Available" : "Hidden"}
                </span>
              </div>
              <div className="flex flex-wrap justify-start gap-1.5 lg:justify-end">
                <IconBtn onClick={() => togglePopular(item.id)} title={item.popular ? "Unmark popular" : "Mark popular"}>
                  <Star className={`h-4 w-4 ${item.popular ? "fill-primary text-primary" : ""}`} />
                </IconBtn>
                <IconBtn onClick={() => toggleAvailable(item.id)} title="Toggle availability">
                  {item.available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </IconBtn>
                <IconBtn onClick={() => setEditing(item)} title="Edit"><Pencil className="h-4 w-4" /></IconBtn>
                <IconBtn onClick={() => remove(item.id)} title="Delete" danger><Trash2 className="h-4 w-4" /></IconBtn>
              </div>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="p-10 text-center text-muted-foreground">No dishes match.</p>
        )}
      </div>

      {(editing || creating) && (
        <DishEditor
          initial={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={upsert}
        />
      )}
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-5">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-primary">{value}</p>
    </div>
  );
}

function IconBtn({ children, onClick, title, danger }: { children: React.ReactNode; onClick: () => void; title: string; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`grid h-9 w-9 place-items-center rounded-full border border-border bg-background transition-colors ${
        danger ? "hover:border-destructive hover:text-destructive" : "hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

// ============= Dish editor (modal) =============
function DishEditor({ initial, onClose, onSave }: { initial: MenuItem | null; onClose: () => void; onSave: (m: MenuItem) => void }) {
  const isNew = !initial;
  const [form, setForm] = useState<MenuItem>(
    initial ?? {
      id: `new-${Date.now()}`,
      name: "",
      description: "",
      price: 100,
      veg: true,
      category: "veg-starters" as CategoryId,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=70",
      available: true,
    }
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur">
      <form onSubmit={submit} className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-gold">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold">{isNew ? "Add dish" : "Edit dish"}</h3>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <label className="grid gap-2 text-sm">
            <span className="font-medium">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Price (₹/plate)" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) || 0 })} />
            <label className="grid gap-2 text-sm">
              <span className="font-medium">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as CategoryId })}
                className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </label>
          </div>
          <Input label="Image URL" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          <div className="flex gap-5 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.veg} onChange={(e) => setForm({ ...form, veg: e.target.checked })} />
              Vegetarian
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
              Mark popular
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.available !== false} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
              Available
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold">
            Cancel
          </button>
          <button type="submit" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold">
            {isNew ? "Add dish" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}

// ============= Inquiries =============
function Inquiries() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40">
      <table className="w-full text-sm">
        <thead className="bg-card text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Customer</th>
            <th className="px-5 py-3">Event</th>
            <th className="px-5 py-3">Guests</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {SAMPLE_INQUIRIES.map((i) => (
            <tr key={i.id} className="hover:bg-card/60">
              <td className="px-5 py-4">
                <p className="font-semibold">{i.name}</p>
                <p className="text-xs text-muted-foreground">{i.phone}</p>
              </td>
              <td className="px-5 py-4">{i.event}</td>
              <td className="px-5 py-4">{i.guests}</td>
              <td className="px-5 py-4">{i.date}</td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  i.status === "new" ? "bg-primary/15 text-primary" : "bg-emerald-500/15 text-emerald-400"
                }`}>
                  {i.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
