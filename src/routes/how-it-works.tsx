import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { VintagePromise } from "@/components/VintagePromise";
import { Mark } from "@/lib/pen";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Renting Works — Finders Edit" },
      { name: "description", content: "Find it. Wear it. Send it back. How to borrow vintage statement jewelry from the Finders Edit archive." },
      { property: "og:title", content: "How Renting Works — Finders Edit" },
      { property: "og:description", content: "A great piece, for your moment. Here is how to borrow from the archive." },
    ],
  }),
  component: How,
});

const steps = [
  ["Step 01", "Choose your piece", "Explore the archive and select an available piece for your dates. Review its measurements, condition notes, and rental details before reserving."],
  ["Step 02", "Make it part of your look", "Enjoy your piece for the agreed rental period. Each piece is cleaned after every rental, ready for its next chapter with you."],
  ["Step 03", "Return your find", "Pack it carefully and follow the return instructions provided with your rental. Check your confirmed return deadline before sending it back."],
];

const faqs = [
  ["How long can I keep my piece?", "Choose a 4-day weekend rental or an 8-day destination rental. Your piece arrives before your start date, and your return deadline is confirmed at checkout."],
  ["Is there a deposit?", "Yes. A refundable security hold is placed at checkout and released once your piece is returned safely."],
  ["How does shipping work?", "Your piece arrives in Finders Edit packaging with return instructions and a prepaid return label inside. Drop it off by your return deadline."],
  ["What if something breaks or goes missing?", "Normal vintage wear is expected. If something breaks, tell us right away and do not attempt a repair. We will walk you through what happens next, including any loss or damage charges."],
  ["Can I buy the piece I rented?", "If your piece is available to purchase, contact us before your return deadline to ask about keeping it. Your rental remains due back unless the purchase is confirmed."],
  ["Can I cancel, extend, or return early?", "Contact us as early as possible and we will do our best to help, depending on the piece's next reservation."],
  ["How should I care for my piece?", "Keep jewelry away from water, perfume, lotions, and cleaning products. Store it safely when unworn. Do not attempt repairs or polishing; contact us for advice."],
];

function How() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-bone text-ink">
      <section className="border-b border-ink">
        <div className="mx-auto max-w-[1400px] px-5 py-16 md:py-24">
          <p className="micro">How renting works</p>
          <h1 className="mt-4 font-serif text-6xl leading-[0.9] md:text-8xl">Find it. Wear it. <em>Send it back.</em></h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-xl font-serif text-2xl italic">A great piece, for your moment. Here is how to borrow from the archive.</p>
            <p className="hand -rotate-3 text-3xl text-editorial">everything you need to know <Mark>before you borrow</Mark></p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-20">
        <div className="grid border border-ink md:grid-cols-3">
          {steps.map(([n, t, d], i) => (
            <div key={n} className={`p-8 ${i < 2 ? "border-b border-ink md:border-b-0 md:border-r" : ""}`}>
              <p className="micro text-editorial">{n}</p>
              <h3 className="mt-3 font-serif text-3xl italic">{t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-charcoal">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div className="paper-grain rotate-[-1deg] bg-blush p-8 text-editorial">
            <p className="font-serif text-4xl">Rent it, then keep it.</p>
            <p className="hand mt-4 text-[26px] leading-snug">some finds are hard to give back.</p>
            <p className="mt-4 text-sm leading-relaxed text-ink">Some finds are hard to give back. If your piece is available to purchase, contact us before your return deadline to ask about keeping it. Your rental remains due back unless the purchase is confirmed.</p>
          </div>
          <div className="flex flex-col justify-center border-l-2 border-editorial pl-6">
            <p className="font-serif text-2xl italic">Beautiful vintage jewelry, with a life before yours.</p>
            <p className="mt-3 text-charcoal">Read Our Vintage Promise for what to expect, and check each piece's condition notes before reserving.</p>
            <a href="#vintage-promise" className="link-line mt-4 self-start">Read Our Vintage Promise ↓</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-5 pb-20">
        <VintagePromise />
      </section>

      <section className="border-t border-ink bg-ivory">
        <div className="mx-auto max-w-[1000px] px-5 py-20">
          <h2 className="font-serif text-5xl">Rental <em>questions</em></h2>
          <div className="mt-10">
            {faqs.map(([q, a], i) => (
              <div key={q} className="border-t border-ink last:border-b">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left font-serif text-xl hover:text-editorial">
                  <span>{q}</span><span className="micro">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && <p className="pb-6 leading-relaxed text-charcoal">{a}</p>}
              </div>
            ))}
          </div>
          <Link to="/archive" className="micro mt-12 inline-block bg-ink px-8 py-4 text-bone hover:bg-editorial">Explore the Archive →</Link>
        </div>
      </section>
    </div>
  );
}
