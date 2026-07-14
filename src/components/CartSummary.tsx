// Sticky live price calculator. Used as a sidebar on /menu and a card on /quote.
import { Link } from "@tanstack/react-router";
import { Users, Trash2, FileText } from "lucide-react";
import { formatINR, useCart } from "@/lib/cart-store";

export function CartSummary({ compact = false }: { compact?: boolean }) {
  const { selectedItems, perPlate, total, guests, setGuests, setQty, clear } = useCart();

  return (
    <aside
      className={`rounded-2xl border border-border/70 bg-card/80 p-5 backdrop-blur ${
        compact ? "" : "lg:sticky lg:top-24"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold">Your Plate</h3>
        {selectedItems.length > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Guest count input — large for accessibility */}
      <label className="mt-5 block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Users className="h-4 w-4 text-primary" /> Guest count
        </span>
        <input
          type="number"
          min={1}
          max={5000}
          inputMode="numeric"
          value={guests}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 0))}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
      </label>

      {/* Items list */}
      <div className="mt-5 max-h-72 space-y-2 overflow-y-auto pr-1">
        {selectedItems.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/80 p-4 text-center text-sm text-muted-foreground">
            Tap “Add to Plate” on any menu item to build your custom menu.
          </p>
        ) : (
          selectedItems.map(({ item, qty }) => (
            <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-background/60 p-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">{formatINR(item.price)} / plate</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setQty(item.id, qty - 1)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-card text-foreground hover:bg-secondary"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(item.id, qty + 1)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="mt-5 space-y-2 border-t border-border/70 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Per plate</span>
          <span className="font-semibold">{formatINR(perPlate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Guests</span>
          <span className="font-semibold">{guests}</span>
        </div>
        <div className="mt-2 flex items-end justify-between rounded-xl bg-primary/10 p-3">
          <span className="font-display text-sm uppercase tracking-wider text-primary">Estimated total</span>
          <span className="font-display text-2xl font-bold text-primary">{formatINR(total)}</span>
        </div>
      </div>

      <Link
        to="/quote"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold transition-transform hover:-translate-y-0.5"
      >
        <FileText className="h-4 w-4" /> Request Quote
      </Link>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Indicative pricing. Final quote shared after consultation.
      </p>
    </aside>
  );
}
