import { createFileRoute, Link } from "@tanstack/react-router";
import p3 from "@/assets/photo3.jpg.asset.json";
import p4 from "@/assets/photo4.jpg.asset.json";
import { Arrow, Loop, Mark, Strike } from "@/lib/pen";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Eye — Tinamarie, Finders Edit" },
      { name: "description", content: "The eye behind the edit. Tinamarie on modeling, collecting, and why every great find comes with the same impulse: you have to see this." },
      { property: "og:title", content: "The eye behind the edit — Finders Edit" },
      { property: "og:description", content: "We do the hunting. You get to wear the find." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-bone text-ink">
      <section className="border-b border-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="micro">About the eye</p>
              <h1 className="mt-4 font-serif text-6xl leading-[0.9] md:text-8xl">The eye behind <em>the edit.</em></h1>
            </div>
            <p className="font-serif text-2xl italic">We do the hunting. <Mark>You get to wear the find.</Mark></p>
          </div>
          <div>
            <div className="aspect-[4/5] overflow-hidden bg-ink"><img src={p3.url} alt="Tinamarie's eye for jewelry" className="grain h-full w-full object-cover" /></div>
            <div className="mt-2 flex items-end justify-end gap-2 text-pen">
              <Arrow className="h-16 w-16 -scale-x-100 rotate-180" d="M15 15 C 20 55, 50 80, 88 78" />
              <p className="hand rotate-[-4deg] text-3xl">the eye, not the face</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-[200px_1fr]">
        <p className="micro">03 / The founder story</p>
        <div className="max-w-2xl space-y-6 font-serif text-xl leading-relaxed md:text-2xl">
          <p>I've always been drawn to statement pieces, the unexpected, something with a point of view. That instinct has been with me for as long as I can remember. That instinct found an outlet in modeling and a life in fashion.</p>
          <p>Over years of collecting, I brought together pieces from different eras, chosen for their character and the way they transform a look. And every great find comes with the same impulse: <em className="text-editorial">You have to see this.</em></p>
          <p>Finders Edit opens that collection to you.</p>
          <p className="script text-6xl text-editorial">— Tinamarie</p>
        </div>
      </section>

      <section className="border-y border-ink bg-linen py-20 text-center">
        <p className="micro">The filter &amp; the thesis</p>
        <p className="relative mx-auto mt-6 inline-block font-serif text-2xl uppercase tracking-[0.3em] text-ink/25 md:text-4xl">
          A point of view
          <Strike className="-inset-x-3 top-1/2 h-5 w-[calc(100%+1.5rem)] -translate-y-1/2 -rotate-1 text-editorial" />
        </p>
        <p className="mx-auto mt-8 max-w-2xl px-5 font-serif text-2xl italic md:text-3xl">Status says, "Look what I can afford." Style says, <span className="text-editorial">"Look what I chose."</span></p>
      </section>

      <section className="relative bg-pitch px-5 py-24 text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1fr_320px]">
          <div>
            <p className="micro text-bone/50">Working manifesto</p>
            <div className="mt-8 space-y-4 font-serif text-3xl leading-snug md:text-5xl">
              <p>We believe in pieces with <span className="relative inline-block">presence.<Loop className="-inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-editorial" /></span></p>
              <p className="italic">In choosing what you love and wearing it with conviction.</p>
              <p>In a good find, <Mark>shared.</Mark></p>
              <p className="italic">In the question that follows a great piece: <span className="text-editorial">Where did you get that?</span></p>
              <p>Look what I found. Now make it yours.</p>
            </div>
            <p className="script mt-12 -rotate-3 text-5xl text-editorial">if you know, you know</p>
          </div>
          <div className="aspect-[3/4] overflow-hidden"><img src={p4.url} alt="" loading="lazy" className="grain h-full w-full object-cover" /></div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1400px] flex-wrap justify-center gap-8 px-5 py-16">
        <Link to="/archive" className="micro bg-ink px-8 py-4 text-bone hover:bg-editorial">Explore the Archive →</Link>
        <Link to="/private-styling" className="micro border border-ink px-8 py-4 hover:bg-ink hover:text-bone">Work With Tinamarie →</Link>
      </section>
    </div>
  );
}
