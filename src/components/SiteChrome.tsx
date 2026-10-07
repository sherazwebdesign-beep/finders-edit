import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { subscribe, unsubscribe } from '@/lib/requests.functions';
import { TermsDialog } from '@/components/TermsDialog';
import { useBag } from "@/lib/bag";

const navLink = "micro hover:text-editorial";

export function SiteHeader() {
  const { bag, setOpen } = useBag();
  const [menu, setMenu] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-bone">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4">
        <nav className="hidden items-center gap-5 xl:flex">
          <div className="group relative">
            <Link to="/archive" className={navLink}>The Archive</Link>
            <div className="invisible absolute left-0 top-full z-40 w-44 border border-ink bg-bone opacity-0 transition group-hover:visible group-hover:opacity-100">
              <Link to="/archive" search={{ view: "all" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">All Archive</Link>
              <Link to="/archive" search={{ view: "new" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">New Finds</Link>
              <Link to="/archive" search={{ view: "edits" }} className="micro block border-b border-ink px-4 py-3 hover:bg-linen">The Edits</Link>
              <Link to="/archive" search={{ view: "lust" }} className="micro block px-4 py-3 hover:bg-linen">The Lust List</Link>
            </div>
          </div>
          <Link to="/archive" search={{ view: "the-edits" }} className={navLink}>The Edits</Link>
          <Link to="/archive" search={{ view: "new-finds" }} className={navLink}>New Finds</Link>
        </nav>
        <button onClick={() => setMenu(!menu)} className="micro xl:hidden">Menu {menu ? "×" : "+"}</button>
        <Link to="/" className="col-start-2 font-serif text-2xl whitespace-nowrap">Finders<em>Edit</em></Link>
        <nav className="flex items-center justify-end gap-4">
          <Link to="/private-styling" className={`${navLink} hidden xl:inline`}>Private Styling</Link>
          <Link to="/how-it-works" className={`${navLink} hidden xl:inline`}>How Renting Works</Link>
          <Link to="/about" className={`${navLink} hidden xl:inline`}>About the Eye</Link>
          <Link to="/contact" className={`${navLink} hidden xl:inline`}>Contact</Link>
          <button onClick={() => setOpen(true)} className={`${navLink} whitespace-nowrap`}>Bag ({bag.length})</button>
        </nav>
      </div>
      {menu && (
        <nav className="border-t border-ink bg-bone px-5 py-4 xl:hidden">
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
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
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
      { label: "Our Vintage Promise", to: "/how-it-works" },
    ]],
  ];
  return (
    <footer className="bg-pitch px-5 pb-8 pt-16 text-bone">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-4xl">Finders<em className="text-gold">Edit</em></p>
          <p className="micro mt-2 text-bone/60">A private world of great taste</p>
          <p className="mt-8 text-sm text-bone/80">New finds, first.</p>
          <p className="mt-2 text-sm text-bone/80">Notes from the hunt, fresh discoveries, and pieces worth a closer look.</p>
          <form onSubmit={async (e) => { e.preventDefault(); const form = e.currentTarget; setBusy(true); try { const result = await subscribe({ data: { email: String(new FormData(form).get("email")), website: "" } }); setToken(result.token); setStatus("You’re on the list. New finds, first."); form.reset(); } catch { setStatus("We could not add you. Please try again."); } finally { setBusy(false); } }} className="mt-4 flex max-w-sm border-b border-bone/50">
            <input name="email" aria-label="Your email address" type="email" required placeholder="Your email address" className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-bone/40" />
            <button disabled={busy} className="micro shrink-0">{busy ? "Joining…" : "Join the List"}</button>
          </form>
          {status && <p role="status" className="mt-3 text-sm">{status}</p>}
          {token && <button className="link-line mt-2" onClick={async () => { await unsubscribe({ data: { token } }); setToken(""); setStatus("You have been unsubscribed."); }}>Unsubscribe</button>}
          <div className="mt-6 flex gap-6"><button onClick={() => setTopic("Privacy")} className="micro">Privacy</button><button onClick={() => setTopic("Rental Terms")} className="micro">Rental Terms</button></div>
        </div>
        {cols.map(([h, ls]) => (
          <div key={h}>
            <p className="micro mb-4 text-bone/50">{h}</p>
            <ul className="space-y-2 text-sm">
              {ls.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} search={l.search ?? {}} hash={l.label === "Our Vintage Promise" ? "vintage-promise" : ""} className="hover:text-editorial">{l.label}</Link>
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
      <TermsDialog topic={topic} close={() => setTopic(null)} />
    </footer>
  );
}
