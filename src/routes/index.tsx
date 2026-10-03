import { createFileRoute, Link } from "@tanstack/react-router";
import p0 from "@/assets/photo0.jpg.asset.json";
import p2 from "@/assets/photo2.jpg.asset.json";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import p5 from "@/assets/photo5.jpg.asset.json";
import { pieces } from "@/lib/pieces";
import { useBag } from "@/lib/bag";
import { Arrow, Loop, Mark, Strike, Under } from "@/lib/pen";

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

const finds = pieces.filter((p) => p.views.includes("new")).slice(0, 4);
const edits = [
  { t: "A little dangerous", n: "08", s: "Sharp silhouettes, heavy gilt, and pieces that don't apologize.", img: p2.url, mood: "A Little Dangerous" },
  { t: "Somewhere warm", n: "11", s: "Sun-caught resin, hammered gold, and salt-skin statement drops.", img: p0.url, mood: "Somewhere Warm" },
  { t: "Black tie, no rules", n: "06", s: "For the woman who refuses to wear what everyone else rented.", img: p4.url, mood: "Black Tie No Rules" },
];

function Index() {
  const { add } = useBag();

  return (
    <div className="min-h-screen bg-bone text-ink">
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
              <div className="absolute left-[8%] top-[28%] text-editorial" style={{ transform: "rotate(-8deg) skewX(-8deg)", opacity: 0.92 }}>
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
              <Link to="/archive" search={{ view: "all" }} className="link-line">Enter the archive →</Link>
              <Link to="/private-styling" className="link-line">Book private styling →</Link>
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
            <Arrow className="mt-6 h-16 w-16 max-md:hidden" d="M5 20 C 40 0, 80 25, 88 78" />
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
          <Link to="/archive" search={{ view: "new" }} className="link-line">Shop all new finds →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {finds.map((f, i) => (
            <article key={f.no}>
              <Link to="/product/$id" params={{ id: f.id }} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-ink">
                  <img src={f.img} alt={f.name} loading="lazy" className={`h-full w-full object-cover transition duration-700 hover:scale-105 ${f.bw ? "grain" : ""}`} />
                  <span className="micro absolute left-3 top-3 bg-bone px-2 py-1">No. {f.no}</span>
                </div>
              </Link>
              <h3 className="mt-4 font-serif text-xl">
                <Link to="/product/$id" params={{ id: f.id }} className="hover:text-editorial">{f.name}</Link>
              </h3>
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
            <Link key={e.t} to="/archive" search={{ view: "edits", mood: e.mood === "A Little Dangerous" ? "A Little Dangerous" : "", event: e.mood === "Black Tie No Rules" ? "Black Tie No Rules" : "", destination: e.mood === "Somewhere Warm" ? "Somewhere Warm" : "" }} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-ink">
                <img src={e.img} alt={e.t} loading="lazy" className="grain h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl italic group-hover:text-editorial">{e.t}</h3>
                <span className="micro">{e.n} pieces</span>
              </div>
              <p className="mt-2 text-sm text-charcoal">{e.s}</p>
            </Link>
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
              <Arrow className="h-20 w-20 -scale-y-100" d="M12 10 C 15 60, 50 85, 88 78" />
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
            ["01", "Explore the", "Archive", "A collection, not a catalog, edited by mood, occasion and attitude.", "/archive"],
            ["02", "Rent or", "acquire", "Borrow for the occasion, or keep it if you can't give it back.", "/how-it-works"],
            ["03", "Private", "styling", "Three images, one private session, an edit chosen for your dress.", "/private-styling"],
          ].map(([n, a, b, d, to]) => (
            <Link key={n} to={to as string} className="group grid grid-cols-[70px_1fr] border-t border-ink py-6 last:border-b">
              <span className="font-serif text-5xl">{n}</span>
              <div>
                <h3 className="font-serif text-2xl group-hover:text-editorial">{a} <em>{b}</em></h3>
                <p className="mt-1 text-sm text-charcoal">{d}</p>
              </div>
            </Link>
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
            <Link to="/private-styling" className="link-line mt-10 inline-block">Book a session →</Link>
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
                  <Arrow className="h-16 w-16 -scale-x-100 rotate-180" d="M15 15 C 20 55, 50 80, 88 78" />
                  <p className="hand rotate-[-4deg] text-3xl">the eye, not the face</p>
                </div>
              </div>
              <Link to="/about" className="micro mt-auto border-t border-ink py-4 text-center hover:bg-ink hover:text-bone">Read her story →</Link>
            </div>
            <div className="flex flex-col border-t border-ink md:border-t-0">
              <div className="flex-1 p-8 md:p-14">
                <h2 className="font-serif text-6xl leading-[0.9] md:text-7xl">WHO IS<br /><em>TINAMARIE</em></h2>
                <p className="mt-8 max-w-md leading-relaxed text-charcoal">It started with a quarter, a vending machine, and a ruby-colored plastic ring. Then came modeling, New York, sets, designers, and thousands upon thousands of objects. Exposure sharpened the eye; it didn't create it.</p>
                <p className="mt-8 max-w-md font-serif text-2xl italic">"I look for pieces with presence. I don't need a label to tell me it's special."</p>
              </div>
              <Link to="/private-styling" className="micro border-t border-ink py-4 text-center hover:bg-ink hover:text-bone">Work with her →</Link>
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
          <Link to="/contact" className="micro mt-8 inline-block bg-ink px-6 py-4 text-bone hover:bg-editorial">Send a gift card →</Link>
        </div>
      </section>
    </div>
  );
}
