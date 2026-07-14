// Menu catalog for Athithya Caterers
// Each category contains items with name, price (per plate, INR), description,
// veg flag, popularity, and a remote image URL (Unsplash food photography).
// Admin dashboard can edit this in-memory for the current session.

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number; // per plate, INR
  veg: boolean;
  category: CategoryId;
  image: string;
  popular?: boolean;
  available?: boolean;
};

export type CategoryId =
  | "welcome-drinks"
  | "veg-starters"
  | "nonveg-starters"
  | "veg-main"
  | "nonveg-main"
  | "desserts"
  | "beverages";

export const CATEGORIES: { id: CategoryId; label: string; tagline: string }[] = [
  { id: "welcome-drinks", label: "Welcome Drinks", tagline: "Refreshing first impressions" },
  { id: "veg-starters", label: "Veg Starters", tagline: "Crispy, spiced, irresistible" },
  { id: "nonveg-starters", label: "Non-Veg Starters", tagline: "Bold flavors to begin" },
  { id: "veg-main", label: "Veg Main Course", tagline: "Hearty traditional classics" },
  { id: "nonveg-main", label: "Non-Veg Main Course", tagline: "Slow-cooked signatures" },
  { id: "desserts", label: "Desserts", tagline: "A sweet finale" },
  { id: "beverages", label: "Drinks & Beverages", tagline: "Sip & celebrate" },
];

// Helper for Unsplash food images sized for cards
const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const MENU: MenuItem[] = [
  // Welcome drinks
  { id: "wd-1", category: "welcome-drinks", name: "Rose Sherbet", description: "Chilled rose-petal cooler with a hint of cardamom", price: 60, veg: true, image: img("photo-1544145945-f90425340c7e"), popular: true, available: true },
  { id: "wd-2", category: "welcome-drinks", name: "Jal Jeera", description: "Tangy cumin-mint refresher served in copper cups", price: 50, veg: true, image: img("photo-1622597467836-f3285f2131b8"), available: true },
  { id: "wd-3", category: "welcome-drinks", name: "Aam Panna", description: "Roasted raw-mango summer classic", price: 70, veg: true, image: img("photo-1546171753-97d7676e4602"), available: true },

  // Veg starters
  { id: "vs-1", category: "veg-starters", name: "Paneer Tikka", description: "Smoky tandoor-charred cottage cheese, mint chutney", price: 180, veg: true, image: img("photo-1599487488170-d11ec9c172f0"), popular: true, available: true },
  { id: "vs-2", category: "veg-starters", name: "Hara Bhara Kebab", description: "Spinach, peas & potato patties with chaat masala", price: 140, veg: true, image: img("photo-1601050690597-df0568f70950"), available: true },
  { id: "vs-3", category: "veg-starters", name: "Crispy Corn Chilli", description: "Wok-tossed sweet corn in Indo-Chinese sauce", price: 150, veg: true, image: img("photo-1626777552726-4a6b54c97e46"), available: true },

  // Non-veg starters
  { id: "ns-1", category: "nonveg-starters", name: "Murgh Malai Tikka", description: "Creamy yogurt-marinated chicken, charcoal grilled", price: 240, veg: false, image: img("photo-1606756790138-261d2b21cd75"), popular: true, available: true },
  { id: "ns-2", category: "nonveg-starters", name: "Fish Amritsari", description: "Crisp gram-flour battered river sole", price: 280, veg: false, image: img("photo-1626645738196-c2a7c87a8f9c"), available: true },
  { id: "ns-3", category: "nonveg-starters", name: "Mutton Seekh Kebab", description: "Minced lamb skewers with warm spices", price: 320, veg: false, image: img("photo-1633237308525-cd587cf71926"), available: true },

  // Veg mains
  { id: "vm-1", category: "veg-main", name: "Paneer Butter Masala", description: "Velvety tomato-cashew gravy, fresh cream", price: 220, veg: true, image: img("photo-1631452180519-c014fe946bc7"), popular: true, available: true },
  { id: "vm-2", category: "veg-main", name: "Dal Makhani", description: "Black lentils slow-simmered overnight", price: 180, veg: true, image: img("photo-1626777553635-4c2c8c8b2b1a"), available: true },
  { id: "vm-3", category: "veg-main", name: "Veg Biryani", description: "Fragrant basmati layered with saffron & vegetables", price: 200, veg: true, image: img("photo-1563379091339-03b21ab4a4f8"), available: true },
  { id: "vm-4", category: "veg-main", name: "Assorted Indian Breads", description: "Naan, roti, lachha paratha basket", price: 90, veg: true, image: img("photo-1574894709920-11b28e7367e3"), available: true },

  // Non-veg mains
  { id: "nm-1", category: "nonveg-main", name: "Hyderabadi Chicken Biryani", description: "Dum-cooked basmati with marinated chicken", price: 320, veg: false, image: img("photo-1633945274405-b6c8069047b0"), popular: true, available: true },
  { id: "nm-2", category: "nonveg-main", name: "Butter Chicken", description: "Tandoori chicken in silky tomato gravy", price: 300, veg: false, image: img("photo-1603894584373-5ac82b2ae398"), available: true },
  { id: "nm-3", category: "nonveg-main", name: "Mutton Rogan Josh", description: "Kashmiri lamb curry with whole spices", price: 380, veg: false, image: img("photo-1545247181-516773cae754"), available: true },

  // Desserts
  { id: "ds-1", category: "desserts", name: "Gulab Jamun", description: "Warm milk dumplings in rose-cardamom syrup", price: 80, veg: true, image: img("photo-1602253057119-44d745d9b860"), popular: true, available: true },
  { id: "ds-2", category: "desserts", name: "Rasmalai", description: "Saffron-soaked cottage cheese discs", price: 100, veg: true, image: img("photo-1571877227200-a0d98ea607e9"), available: true },
  { id: "ds-3", category: "desserts", name: "Kesar Pista Kulfi", description: "Slow-churned saffron-pistachio ice cream", price: 90, veg: true, image: img("photo-1488477181946-6428a0291777"), available: true },

  // Beverages
  { id: "bv-1", category: "beverages", name: "Masala Chai", description: "Brewed with whole spices and farm milk", price: 40, veg: true, image: img("photo-1571934811356-5cc061b6821f"), available: true },
  { id: "bv-2", category: "beverages", name: "Sweet Lassi", description: "Thick yogurt blend with rose & pistachio", price: 60, veg: true, image: img("photo-1626078299034-94f96e2c92ff"), available: true },
  { id: "bv-3", category: "beverages", name: "Filter Coffee", description: "South-Indian decoction served in tumblers", price: 50, veg: true, image: img("photo-1509042239860-f550ce710b93"), available: true },
];

// Curated event packages (per-plate target prices, suggested items)
export const PACKAGES = [
  { id: "p-silver", name: "Silver", price: 549, ideal: "Birthdays & family gatherings", items: 8, color: "from-zinc-400/30 to-zinc-200/10" },
  { id: "p-gold", name: "Gold", price: 849, ideal: "Receptions & corporate events", items: 14, color: "from-amber-500/30 to-amber-200/10" },
  { id: "p-platinum", name: "Platinum", price: 1199, ideal: "Weddings & grand celebrations", items: 22, color: "from-amber-300/40 to-yellow-100/10" },
];
