import p0 from "@/assets/photo0.jpg.asset.json";
import p2 from "@/assets/photo2.jpg.asset.json";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import p5 from "@/assets/photo5.jpg.asset.json";
import coral from "@/assets/earring-coral.jpg";
import yellow from "@/assets/earring-yellow.jpg";

export type Piece = {
  id: string;
  no: string;
  name: string;
  note: string;
  key: string;
  rent: number;
  own: number;
  img: string;
  altImg: string;
  bw?: boolean;
  mood: string;
  event: string;
  destination: string;
  type: string;
  views: ("new" | "edits" | "lust")[];
  tinamarie: string;
  dims: string;
  condition: string;
  provenance: string;
};

const samplePieces: Piece[] = [
  {
    id: "gilt-knot-clips", no: "041", name: "Gilt Knot Clip Earrings",
    note: "big enough to skip the necklace", key: "skip",
    rent: 85, own: 420, img: coral, altImg: p5.url,
    mood: "Unapologetic", event: "Dinner at Nine", destination: "New York Set", type: "Earrings",
    views: ["new", "lust"],
    tinamarie: "Wear these with a crisp white poplin shirt unbuttoned low or a bare collarbone. Skip the necklace — let the gilt do the talking. xx",
    dims: "1.5\" drop · 1\" wide. Clip-on backs, cushioned — comfortable for a full evening. Medium weight; you feel them, in a good way.",
    condition: "Patina and age treated as features, not flaws. Intact vintage clasp, warm 1970s gilt patina, no stone loss.",
    provenance: "c. 1974, American. Gold-tone metal over brass. From a New York estate of a woman who never left the house undecorated.",
  },
  {
    id: "crystal-waterfall-collar", no: "042", name: "Crystal Waterfall Collar",
    note: "white shirt, nothing else, trust me", key: "trust me",
    rent: 140, own: 680, img: yellow, altImg: p4.url,
    mood: "Quiet Drama", event: "Black Tie No Rules", destination: "Paris After Dark", type: "Necklaces & Collars",
    views: ["new", "edits", "lust"],
    tinamarie: "This is the piece that replaces the dress. Black column, bare arms, this at the throat. Don't explain it to anyone. xx",
    dims: "16\" collar length with 3\" graduated drop. Hook clasp, sits high on the collarbone. Surprisingly light for its presence.",
    condition: "All stones present and bright. Minor darkening to the foil backs — honest age, invisible when worn.",
    provenance: "c. 1962, likely Austrian crystal. The kind of piece that spent forty years in a velvet box waiting for the right neckline.",
  },
  {
    id: "resin-cabochon-cuff", no: "043", name: "Resin Cabochon Cuff",
    note: "the one they will ask about", key: "ask",
    rent: 95, own: 460, img: p3.url, altImg: p0.url, bw: true,
    mood: "Irreverent", event: "Gallery Opening", destination: "Somewhere Warm", type: "Cuffs & Bracelets",
    views: ["new", "edits"],
    tinamarie: "Push your sleeves up and let this be the whole sentence. It looks like something a sculptor would wear to her own opening. xx",
    dims: "2.25\" interior diameter, slightly adjustable. 1.75\" tall at the cabochon. Weighty — it announces itself when you gesture.",
    condition: "Surface scratches to the resin consistent with a life well lived. Hinge and clasp strong.",
    provenance: "c. 1980, French. Marbled poured resin on gilt metal. Found in a lot of studio jewelry from a Montparnasse atelier.",
  },
  {
    id: "baroque-pearl-drops", no: "044", name: "Baroque Pearl Drops",
    note: "pearls, but make them odd", key: "odd",
    rent: 110, own: 540, img: p5.url, altImg: p2.url, bw: true,
    mood: "A Little Dangerous", event: "Wedding Guest", destination: "Rome Rooftop", type: "Earrings",
    views: ["new", "lust"],
    tinamarie: "These are not your mother's pearls — they're your grandmother's secret ones. Hair up, shoulders bare, nothing else. xx",
    dims: "2.5\" drop. Post backs with comfort discs. Each pearl is irregular by nature — no two lights catch the same way.",
    condition: "Beautiful nacre with natural dimpling. Wires checked and re-secured by our jeweler.",
    provenance: "c. 1958, Italian. Baroque freshwater pearls, hand-knotted. Sourced from a Lake Como estate sale.",
  },
  {
    id: "hammered-sun-brooch", no: "045", name: "Hammered Sun Brooch",
    note: "pin it somewhere wrong on purpose", key: "wrong",
    rent: 75, own: 380, img: p0.url, altImg: p3.url, bw: true,
    mood: "Irreverent", event: "Gallery Opening", destination: "Somewhere Warm", type: "Brooches & Objects",
    views: ["edits"],
    tinamarie: "On a lapel it's polite. On the hip of a slip dress, or holding a scarf at the shoulder — that's when it starts trouble. xx",
    dims: "2.75\" diameter. Roll-over safety clasp, secure on silk or wool. Light enough for charmeuse.",
    condition: "Warm hammered patina, one small dent at the edge — we call it character and price accordingly.",
    provenance: "c. 1970, studio-made, unsigned — the best ones often are.",
  },
  {
    id: "onyx-deco-collar", no: "046", name: "Onyx Deco Collar",
    note: "for the entrance, not the exit", key: "entrance",
    rent: 130, own: 640, img: p4.url, altImg: p5.url, bw: true,
    mood: "A Little Dangerous", event: "Black Tie No Rules", destination: "Paris After Dark", type: "Necklaces & Collars",
    views: ["edits", "lust"],
    tinamarie: "Wear it into the room and let everyone else spend the night catching up. Backless dress. Hair severely up. xx",
    dims: "15.5\" choker length, 1\" wide band. Box clasp with safety catch. Sits like armor, feels like silk.",
    condition: "Onyx panels flawless. Gilt frame shows soft wear at the hinge only.",
    provenance: "c. 1935, Czech. Art deco construction, glass onyx. Survived a war and three decades of evenings.",
  },
  {
    id: "salt-crystal-drops", no: "047", name: "Salt Crystal Drops",
    note: "golden hour, crystallized", key: "golden",
    rent: 90, own: 440, img: p2.url, altImg: coral,
    mood: "Quiet Drama", event: "Dinner at Nine", destination: "Somewhere Warm", type: "Earrings",
    views: ["new"],
    tinamarie: "These catch candlelight the way the sea catches five o'clock. Linen, tan skin, a glass of something cold. xx",
    dims: "2\" drop, wire hooks. Feather-light — you'll forget them until someone mentions them.",
    condition: "Natural inclusions in the crystal, as found. Hooks replaced for comfort.",
    provenance: "c. 1968, Brazilian crystal, mounted in the 80s. Bought from a dealer who swore they came from a dancer's trunk.",
  },
  {
    id: "ivory-stack-bangles", no: "048", name: "Ivory Stack Bangles, Set of Three",
    note: "the sound they make is the accessory", key: "sound",
    rent: 70, own: 360, img: yellow, altImg: p0.url,
    mood: "Unapologetic", event: "Wedding Guest", destination: "Rome Rooftop", type: "Cuffs & Bracelets",
    views: ["edits"],
    tinamarie: "All three, one wrist, nothing on the other arm. They announce you half a second before you arrive. xx",
    dims: "2.5\" interior diameter each, graduated widths. Slip-on. Together they weigh about as much as a good secret.",
    condition: "Creamy age-toned resin with soft surface wear. No cracks.",
    provenance: "c. 1975, French. Sold to us as a set and kept as a set — some things shouldn't be separated.",
  },
];

// Layout samples only. Owner inventory has not been supplied or verified.
export const pieces: Piece[] = samplePieces.map(p => ({ ...p, dims: 'Measurements and fit are unverified. Please ask about this piece.', condition: 'Individual condition has not yet been verified. Please ask for a condition report and detail photographs.', provenance: 'Maker, era, materials, and origin are unverified.' }));
export const availabilityOf = (_piece: Piece) => ({ rent: true, own: true });

export const moods = ["A Little Dangerous", "Unapologetic", "Quiet Drama", "Irreverent"];
export const events = ["Black Tie No Rules", "Gallery Opening", "Dinner at Nine", "Wedding Guest"];
export const destinations = ["Somewhere Warm", "Rome Rooftop", "Paris After Dark", "New York Set"];
export const types = ["Earrings", "Necklaces & Collars", "Cuffs & Bracelets", "Brooches & Objects"];

export const getPiece = (id: string) => pieces.find((p) => p.id === id);

export const colors = ["Gold", "Crystal & Clear", "Black & Onyx", "Pearl & Ivory"];
const colorById: Record<string, string> = {
  "gilt-knot-clips": "Gold", "crystal-waterfall-collar": "Crystal & Clear", "resin-cabochon-cuff": "Black & Onyx",
  "baroque-pearl-drops": "Pearl & Ivory", "hammered-sun-brooch": "Gold", "onyx-deco-collar": "Black & Onyx",
  "salt-crystal-drops": "Crystal & Clear", "ivory-stack-bangles": "Pearl & Ivory",
};
export const colorOf = (p: Piece) => colorById[p.id] ?? "Gold";
export const taglines: Record<string, string> = Object.fromEntries(pieces.map(p => [p.id, 'A statement piece from the sample archive selection.']));
export const weights: Record<string, string> = {};
