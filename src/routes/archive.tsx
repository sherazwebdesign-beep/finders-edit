import { Button } from '@/components/ui/button';
import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { pieces, moods, events, destinations, types, colors, colorOf, availabilityOf } from "@/lib/pieces";
import { useBag } from "@/lib/bag";
import { Arrow, Mark, Under } from "@/lib/pen";

const schema = z.object({
  view: fallback(z.string(), "all").default("all"),
  mood: fallback(z.string(), "").default(""),
  event: fallback(z.string(), "").default(""),
  destination: fallback(z.string(), "").default(""),
  color: fallback(z.string(), "").default(""),
  type: fallback(z.string(), "").default(""),
  mode: fallback(z.string(), "all").default("all"),
});

export const Route = createFileRoute("/archive")({
  validateSearch: zodValidator(schema),
  head: () => ({
    meta: [
      { title: "The Archive — Finders Edit" },
      { name: "description", content: "Pieces with a point of view. Browse vintage jewelry by mood, event, destination, color, or piece — to rent or own." },
      { property: "og:title", content: "The Archive — Finders Edit" },
      { property: "og:description", content: "Vintage jewelry chosen for its presence and personality. Rent or own." },
    ],
  }),
  component: Archive,
});

const tabs = [
  { v: "all", label: "All Pieces" },
  { v: "edits", label: "The Edits" },
  { v: "new", label: "New Finds" },
  { v: "lust", label: "The Lust List" },
];
const descriptions: Record<string, string> = {
  all: "What are you dressing for? Browse by mood, event, destination, color, or piece.",
  edits: "A little direction. A lot of possibility. Selections for where you are going and how you want to show up.",
  new: "Fresh from the hunt. The latest discoveries, all in one place.",
  lust: "The pieces you keep coming back to. An edit of objects worth a second look.",
};

function Archive() {
  const s = Route.useSearch();
  const navigate = Route.useNavigate();
  const { add } = useBag();
  const alias: Record<string, string> = { "new-finds": "new", "the-edits": "edits", "lust-list": "lust" };
  const requested = alias[s.view] ?? s.view;
  const view = tabs.some((t) => t.v === requested) ? requested : "all";

  const list = pieces.filter((p) =>
    (view === "all" || p.views.includes(view as "new" | "edits" | "lust")) &&
    (!s.mood || p.mood === s.mood) && (!s.event || p.event === s.event) &&
    (!s.destination || p.destination === s.destination) && (!s.type || p.type === s.type) &&
    (!s.color || colorOf(p) === s.color) && (s.mode !== "rent" || availabilityOf(p).rent) && (s.mode !== "own" || availabilityOf(p).own),
  );

  const set = (k: string, v: string) => navigate({ resetScroll: false, search: (prev) => ({ ...prev, [k]: v }) });
  const clear = () => navigate({ search: (prev) => ({ view: prev.view, mood: "", event: "", destination: "", color: "", type: "", mode: "all" }) });

  const filters: [string, string, string[]][] = [
    ["mood", "Mood", moods], ["event", "Event", events], ["destination", "Destination", destinations],
    ["color", "Color", colors], ["type", "Jewelry Type", types],
  ];

  return (
    <div className="bg-bone text-ink">
      <section className="border-b border-ink">
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:py-24">
          <p className="micro">Vintage jewelry to rent or own</p>
          <h1 className="mt-4 font-serif text-6xl font-medium leading-[0.85] tracking-tight md:text-9xl">The Archive</h1>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto]">
            <p className="max-w-xl font-serif text-2xl italic leading-snug">Pieces with a point of view. Explore vintage jewelry chosen for its presence, personality, and the possibilities it brings to what you already wear.</p>
            <div className="relative flex items-start gap-1 text-editorial">
              <Arrow className="h-14 w-14 -scale-x-100" d="M10 10 C 40 5, 70 30, 88 78" />
              <p className="hand max-w-[260px] -rotate-3 text-3xl">a collection, not a catalog — edited by <Mark>mood</Mark>, occasion &amp; attitude</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="border-b border-ink">
        <div className="mx-auto flex max-w-[1400px] flex-wrap gap-x-12 gap-y-8 px-5 py-5">
          {tabs.map((t) => (
            <Button variant="editorial" size="editorial" key={t.v} onClick={() => set("view", t.v)} className={`relative micro ${view === t.v ? "text-editorial" : "hover:text-editorial"}`}>
              {t.label}
              {view === t.v && <Under className="-bottom-2 h-2 text-editorial" />}
              {t.v === "new" && <span className="hand absolute -right-10 -top-5 rotate-[-10deg] text-xl normal-case tracking-normal text-pen">just in!</span>}
            </Button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-6">
        <p className={view === "lust" ? "hand -rotate-1 text-3xl text-editorial" : "font-serif text-lg italic text-charcoal"}>{descriptions[view]}</p>
      </div>

      {/* FILTER BAR */}
      <div className="border-y border-ink">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-6">
          {filters.map(([k, label, opts]) => (
            <label key={k} className="block border-b border-r border-ink px-4 py-3 lg:border-b-0">
              <span className="micro text-charcoal">{label}</span>
              <select value={(s as Record<string, string>)[k]} onChange={(e) => set(k, e.target.value)} className="mt-1 block w-full bg-transparent font-serif text-base outline-none">
                <option value="">All</option>
                {opts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          ))}
          <div className="col-span-2 flex items-center px-4 py-3 lg:col-span-1">
            <div className="grid w-full grid-cols-3 border border-ink">
              {[["all", "All"], ["rent", "Rent"], ["own", "Own"]].map(([v, l]) => (
                <Button variant="editorial" size="editorial" key={v} onClick={() => set("mode", v ?? "all")} className={`micro py-2 ${s.mode === v ? "bg-ink text-bone" : "hover:text-editorial"}`}>{l}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <p className="mb-4 text-sm text-charcoal">Sample archive — piece names, photography, prices, and availability await confirmation.</p>
        <p className="micro mb-8">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
        {list.length === 0 ? (
          <div className="border border-ink p-12 text-center">
            <p className="font-serif text-3xl italic">No pieces in this edit right now.</p>
            <p className="hand mt-3 text-3xl text-editorial">Try another filter, or let us help you find your piece.</p>
            <div className="mt-8 flex justify-center gap-6">
              <Button variant="editorial" size="editorial" onClick={clear} className="link-line">Clear Filters</Button>
              <Link to="/private-styling" className="link-line">Ask for Styling</Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((p, i) => (
              <article key={p.id}>
                <Link to="/product/$id" params={{ id: p.id }} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                    <img src={p.img} alt={p.name} loading="lazy" className={`h-full w-full object-cover transition duration-700 hover:scale-105 ${p.bw ? "grain" : ""}`} />
                    <span className="micro absolute left-3 top-3 bg-bone px-2 py-1">No. {p.no}</span>
                  </div>
                </Link>
                <h3 className="mt-4 font-serif text-xl"><Link to="/product/$id" params={{ id: p.id }} className="hover:text-editorial">{p.name}</Link></h3>
                <p className="hand mt-2 text-2xl leading-snug text-editorial" style={{ transform: `rotate(${[-2.5, -1.2, -3, -1.8][i % 4]}deg)` }}>
                  {p.note.split(p.key).map((part, j, arr) => <span key={j}>{part}{j < arr.length - 1 && <Mark>{p.key}</Mark>}</span>)}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 items-center justify-between border-t border-ink pt-3">
                  <span className="micro">
                    <span className={s.mode === "own" ? "text-charcoal/40" : s.mode === "rent" ? "text-editorial" : "text-charcoal"}>Rent ${p.rent}</span>
                    <span className="text-charcoal"> · </span>
                    <span className={s.mode === "rent" ? "text-charcoal/40" : s.mode === "own" ? "text-editorial" : "text-charcoal"}>Own ${p.own}</span>
                  </span>
                  <Button variant="editorial" size="editorial" onClick={() => add(p, s.mode === "own" ? "Own" : "Rent")} className="micro border-b border-ink hover:text-editorial">Add to bag</Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
