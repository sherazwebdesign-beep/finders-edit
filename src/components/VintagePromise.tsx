import { Link } from "@tanstack/react-router";

export function VintagePromise() {
  return (
    <section id="vintage-promise" className="border border-ink bg-ivory p-8 md:p-14">
      <p className="micro">Our vintage promise</p>
      <h2 className="mt-4 font-serif text-5xl italic">Our vintage promise</h2>
      <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-charcoal">
        <p>The FindersEdit collection brings together vintage jewelry with a life before yours. These pieces are pre-loved rather than brand new, and may show signs of age—from subtle patina and small surface marks to gentle wear on finishes. These details are part of their history and character.</p>
        <p>Every piece is cleaned after each rental, ready for its next chapter with you. Please expect beautiful vintage jewelry with personality, rather than a flawless, factory-new finish.</p>
        <p>If you have questions about a particular piece's condition before reserving, we're happy to help.</p>
      </div>
      <Link to="/contact" search={{ topic: "A Piece", ref: "" }} className="link-line mt-8 inline-block">Ask About a Piece →</Link>
    </section>
  );
}
