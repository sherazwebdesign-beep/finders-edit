import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useBag } from "@/lib/bag";

const navLink = "micro hover:text-editorial";

export function SiteHeader() {
  const { bag, setOpen } = useBag();
  const [menu, setMenu] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-bone">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4">
        <nav className="hidden items-center gap-6 md:flex">
          <div className="group relative">
            <Link to="/archive" className={navLink}>The Archive</Link>
            <div className="invisible absolute left-0 top-full z-40 w-44 border border-ink bg-bone opacity-0 transition group-hover:visible group-hover:opacity-100">
              <Link to="/archive" search={{ view: "all" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">All Archive</Link>
              <Link to="/archive" search={{ view: "new" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">New Finds</Link>
              <Link to="/archive" search={{ view: "edits" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">The Edits</Link>
              <Link to="/archive" search={{ view: "lust" }} className="micro block px-4 py-3 hover:bg-linen">The Lust List</Link>
            </div>
          </div>
          <Link to="/private-styling" className={navLink}>Private Styling</Link>
          <Link to="/how-it-works" className={navLink}>How Renting Works</Link>
        </nav>
        <button onClick={() => setMenu(!menu)} className="micro md:hidden">Menu {menu ? "×" : "+"}</button>
        <Link to="/" className="col-start-2 font-serif text-2xl tracking-tight">Finders<em>Edit</em></Link>
        <nav className="flex items-center justify-end gap-6">
          <Link to="/about" className={`${navLink} hidden md:inline`}>About the Eye</Link>
          <Link to="/contact" className={`${navLink} hidden md:inline`}>Contact</Link>
          <button onClick={() => setOpen(true)} className={navLink}>Bag ({bag.length})</button>
        </nav>
      </div>
      {menu && (
        <nav className="border-t border-ink bg-bone px-5 py-4 md:hidden">
          <div className="grid gap-3">
            <Link to="/archive" search={{ view: "all" }} onClick={() => setMenu(false)} className={navLink}>The Archive</Link>
            <Link to="/archive" search={{ view: "new" }} onClick={() => setMenu(false)} className="micro pl-4 text-charcoal hover:text-editorial">— New Finds</Link>
            <Link to="/archive" search={{ view: "edits" }} onClick={() => setMenu(false)} className="micro pl-4 text-charcoal hover:text-editorial">— The Edits</Link>
            <Link to="/archive" search={{ view: "lust" }} onClick={() => setMenu(false)} className="micro pl-4 text-charcoal hover:text-editorial">— The Lust List</Link>
            <Link to="/private-styling" onClick={() => setMenu(false)} className={navLink}>Private Styling</Link>
            <Link to="/how-it-works" onClick={() => setMenu(false)} className={navLink}>How Renting Works</Link>
            <Link to="/about" onClick={() => setMenu(false)} className={navLink}>About the Eye</Link>
            <Link to="/contact" onClick={() => setMenu(false)} className={navLink}>Contact</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, { label: string; to: string; search?: Record<string, string> }[]][] = [
    ["Shop", [
      { label: "The Archive", to: "/archive", search: { view: "all" } },
      { label: "New Finds", to: "/archive", search: { view: "new" } },
      { label: "The Edits", to: "/archive", search: { view: "edits" } },
      { label: "The Lust List", to: "/archive", search: { view: "lust" } },
    ]],
    ["Service", [
      { label: "How Renting Works", to: "/how-it-works" },
      { label: "Private Styling", to: "/private-styling" },
      { label: "Contact", to: "/contact" },
    ]],
    ["The World", [
      { label: "About the Eye", to: "/about" },
      { label: "Instagram (@FindersEdit)", to: "/contact" },
      { label: "Email", to: "/contact" },
    ]],
  ];
  return (
    <footer className="bg-pitch px-5 pb-8 pt-16 text-bone">
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
        {cols.map(([h, ls]) => (
          <div key={h}>
            <p className="micro mb-4 text-bone/50">{h}</p>
            <ul className="space-y-2 text-sm">
              {ls.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} search={l.search} className="hover:text-editorial">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-wrap items-end justify-between gap-4 border-t border-bone/20 pt-6">
        <p className="script relative -rotate-3 pb-4 text-5xl text-editorial">if you know, you know
          <svg viewBox="0 0 300 30" className="absolute -bottom-1 left-6 h-6 w-[80%]" aria-hidden>
            <path fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" d="M2 18 C 60 8, 120 26, 190 14 S 270 4, 296 12 C 285 20, 270 24, 260 18" />
          </svg>
        </p>
        <p className="micro text-bone/50">© 2026 Finders Edit. All rights reserved.</p>
      </div>
    </footer>
  );
}
