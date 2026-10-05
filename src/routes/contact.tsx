import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { Mark } from "@/lib/pen";

const topics = ["A Piece", "My Rental", "Buying a Piece", "Private Styling", "Something Else"];

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(z.object({
    topic: fallback(z.string(), "").default(""),
    ref: fallback(z.string(), "").default(""),
  })),
  head: () => ({
    meta: [
      { title: "Contact — Finders Edit" },
      { name: "description", content: "A question about a piece, help with a rental, or a look you want to bring together. Write to Finders Edit." },
      { property: "og:title", content: "Tell us what you have in mind — Finders Edit" },
      { property: "og:description", content: "Questions about a piece, a rental, or private styling. We would love to hear from you." },
    ],
  }),
  component: Contact,
});

const field = "mt-1 w-full border-b border-ink bg-transparent py-2 font-serif outline-none focus:border-editorial";

function Contact() {
  const { topic, ref } = Route.useSearch();
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-bone text-ink">
      <section className="mx-auto grid max-w-[1400px] gap-16 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="micro">Contact</p>
          <h1 className="mt-4 font-serif text-6xl leading-[0.9] md:text-7xl">Tell us what you <em>have in mind.</em></h1>
          <p className="mt-6 max-w-md font-serif text-xl italic text-charcoal">A question about a piece, help with a rental, or a look you want to bring together. We would love to hear from you.</p>
          <p className="hand mt-8 -rotate-3 text-3xl text-editorial">questions, press, or a piece you <Mark>can't stop thinking about</Mark></p>
          <div className="mt-12 space-y-4 border-t border-ink pt-6">
            <p className="flex justify-between"><span className="micro">Instagram</span><a href="https://instagram.com/findersedit" target="_blank" rel="noreferrer" className="font-serif text-lg hover:text-editorial">@FindersEdit</a></p>
            <p className="flex justify-between border-t border-ink pt-4"><span className="micro">Email</span><a href="mailto:hello@findersedit.com" className="font-serif text-lg hover:text-editorial">hello@findersedit.com</a></p>
            <p className="flex justify-between border-t border-ink pt-4"><span className="micro">Web</span><span className="font-serif text-lg">FindersEdit.com</span></p>
          </div>
        </div>
        <div className="border border-ink bg-ivory p-8 md:p-10">
          {sent ? (
            <div>
              <p className="font-serif text-3xl italic">Thank you for your note.</p>
              <p className="mt-2 text-charcoal">We will be in touch.</p>
              <p className="hand mt-6 -rotate-2 text-4xl text-editorial">xx</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-7">
              <label className="block"><span className="micro">Name</span><input required className={field} /></label>
              <label className="block"><span className="micro">Email</span><input required type="email" className={field} /></label>
              <label className="block"><span className="micro">Topic</span>
                <select defaultValue={topics.includes(topic) ? topic : topics[0]} className={field}>
                  {topics.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block"><span className="micro">Order or reservation number (optional)</span><input defaultValue={ref} className={field} /></label>
              <label className="block"><span className="micro">Message</span>
                <textarea required rows={5} className="mt-2 w-full border border-ink bg-bone p-3 font-serif outline-none focus:border-editorial" />
              </label>
              <button className="micro w-full bg-ink py-4 text-bone hover:bg-editorial">Send a Note →</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
