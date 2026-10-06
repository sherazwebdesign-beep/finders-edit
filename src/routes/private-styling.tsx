import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Arrow, Mark } from "@/lib/pen";

export const Route = createFileRoute("/private-styling")({
  head: () => ({
    meta: [
      { title: "Private Styling with Tinamarie — Finders Edit" },
      { name: "description", content: "Tell me where you are going. Send three images and receive a personal edit of vintage jewelry from the archive." },
      { property: "og:title", content: "Private Styling — Finders Edit" },
      { property: "og:description", content: "Three images, one virtual session, a personal edit from the archive." },
    ],
  }),
  component: Styling,
});

const steps = [
  ["Step 01", "Share the vision", "Send three images that capture the direction: your outfit, an inspiration, a place, or a detail you love. Tell me the occasion and when you need your jewelry."],
  ["Step 02", "Talk it through", "Meet with me virtually to talk about the look, what you like to wear, and what would make it feel like you."],
  ["Step 03", "Discover your edit", "Receive a personally chosen selection, with ideas for how to wear it. Rent or purchase available pieces once you have found your favorite."],
];
const slots = ["Image 1 — Outfit", "Image 2 — Setting / Inspiration", "Image 3 — Mood / Detail"];
const field = "mt-1 w-full border-b border-ink bg-transparent py-2 font-serif outline-none focus:border-editorial";

function Styling() {
  const [imgs, setImgs] = useState<(string | null)[]>([null, null, null]);
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-bone text-ink">
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
          <div>
            <p className="micro">Private styling</p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] md:text-7xl">Tell me where you are going. <em>I will help you find your piece.</em></h1>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <p className="font-serif text-xl italic leading-snug">The dress, the trip, the invitation, or simply a feeling. Bring me what you have in mind, and I will pull a personal edit from the archive.</p>
            <p className="hand -rotate-3 text-3xl text-pen">your personal stylist bestie, with <Mark color="text-pen">insider access</Mark></p>
          </div>
        </div>
      </section>

      <section className="bg-taupe px-5 py-14">
        <blockquote className="mx-auto max-w-4xl text-center font-serif text-2xl italic leading-snug text-burgundy md:text-4xl">
          "If you overheard someone giving you a compliment — whispering to their girlfriend — what would you wish they were saying?"
        </blockquote>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20">
        <p className="micro mb-6">How a session works</p>
        <div className="grid border border-ink md:grid-cols-3">
          {steps.map(([n, t, d], i) => (
            <div key={n} className={`p-8 ${i < 2 ? "border-b border-ink md:border-b-0 md:border-r" : ""}`}>
              <p className="micro text-editorial">{n}</p>
              <h3 className="mt-3 font-serif text-3xl italic">{t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="styling-dossier" className="scroll-mt-20 border-t border-ink bg-ivory">
        <div className="mx-auto max-w-[1000px] px-5 py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-5xl md:text-6xl">The <em>dossier</em></h2>
            <div className="flex items-end gap-1 text-editorial max-md:hidden">
              <p className="hand -rotate-6 text-3xl">three images is all I need</p>
              <Arrow className="h-14 w-14" d="M10 10 C 40 5, 70 30, 88 78" />
            </div>
          </div>
          {sent ? (
            <div className="mt-12 border border-ink p-10">
              <p className="font-serif text-3xl italic">Your request is in.</p>
              <p className="mt-3 text-charcoal">We will be in touch to arrange the next step. Your session is confirmed once we agree on a time.</p>
              <p className="hand mt-6 -rotate-2 text-4xl text-editorial">I'll start hunting. xx</p>
              <Link to="/archive" className="link-line mt-8 inline-block">Explore the archive meanwhile →</Link>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); document.getElementById("styling-dossier")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-12 space-y-10">
              <div className="grid grid-cols-3 gap-3">
                {slots.map((s, i) => (
                  <label key={s} className="block cursor-pointer">
                    <div className="flex aspect-[3/4] items-center justify-center overflow-hidden border border-dashed border-ink bg-bone hover:bg-linen">
                      {imgs[i] ? <img src={imgs[i] ?? ""} alt="" className="h-full w-full object-cover" /> : <span className="micro px-4 text-center text-charcoal">+ Upload<br />{s}</span>}
                    </div>
                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setImgs((x) => x.map((y, j) => (j === i ? URL.createObjectURL(f) : y)));
                    }} />
                    <span className="micro mt-2 block">{s}</span>
                  </label>
                ))}
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block"><span className="micro">Name</span><input required className={field} /></label>
                <label className="block"><span className="micro">Email</span><input required type="email" className={field} /></label>
                <label className="block sm:col-span-2"><span className="micro">Occasion or destination</span><input required className={field} /></label>
                <label className="block"><span className="micro">Event date</span><input type="date" className={field} /></label>
                <label className="block"><span className="micro">Needed-by date</span><input type="date" className={field} /></label>
                <label className="block"><span className="micro">Rental or purchase budget</span><input className={field} placeholder="e.g. $150 rental" /></label>
                <label className="block"><span className="micro">Preference</span>
                  <select className={field}><option>Open to either</option><option>Rent</option><option>Own</option></select>
                </label>
              </div>
              <label className="block"><span className="micro">What do you have in mind?</span>
                <textarea rows={5} placeholder="Tell Tinamarie where you're going, what you're wearing, and what you wish someone would whisper when you walk in…" className="mt-2 w-full border border-ink bg-bone p-4 font-serif outline-none focus:border-editorial" />
              </label>
              <label className="block"><span className="micro">Any fit preferences, clip-on needs, or materials you avoid?</span><input className={field} /></label>
              <button className="micro w-full bg-ink py-5 text-bone hover:bg-editorial">Request Private Styling →</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
