import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import p0 from "@/assets/photo0.jpg.asset.json";
import p2 from "@/assets/photo2.jpg.asset.json";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import p5 from "@/assets/photo5.jpg.asset.json";
import coral from "@/assets/earring-coral.jpg";
import yellow from "@/assets/earring-yellow.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Finders Edit — Vintage jewelry curated for now" },
      { name: "description", content: "A private archive of vintage statement jewelry, curated by Tinamarie. Rent, acquire, or book private styling." },
      { property: "og:title", content: "Finders Edit — Look what I found" },
      { property: "og:description", content: "Quiet editorial. Rich objects. No clutter. Vintage jewelry to rent or keep." },
    ],
  }),
  component: Index,
});

type Item = { no: string; name: string; note: string; key: string; rent: number; own: number; img: string; bg?: string; bw?: boolean };
const finds: Item[] = [
  { no: "041", name: "Gilt Knot Clip Earrings", note: "big enough to skip the necklace", key: "skip", rent: 85, own: 420, img: coral },
  { no: "042", name: "Crystal Waterfall Collar", note: "white shirt, nothing else, trust me", key: "trust me", rent: 140, own: 680, img: yellow },
  { no: "043", name: "Resin Cabochon Cuff", note: "the one they will ask about", key: "ask", rent: 95, own: 460, img: p3.url, bw: true },
  { no: "044", name: "Baroque Pearl Drops", note: "pearls, but make them odd", key: "odd", rent: 110, own: 540, img: p5.url, bw: true },
];
const edits = [
  { t: "A little dangerous", n: "08", s: "Sharp silhouettes, heavy gilt, and pieces that don't apologize.", img: p2.url },
  { t: "Somewhere warm", n: "11", s: "Sun-caught resin, hammered gold, and salt-skin statement drops.", img: p0.url },
  { t: "Black tie, no rules", n: "06", s: "For the woman who refuses to wear what everyone else rented.", img: p4.url },
];

function Index() {
  const [bag, setBag] = useState<{ item: Item; mode: "Rent" | "Own" }[]>([]);
  const [drawer, setDrawer] = useState<null | "bag" | "styling">(null);
  const add = (item: Item) => { setBag((b) => [...b, { item, mode: "Rent" }]); setDrawer("bag"); };

  return (
    <div className="min-h-screen bg-bone text-ink">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-ink bg-bone">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4">
          <nav className="hidden gap-6 md:flex">
            <a href="#archive" className="micro hover:text-editorial">The Archive</a>
            <a href="#edits" className="micro hover:text-editorial">The Edits</a>
            <a href="#finds" className="micro hover:text-editorial">New Finds</a>
          </nav>
          <a href="#" className="col-start-2 font-serif text-2xl tracking-tight">Finders<em>Edit</em></a>
          <nav className="flex justify-end gap-6">
            <button onClick={() => setDrawer("styling")} className="micro hidden hover:text-editorial md:inline">Private Styling</button>
            <a href="#eye" className="micro hidden hover:text-editorial md:inline">About the Eye</a>
            <button onClick={() => setDrawer("bag")} className="micro hover:text-editorial">Bag ({bag.length})</button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-ink">
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-[60px_1fr] gap-4 px-5 py-10 md:grid-cols-[140px_1fr_220px] md:gap-8 md:py-16">
          <div className="relative">
            <p className="micro text-charcoal normal-case tracking-normal">a private world of great taste</p>
            <span className="absolute bottom-0 left-0 origin-bottom-left -rotate-90 translate-x-[0.85em] whitespace-nowrap font-serif text-[64px] leading-none tracking-tight md:text-[150px]">finders</span>
          </div>
          <div className="relative pt-12 md:pt-16">
            <span className="absolute -top-2 right-0 z-10 font-serif text-[80px] italic text-bone mix-blend-difference leading-none md:-right-10 md:text-[170px]">edit</span>
            <div className="relative aspect-[4/5] overflow-hidden bg-ink md:aspect-[5/4]">
              <img src={p5.url} alt="Sculptural diamond collar on a neckline" className="grain h-full w-full object-cover" />
              <div className="absolute left-[8%] top-[28%] text-[#C81D25]" style={{ transform: "rotate(-8deg) skewX(-8deg)", opacity: 0.92 }}>
                <p className="script text-7xl leading-[0.9] md:text-[150px]">look what<br /><span className="ml-16 inline-block">I <span className="relative inline-block">found<Under double className="-bottom-1 h-5" /></span></span></p>
                <Arrow className="absolute -right-16 top-full h-24 w-24 md:-right-24 md:h-32 md:w-32" d="M5 10 C 50 0, 85 30, 88 78" />
              </div>
              <p className="micro absolute bottom-4 left-4 text-bone/70">No. 01 — the collar nobody wanted, until now</p>
            </div>
          </div>
          <aside className="col-span-2 flex flex-col justify-end gap-6 md:col-span-1">
            <p className="micro">No. 01 / Autumn</p>
            <p className="font-serif text-2xl italic leading-tight">The piece nobody else thought to look for.</p>
            <div className="flex flex-col items-start gap-4">
              <a href="#finds" className="link-line">Enter the archive →</a>
              <button onClick={() => setDrawer("styling")} className="link-line">Book private styling →</button>
            </div>
          </aside>
        </div>
      </section>

      {/* STYLE */}
      <section className="relative overflow-hidden border-b border-ink bg-linen py-20 text-center">
        <div className="relative mx-auto max-w-[1400px] px-5">
          <p className="relative inline-block font-serif text-2xl uppercase tracking-[0.3em] text-ink/25 md:text-5xl">
            Something to prove
            <Strike className="-inset-x-3 top-1/2 h-5 w-[calc(100%+1.5rem)] -translate-y-1/2 -rotate-1 text-editorial" />
          </p>
          <h2 className="mt-2 font-serif text-7xl font-bold text-editorial md:text-[160px] md:leading-none">STYLE</h2>
          <div className="relative mt-6 inline-flex items-start gap-2 text-pen md:absolute md:bottom-8 md:left-10 md:mt-0">
            <p className="hand rotate-[-5deg] text-left text-4xl leading-tight">look what<br />I <Mark color="text-pen" double>chose.</Mark></p>
            <Arrow className="mt-6 h-16 w-16 max-md:hidden" d="M5 40 C 40 10, 75 15, 92 40" />
          </div>
          <p className="mx-auto mt-6 max-w-[220px] text-left text-sm italic text-charcoal md:absolute md:right-10 md:top-1/2 md:mt-0">Status says, "Look what I can afford." Style says, "Look what I chose."</p>
        </div>
      </section>

      {/* NEW FINDS */}
      <section id="finds" className="mx-auto max-w-[1400px] px-5 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <h2 className="font-serif text-7xl leading-none md:text-9xl">NEW <em className="text-6xl md:text-8xl">finds</em></h2>
            <div className="relative -rotate-12 text-pen">
              <span className="hand block text-3xl leading-none">just in!</span>
              <Arrow className="ml-6 h-12 w-12 rotate-[20deg]" d="M10 10 C 40 5, 70 30, 88 78" />
            </div>
          </div>
          <a href="#archive" className="link-line">Shop all new finds →</a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {finds.map((f, i) => (
            <article key={f.no}>
              <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                <img src={f.img} alt={f.name} loading="lazy" className={`h-full w-full object-cover transition duration-700 hover:scale-105 ${f.bw ? "grain" : ""}`} />
                <span className="micro absolute left-3 top-3 bg-bone px-2 py-1">No. {f.no}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl">{f.name}</h3>
              <p className="hand mt-2 text-2xl leading-snug text-editorial" style={{ transform: `rotate(${["-2.5deg", "-1.2deg", "-3.1deg", "-1.8deg"][i]})`, marginLeft: [2, 8, 0, 5][i] }}>
                {f.note.split(f.key).map((part, j, arr) => (
                  <span key={j}>{part}{j < arr.length - 1 && <Mark>{f.key}</Mark>}</span>
                ))}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-ink pt-3">
                <span className="micro text-charcoal">Rent ${f.rent} · Own ${f.own}</span>
                <button onClick={() => add(f)} className="micro border-b border-ink hover:text-editorial">Add to bag</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EDITS */}
      <section id="edits" className="border-t border-ink bg-ivory">
        <div className="grid border-b border-ink md:grid-cols-2">
          <div className="px-5 py-10 md:px-10"><h2 className="script relative -rotate-6 pl-4 text-[110px] leading-none text-editorial md:text-[170px]">the edits<svg viewBox="0 0 400 40" className="absolute -bottom-4 left-24 h-8 w-[70%]" aria-hidden><path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" d="M2 30 C 100 10, 200 34, 300 18 S 380 6, 398 2" /></svg></h2></div>
          <div className="flex items-center border-t border-ink px-5 py-10 md:border-l md:border-t-0 md:px-10">
            <p className="max-w-md font-serif text-2xl italic leading-snug">Shop by how you want to feel, where you're going, or what you're daring yourself to wear.</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 md:grid-cols-3">
          {edits.map((e) => (
            <a key={e.t} href="#archive" className="group">
              <div className="aspect-[4/3] overflow-hidden bg-ink">
                <img src={e.img} alt={e.t} loading="lazy" className="grain h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl italic group-hover:text-editorial">{e.t}</h3>
                <span className="micro">{e.n} pieces</span>
              </div>
              <p className="mt-2 text-sm text-charcoal">{e.s}</p>
            </a>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="relative border-y border-ink px-5 py-24">
        <div className="relative mx-auto max-w-[1400px]">
          <p className="max-w-[240px] text-sm italic text-charcoal md:absolute md:right-0 md:top-0">For the woman who'd rather be asked than recognized, and who is delighted when another woman recognizes the magic.</p>
          <p className="mt-10 font-serif text-4xl italic md:ml-4 md:text-6xl">Wear the</p>
          <div className="relative inline-block">
            <h2 className="font-serif text-[22vw] font-medium leading-[0.85] tracking-tight md:text-[220px]">STORY.</h2>
            <Loop className="-inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)] text-editorial" />
            <div className="absolute -right-4 top-full flex translate-x-full items-start gap-1 text-editorial max-md:hidden">
              <Arrow className="h-20 w-20 -scale-y-100" d="M90 90 C 40 95, 15 70, 12 20" />
              <p className="hand mt-10 -rotate-6 whitespace-nowrap text-3xl">the meaning,<br />&nbsp;&nbsp;the story</p>
            </div>
          </div>
          <p className="text-right font-serif text-4xl italic md:mr-[20%] md:text-6xl">not the <span className="relative inline-block">logo.<svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 top-1/2 h-4 w-full -translate-y-1/2 text-editorial" aria-hidden><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M2 24 C 30 18, 60 22, 98 14" /></svg></span></p>
          <p className="micro mt-10">If you know, you know.</p>
        </div>
      </section>

      {/* THREE WAYS */}
      <section id="archive" className="mx-auto grid max-w-[1400px] gap-16 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="micro mb-6">The archive, three ways</p>
          {[
            ["01", "Explore the", "Archive", "A collection, not a catalog, edited by mood, occasion and attitude."],
            ["02", "Rent or", "acquire", "Borrow for the occasion, or keep it if you can't give it back."],
            ["03", "Private", "styling", "Three images, one private session, an edit chosen for your dress."],
          ].map(([n, a, b, d]) => (
            <div key={n} className="grid grid-cols-[70px_1fr] border-t border-ink py-6 last:border-b">
              <span className="font-serif text-5xl">{n}</span>
              <div>
                <h3 className="font-serif text-2xl">{a} <em>{b}</em></h3>
                <p className="mt-1 text-sm text-charcoal">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="paper-grain w-full max-w-md rotate-[-1.5deg] bg-blush p-8 text-editorial" style={{ boxShadow: "14px 18px 30px -14px oklch(0.25 0.03 20 / 0.4)" }}>
            <p className="font-serif text-6xl">NOTE</p>
            <div className="mt-6 space-y-5">
              <p className="relative h-10 border-b border-editorial/50 micro"><span className="absolute bottom-1">To:</span><span className="hand absolute -bottom-1 left-16 rotate-[-2deg] text-3xl normal-case tracking-normal text-ink">You</span></p>
              <p className="relative h-10 border-b border-editorial/50 micro"><span className="absolute bottom-1">From:</span><span className="hand absolute -bottom-0.5 left-16 rotate-[1.5deg] text-3xl normal-case tracking-normal text-ink">Tinamarie</span></p>
            </div>
            <p className="hand mt-10 rotate-[-2deg] text-[34px] leading-[1.35]">
              tell me where<br />
              <span className="inline-block translate-x-3 rotate-[1deg]">you're going.</span><br />
              I'll find <Mark>what you wear.</Mark>{" "}
              <svg viewBox="0 0 60 30" className="inline h-8 w-14 align-middle" aria-hidden><g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6 C 12 14, 18 20, 24 26 M24 5 C 18 12, 11 20, 5 27" /><path d="M34 7 C 40 14, 45 19, 52 24 M51 6 C 46 13, 40 20, 33 26" /></g></svg>
            </p>
            <button onClick={() => setDrawer("styling")} className="link-line mt-10">Book a session →</button>
          </div>
        </div>
      </section>

      {/* ABOUT THE EYE */}
      <section id="eye" className="mx-auto max-w-[1400px] px-5 pb-20">
        <div className="border border-ink">
          <div className="flex justify-between border-b border-ink px-5 py-3"><span className="micro">About the eye</span><span className="micro">007</span></div>
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col border-ink md:border-r">
              <div className="p-8">
                <div className="aspect-[4/5] overflow-hidden bg-ink"><img src={p3.url} alt="The eye, not the face" loading="lazy" className="grain h-full w-full object-cover" /></div>
                <div className="relative mt-2 flex items-end justify-end gap-2 text-pen">
                  <Arrow className="h-16 w-16 -scale-x-100 rotate-180" d="M10 90 C 20 50, 50 20, 88 12" />
                  <p className="hand rotate-[-4deg] text-3xl">the eye, not the face</p>
                </div>
              </div>
              <button className="micro mt-auto border-t border-ink py-4 hover:bg-ink hover:text-bone">Read her story →</button>
            </div>
            <div className="flex flex-col border-t border-ink md:border-t-0">
              <div className="flex-1 p-8 md:p-14">
                <h2 className="font-serif text-6xl leading-[0.9] md:text-7xl">WHO IS<br /><em>TINAMARIE</em></h2>
                <p className="mt-8 max-w-md leading-relaxed text-charcoal">It started with a quarter, a vending machine, and a ruby-colored plastic ring. Then came modeling, New York, sets, designers, and thousands upon thousands of objects. Exposure sharpened the eye; it didn't create it.</p>
                <p className="mt-8 max-w-md font-serif text-2xl italic">"I look for pieces with presence. I don't need a label to tell me it's special."</p>
              </div>
              <button onClick={() => setDrawer("styling")} className="micro border-t border-ink py-4 hover:bg-ink hover:text-bone">Work with her →</button>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-taupe px-5 py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex justify-between"><span className="micro">Where did you get that?</span><span className="micro">Client note</span></div>
          <blockquote className="mx-auto my-16 max-w-4xl text-center font-serif text-2xl leading-snug text-burgundy md:text-4xl">
            "I sent Tinamarie three photos of a vintage slip dress and a rooftop in Rome. She pulled a 1970s gilt collar I never would have looked twice at on a hanger. Three strangers stopped me before dinner to ask where it came from."
          </blockquote>
          <div className="flex justify-center gap-8 micro text-burgundy"><span>[ Client name ]</span><span>[ Rome ]</span><span>[ 1970s ]</span></div>
        </div>
      </section>

      {/* GIFT */}
      <section className="mx-auto grid max-w-[1400px] items-center gap-16 px-5 py-24 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="paper relative aspect-[5/7] w-64 -rotate-6 border border-ink/20 bg-ivory p-4 text-editorial">
            <div className="absolute left-4 top-3 text-center font-serif leading-none"><div className="text-3xl">A</div><div className="text-xl">♦</div></div>
            <div className="absolute bottom-3 right-4 rotate-180 text-center font-serif leading-none"><div className="text-3xl">A</div><div className="text-xl">♦</div></div>
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="ink-raw -rotate-6 text-5xl text-ink">no logo,</p>
              <span className="text-6xl">♦</span>
              <p className="ink-raw rotate-[-3deg] translate-x-2 text-5xl text-ink"><Mark color="text-ink">all presence.</Mark></p>
            </div>
          </div>
        </div>
        <div>
          <p className="micro">Gift cards</p>
          <h2 className="mt-4 font-serif text-6xl leading-none">Give her <em>the hunt.</em></h2>
          <p className="mt-6 max-w-md text-charcoal">For the friend who has everything except the thing nobody else thought to find. Good for rentals, pieces to keep, or a private styling session.</p>
          <button className="micro mt-8 bg-ink px-6 py-4 text-bone hover:bg-editorial">Send a gift card →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pitch px-5 pt-16 pb-8 text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-serif text-4xl">Finders<em className="text-gold">Edit</em></p>
            <p className="micro mt-2 text-bone/60">A private world of great taste</p>
            <p className="mt-8 text-sm text-bone/80">New finds, first. Letters from the hunt, a few times a month.</p>
            <form onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }} className="mt-4 flex max-w-sm border-b border-bone/50">
              <input type="email" required placeholder="Your email" className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-bone/40" />
              <button className="micro">Join →</button>
            </form>
          </div>
          {[
            ["Shop", ["The Archive", "New Finds", "The Edits", "Gift Cards"]],
            ["Service", ["How It Works", "Shipping & Returns", "Care & Condition", "FAQ"]],
            ["Get styled", ["Private Styling", "About the Eye", "Instagram (@FindersEdit)", "Email"]],
          ].map(([h, ls]) => (
            <div key={h as string}>
              <p className="micro mb-4 text-bone/50">{h as string}</p>
              <ul className="space-y-2 text-sm">{(ls as string[]).map((l) => <li key={l}><a href="#" className="hover:text-editorial">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-end justify-between gap-4 border-t border-bone/20 pt-6">
          <p className="script relative -rotate-3 pb-4 text-5xl text-editorial">if you know, you know<svg viewBox="0 0 300 30" className="absolute -bottom-1 left-6 h-6 w-[80%]" aria-hidden><path fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" d="M2 18 C 60 8, 120 26, 190 14 S 270 4, 296 12 C 285 20, 270 24, 260 18" /></svg></p>
          <p className="micro text-bone/50">© 2026 Finders Edit. All rights reserved.</p>
        </div>
      </footer>

      {/* DRAWERS */}
      <Drawer open={drawer === "bag"} onClose={() => setDrawer(null)} title="The Archive Bag">
        {bag.length === 0 ? (
          <p className="hand text-3xl text-editorial">nothing yet. go find something.</p>
        ) : (
          <div className="space-y-6">
            {bag.map((b, i) => (
              <div key={i} className="grid grid-cols-[72px_1fr] gap-4 border-b border-ink pb-4">
                <img src={b.item.img} alt="" className="aspect-[3/4] w-full object-cover" />
                <div>
                  <p className="micro">No. {b.item.no}</p>
                  <p className="font-serif text-lg">{b.item.name}</p>
                  <div className="mt-2 flex gap-3">
                    {(["Rent", "Own"] as const).map((m) => (
                      <button key={m} onClick={() => setBag((x) => x.map((y, j) => (j === i ? { ...y, mode: m } : y)))} className={`micro border px-2 py-1 ${b.mode === m ? "bg-ink text-bone" : "border-ink"}`}>
                        {m} ${m === "Rent" ? b.item.rent : b.item.own}
                      </button>
                    ))}
                    <button onClick={() => setBag((x) => x.filter((_, j) => j !== i))} className="micro ml-auto hover:text-editorial">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between font-serif text-xl">
              <span>Total</span>
              <span>${bag.reduce((s, b) => s + (b.mode === "Rent" ? b.item.rent : b.item.own), 0)}</span>
            </div>
            <button className="micro w-full bg-ink py-4 text-bone hover:bg-editorial">Checkout →</button>
          </div>
        )}
      </Drawer>

      <Drawer open={drawer === "styling"} onClose={() => setDrawer(null)} title="Private Styling">
        <StylingForm onDone={() => setDrawer(null)} />
      </Drawer>
    </div>
  );
}

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink bg-bone transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-ink px-6 py-5">
          <h2 className="font-serif text-2xl italic">{title}</h2>
          <button onClick={onClose} className="micro hover:text-editorial">Close ×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </aside>
    </div>
  );
}

function StylingForm({ onDone }: { onDone: () => void }) {
  const [files, setFiles] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div>
        <p className="hand -rotate-2 text-5xl text-editorial">got it. I'll start hunting. xx</p>
        <button onClick={() => { setSent(false); setFiles([]); onDone(); }} className="link-line mt-8">Back to the archive →</button>
      </div>
    );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
      <p className="hand text-3xl text-editorial">tell me where you're going.</p>
      <label className="block">
        <span className="micro">Three inspiration images</span>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex aspect-square items-center justify-center overflow-hidden border border-dashed border-ink bg-ivory">
              {files[i] ? <img src={files[i]} alt="" className="h-full w-full object-cover" /> : <span className="micro text-charcoal">0{i + 1}</span>}
            </div>
          ))}
        </div>
        <input type="file" accept="image/*" multiple className="mt-3 block w-full text-xs file:mr-3 file:border file:border-ink file:bg-bone file:px-3 file:py-2 file:font-mono file:text-[10px] file:uppercase"
          onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 3).map((f) => URL.createObjectURL(f)))} />
      </label>
      {[["Your name", "text"], ["Email", "email"], ["The occasion", "text"]].map(([l, t]) => (
        <label key={l} className="block">
          <span className="micro">{l}</span>
          <input required type={t} className="mt-1 w-full border-b border-ink bg-transparent py-2 font-serif outline-none focus:border-editorial" />
        </label>
      ))}
      <label className="block">
        <span className="micro">The mood, the dress, the dare</span>
        <textarea rows={4} className="mt-1 w-full border border-ink bg-ivory p-3 font-serif outline-none focus:border-editorial" />
      </label>
      <button className="micro w-full bg-ink py-4 text-bone hover:bg-editorial">Send to Tinamarie →</button>
    </form>
  );
}

/* Hand-drawn pen marks */
const ink = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function Under({ className = "", double = false }: { className?: string; double?: boolean }) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 w-full ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.6" d="M2 8 C 40 5, 90 9, 130 6 S 185 7, 198 5" />
      {double && <path {...ink} strokeWidth="1.2" d="M18 15 C 60 12, 110 16, 150 13 S 180 14, 190 12" />}
    </svg>
  );
}
function Arrow({ className = "", d = "M10 10 C 60 0, 95 30, 88 78" }: { className?: string; d?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`pointer-events-none ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.5" d={d} />
      <path {...ink} strokeWidth="1.5" d="M76 66 C 80 72, 85 77, 88 80 C 90 74, 93 69, 97 64" />
    </svg>
  );
}
function Loop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 120" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.4" d="M40 30 C 110 8, 250 10, 285 45 C 305 80, 220 112, 130 108 C 40 104, 2 80, 12 55 C 22 32, 90 18, 170 16" />
      <path {...ink} strokeWidth="1" d="M60 24 C 140 6, 270 20, 290 55 C 298 90, 200 116, 110 104 C 30 96, 8 70, 25 45" />
    </svg>
  );
}
function Strike({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} aria-hidden>
      <path {...ink} strokeWidth="2.4" d="M3 13 C 60 9, 130 14, 200 11 S 330 9, 397 12" />
      <path {...ink} strokeWidth="1.6" d="M14 15 C 90 12, 170 16, 250 12 S 360 13, 390 9" />
    </svg>
  );
}
function Mark({ children, color = "text-editorial", double }: { children: ReactNode; color?: string; double?: boolean }) {
  return <span className="relative inline-block">{children}<Under double={double} className={`-bottom-2 h-3 ${color}`} /></span>;
}
