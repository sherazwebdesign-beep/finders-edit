import { Button } from '@/components/ui/button';
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getPiece, taglines, weights, pieces, availabilityOf } from "@/lib/pieces";
import { useBag } from "@/lib/bag";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Mark } from "@/lib/pen";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const piece = getPiece(params.id);
    if (!piece) throw notFound();
    return { id: piece.id };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getPiece(loaderData.id) : undefined;
    if (!p) return { meta: [{ title: "Piece not found — Finders Edit" }, { name: "description", content: "This piece is not in the Finders Edit archive." }, { property: "og:title", content: "Piece not found — Finders Edit" }, { property: "og:description", content: "Explore the Finders Edit archive." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" }] };
    const t = `${p.name} — No. ${p.no} — Finders Edit`;
    return {
      meta: [
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p.img.startsWith("https://") ? [{ property: "og:image", content: p.img }, { name: "twitter:image", content: p.img }] : []),
        { title: t },
        { name: "description", content: `${taglines[p.id]} Rent from $${p.rent} or own for $${p.own}.` },
        { property: "og:title", content: t },
        { property: "og:description", content: taglines[p.id] ?? p.note },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="hand text-4xl text-editorial">this one got away.</p>
      <Link to="/archive" className="link-line mt-8 inline-block">Back to the archive →</Link>
    </div>
  ),
  component: Product,
});

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function Product() {
  const { id } = Route.useLoaderData();
  const p = getPiece(id);
  const { add } = useBag();
  const [img, setImg] = useState(0);
  const [reservation, setReservation] = useState(false);
  const [dateError, setDateError] = useState("");
  const [days, setDays] = useState<4 | 8>(4);
  const [start, setStart] = useState("");
  const [open, setOpen] = useState<string | null>("Measurements");
  if (!p) return null;
  const gallery = [p.img, p.altImg];
  const more = pieces.filter((x) => x.id !== p.id).slice(0, 4);

  const availability = availabilityOf(p);
  const details: [string, string][] = [
    ["Measurements", p.dims],
    ["Weight", weights[p.id] ?? "Unverified. Please ask about this piece."],
    ["Materials", "Unverified. Please ask about this piece."],
    ["Fastening or Fit", "Unverified. Please ask about this piece."],
    ["Condition", p.condition],
    ["Provenance", p.provenance],
  ];

  return (
    <div className="bg-bone text-ink">
      <div className="mx-auto max-w-[1400px] px-5 pt-6">
        <Link to="/archive" className="micro hover:text-editorial">← The Archive</Link>
      </div>
      <section className="mx-auto grid max-w-[1400px] gap-10 px-5 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16">
        {/* GALLERY */}
        <div>
          <div className="aspect-[4/5] overflow-hidden border border-ink bg-ink">
            <img src={gallery[img]} alt={p.name} className={`h-full w-full object-cover ${p.bw && img === 0 ? "grain" : ""}`} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <Button variant="editorial" size="editorial" aria-label={i === 0 ? "View sample photograph" : "View editorial inspiration"} aria-pressed={img === i} key={i} onClick={() => setImg(i)} className={`aspect-square overflow-hidden border ${img === i ? "border-editorial border-2" : "border-ink"}`}>
                <img src={g} alt="" className="h-full w-full object-cover" />
              </Button>
            ))}
          </div>
          <p className="mt-3 text-sm text-charcoal">Sample photograph and editorial inspiration. Front, back, clasp, detail, and on-body photographs of this exact piece are not yet available.</p>
        </div>

        {/* INFO */}
        <div>
          <div className="flex items-center justify-between">
            <p className="micro">No. {p.no} // Vintage Archive</p>
            <span className="micro border border-ink px-2 py-1">Sample archive</span>
          </div>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-6xl">{p.name}</h1>
          <p className="mt-4 font-serif text-xl italic text-charcoal">{taglines[p.id]}</p>

          {/* RENT / OWN */}
          <div className="mt-8 grid border border-ink sm:grid-cols-2">
            {availability.rent && <div className="border-b border-ink p-5 sm:border-b-0 sm:border-r">
              <p className="micro">Rent</p>
              <p className="mt-2 font-serif text-lg italic">Make it yours for the occasion.</p>
              <p className="mt-3 font-serif text-3xl">${p.rent}</p>
              <div className="mt-4 grid grid-cols-2 border border-ink">
                {([4, 8] as const).map((d) => (
                  <Button variant="editorial" size="editorial" key={d} onClick={() => setDays(d)} className={`micro py-2 ${days === d ? "bg-ink text-bone" : ""}`}>{d}-day</Button>
                ))}
              </div>
              <label className="mt-3 block">
                <span className="micro text-charcoal">Start date</span>
                <input type="date" min={new Date().toISOString().slice(0,10)} value={start} onChange={(e) => setStart(e.target.value)} className="mt-1 w-full border-b border-ink bg-transparent py-1 font-mono text-sm outline-none" />
              </label>
              <label className="mt-3 block"><span className="micro text-charcoal">Return date</span><input aria-label="Return date" type="date" min={start || undefined} value={start ? addDays(start, days) : ""} readOnly className="mt-1 w-full border-b border-ink bg-transparent py-1 font-mono text-sm" /></label>
              <p className="mt-3 text-xs text-charcoal">Sample pricing and rental durations. Refundable deposit amount and delivery estimate will be confirmed before reservation.</p>
              <Button variant="editorial" size="editorial" onClick={() => { if (!start || start < new Date().toISOString().slice(0,10)) { setDateError("Choose a future start date."); return; } setDateError(""); setReservation(true); }} className="micro mt-4 w-full bg-ink py-3 text-bone hover:bg-editorial">Reserve This Piece →</Button>
              {dateError && <p role="alert" className="mt-2 text-sm text-editorial">{dateError}</p>}
            </div>}
            {availability.own && <div className="flex flex-col p-5">
              <p className="micro">Own</p>
              <p className="mt-2 font-serif text-lg italic">A find worth keeping.</p>
              <p className="mt-3 font-serif text-3xl">${p.own}</p>
              <p className="micro mt-4 text-charcoal">Sample purchase price · availability unverified</p>
              <Button variant="editorial" size="editorial" onClick={() => add(p, "Own")} className="micro mt-auto w-full border border-ink py-3 hover:bg-ink hover:text-bone">Make It Yours →</Button>
            </div>}
          </div>

          {/* CONDITION */}
          <div className="mt-4 border-l-2 border-editorial pl-4">
            <p className="font-serif text-lg italic">Vintage, with a life before yours.</p>
            <p className="mt-1 text-sm text-charcoal">This piece may show signs of age and previous wear. Please read its individual condition notes and view the detail photographs before reserving.</p>
            <div className="mt-2 flex flex-wrap gap-6">
              <Link to="/how-it-works" hash="vintage-promise" className="link-line">Our Vintage Promise</Link>
              <Link to="/contact" search={{ topic: "A Piece", ref: `No. ${p.no} — ${p.name}` }} className="link-line">Ask About This Piece</Link>
            </div>
          </div>

          {/* NOTE */}
          <div className="paper paper-grain mt-10 rotate-[-1.5deg] bg-blush p-7 text-editorial" >
            <p className="micro">Sample styling note</p>
            <p className="mt-1 font-serif text-3xl">Why I picked it</p>
            <p className="hand mt-4 text-[28px] leading-[1.35]">{p.tinamarie}</p>
          </div>

          {/* DETAILS */}
          <div className="mt-10">
            <p className="micro mb-2">The details</p>
            {details.map(([k, v]) => (
              <div key={k} className="border-t border-ink last:border-b">
                <Button variant="editorial" size="editorial" aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)} className="micro flex w-full justify-between py-4 hover:text-editorial">
                  <span>{k}</span><span>{open === k ? "−" : "+"}</span>
                </Button>
                {open === k && <p className="pb-4 text-sm leading-relaxed text-charcoal">{v}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16">
          <h2 className="font-serif text-5xl">More <em>from the hunt</em></h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m) => (
              <Link key={m.id} to="/product/$id" params={{ id: m.id }} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-ink"><img src={m.img} alt={m.name} loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${m.bw ? "grain" : ""}`} /></div>
                <p className="mt-3 font-serif text-lg group-hover:text-editorial">{m.name}</p>
                <p className="micro text-charcoal">Rent ${m.rent} · Own ${m.own}</p>
              </Link>
            ))}
          </div>
          <p className="hand mt-10 -rotate-1 text-3xl text-pen">can't decide? <Mark color="text-pen"><Link to="/private-styling">let me help.</Link></Mark></p>
        </div>
      </section>
      <Dialog open={reservation} onOpenChange={setReservation}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogTitle className="font-serif text-3xl font-normal">Reserve This Piece</DialogTitle>
          <DialogDescription>Review your selection. This is not a confirmed reservation or payment.</DialogDescription>
          <p className="font-serif text-xl">{p.name}</p>
          <dl className="grid grid-cols-2 gap-3 text-sm"><dt>Start date</dt><dd>{start}</dd><dt>Return date</dt><dd>{start ? addDays(start, days) : ''}</dd><dt>Sample rental price</dt><dd>${p.rent}</dd><dt>Refundable deposit</dt><dd>To be confirmed</dd><dt>Delivery estimate</dt><dd>To be confirmed</dd></dl>
          <div className="flex flex-wrap gap-4"><Link onClick={() => setReservation(false)} to="/how-it-works" className="link-line">How Renting Works</Link><Link onClick={() => setReservation(false)} to="/how-it-works" hash="shipping-returns" className="link-line">Shipping / Returns</Link><Link onClick={() => setReservation(false)} to="/how-it-works" hash="damage-terms" className="link-line">Damage Terms</Link></div>
          <Button variant="editorial" size="editorial" onClick={() => { setReservation(false); window.setTimeout(() => add(p, "Rent", days, start), 220); }} className="micro bg-ink py-4 text-bone">Add selection to bag →</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
