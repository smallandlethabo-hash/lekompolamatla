import logo from "@/assets/logo.png.asset.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "streetwear" | "digital";
  description: string;
  image: string;
  isNew?: boolean;
  featured?: boolean;
};

// Fallback image (logo) — replace with real product photos later.
const ph = logo.url;

export const PRODUCTS: Product[] = [
  { id: "matla-tee-red", name: "MATLA Power Tee — Blood Red", price: 450, category: "streetwear", description: "Heavyweight cotton tee with screen-printed Lekompo La Matla emblem. Built for the dancefloor.", image: ph, featured: true, isNew: true },
  { id: "driller-hoodie", name: "Man Driller Signature Hoodie", price: 850, category: "streetwear", description: "Oversized fleece hoodie. Embroidered Driller logo on the chest, full back print.", image: ph, featured: true },
  { id: "lekompo-bucket", name: "Lekompo Bucket Hat — Red", price: 280, category: "streetwear", description: "The hat. As worn by Man Driller himself. Limited run.", image: ph, isNew: true },
  { id: "matla-cargo", name: "MATLA Cargo Pants", price: 920, category: "streetwear", description: "Utility cargos with reinforced knees. Built to move.", image: ph },
  { id: "drill-pack-vol1", name: "Driller Drum Pack Vol. 1", price: 199, category: "digital", description: "60+ Lekompo drum one-shots, log drums, and FX. WAV format, royalty-free.", image: ph, featured: true, isNew: true },
  { id: "log-drum-loops", name: "Log Drum Loop Kit", price: 149, category: "digital", description: "40 hard-hitting log drum loops in the key of the streets. Tempo-tagged.", image: ph },
  { id: "matla-preset", name: "MATLA Serum Preset Bank", price: 249, category: "digital", description: "75 Serum presets engineered for Lekompo and Amapiano leads, basses, and pads.", image: ph },
  { id: "vocal-chops", name: "Township Vocal Chops", price: 179, category: "digital", description: "100 dry vocal chops & adlibs. Sotho, Zulu, Xhosa flavors.", image: ph, isNew: true },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);