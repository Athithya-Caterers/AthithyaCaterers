// Site footer with contact + nav.
import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, UtensilsCrossed } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
            </span>
            <span className="font-display text-lg font-semibold">
              Athithya <span className="text-gradient-gold">Caterers</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-muted-foreground">{/*//?? */}
            Crafting memorable feasts for weddings, receptions, corporate events and
            family celebrations across Mangalore since 2020.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">Explore</h4>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/quote" className="hover:text-primary">My Plate</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">Reach us</h4>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 9845172865, +91 9980124787</li>
            {/* <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@athithya.in</li> */}
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Mangalore, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Athithya Caterers. Crafted with love for every celebration.
      </div>
    </footer>
  );
}
