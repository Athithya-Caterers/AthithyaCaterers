// Quote Summary page — full review of selected items, guest count, totals.
// Customer can confirm, share via WhatsApp, or download a print-ready quote.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart, formatINR } from "@/lib/cart-store";
import { ArrowLeft, MessageCircle, Printer, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Quote Summary — Athithya Caterers" },
      { name: "description", content: "Review your custom menu and per-plate cost estimate." },
    ],
  }),
  component: QuotePage,
});

const PHONE = "6363520417";

function QuotePage() {
  const { selectedItems, perPlate, total, guests, setGuests, clear } = useCart();

  const waText = encodeURIComponent(
    `Hi Athithya, I'd like a quote for ${guests} guests.\n\n` +
      selectedItems.map(({ item, qty }) => `• ${item.name} x${qty}`).join("\n") +
      `\n\nEstimated total: ${formatINR(total)} (${formatINR(perPlate)}/plate)`
  );

  if (selectedItems.length === 0) {
    return (
      <section className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">Your plate is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Browse the menu and tap “Add to Plate” to start building your custom catering quote.
        </p>
        <Link
          to="/menu"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-gold"
        >
          Explore the menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
      <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to menu
      </Link>

      <header className="mt-4">
        <h1 className="font-display text-4xl font-bold lg:text-5xl">
          Your <span className="text-gradient-gold">quote summary</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Review the details below, then share with our team to confirm.</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Items list */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6">
          <h2 className="font-display text-xl font-semibold">Selected dishes ({selectedItems.length})</h2>
          <div className="mt-5 divide-y divide-border/60">
            {selectedItems.map(({ item, qty }) => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <img src={item.image} alt={item.name} loading="lazy" width={80} height={80} className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatINR(item.price)} / plate × {qty}</p>
                </div>
                <p className="font-display text-base font-semibold text-primary">{formatINR(item.price * qty)}</p>
              </div>
            ))}
          </div>
          <button onClick={clear} className="mt-4 text-xs text-muted-foreground hover:text-destructive">
            Clear all items
          </button>
        </div>

        {/* Totals + actions */}
        <aside className="rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/10 via-card to-card p-6">
          <h2 className="font-display text-xl font-semibold">Estimate</h2>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-muted-foreground">Guest count</span>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 0))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-lg font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <dl className="mt-5 space-y-2 text-sm">
            <Row k="Per plate" v={formatINR(perPlate)} />
            <Row k="Guests" v={guests.toString()} />
          </dl>

          <div className="mt-4 rounded-2xl bg-primary/15 p-4">
            <p className="text-xs uppercase tracking-wider text-primary">Estimated total</p>
            <p className="font-display text-4xl font-bold text-primary">{formatINR(total)}</p>
          </div>

          <div className="mt-5 grid gap-2.5">
            <a
              href={`https://wa.me/${PHONE}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> Send via WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-gold"
            >
              Confirm via inquiry form
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 font-semibold"
            >
              <Printer className="h-4 w-4" /> Print / save PDF
            </button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Indicative estimate. Final pricing depends on venue, date and serving style.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}
