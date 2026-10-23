// Reusable menu item card with veg/non-veg tag, popular badge,
// quantity controls and "Add to Plate" button.
import { Leaf, Drumstick, Plus, Minus, Star } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { formatINR, useCart } from "@/lib/cart-store";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { items, add, remove } = useCart();
  const qty = items[item.id] ?? 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all hover:-translate-y-0.5 hover:shadow-gold hover:ring-gold">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Veg/Non-veg badge */}
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${
            item.veg
              ? "bg-[oklch(0.15_0_0/0.5)] text-[var(--veg)] ring-1 ring-[var(--veg)]/50"
              : "bg-[oklch(0.15_0_0/0.5)] text-[var(--nonveg)] ring-1 ring-[var(--nonveg)]/50"
          }`}
        >
          {item.veg ? <Leaf className="h-3 w-3" /> : <Drumstick className="h-3 w-3" />}
          {item.veg ? "Veg" : "Non-Veg"}
        </span>

        {item.popular && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            <Star className="h-3 w-3 fill-current" /> Popular
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">{item.name}</h3>
          {/* <span className="shrink-0 font-display text-base font-semibold text-primary">{formatINR(item.price)}</span> */}
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          {qty === 0 ? (
            <button
              onClick={() => add(item.id)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" /> Add to Plate
            </button>
          ) : (
            <button
              onClick={() => remove(item.id)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 p-1 text-sm font-semibold bg-primary px-4 py-2.5"
            >
              <Minus className="h-4 w-4" /> Remove from Plate
            </button>
            // <div className="flex w-full items-center justify-between rounded-full border border-primary/40 bg-primary/10 p-1">
            //   <button
            //     onClick={() => remove(item.id)}
            //     aria-label="Decrease"
            //     className="grid h-9 w-9 place-items-center rounded-full bg-background text-primary hover:bg-card"
            //   >
            //     <Minus className="h-4 w-4" />
            //   </button>
            //   <span className="font-semibold text-primary">{qty}</span>
            //   <button
            //     onClick={() => add(item.id)}
            //     aria-label="Increase"
            //     className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
            //   >
            //     <Plus className="h-4 w-4" />
            //   </button>
            // </div>
          )}
        </div>
      </div>
    </article>
  );
}
