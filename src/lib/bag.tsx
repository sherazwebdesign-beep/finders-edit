import { createContext, useContext, useState, type ReactNode } from "react";
import type { Piece } from "@/lib/pieces";

export type BagLine = { piece: Piece; mode: "Rent" | "Own"; days?: 4 | 8; date?: string };

type BagCtx = {
  bag: BagLine[];
  add: (piece: Piece, mode?: "Rent" | "Own", days?: 4 | 8, date?: string) => void;
  setMode: (i: number, mode: "Rent" | "Own") => void;
  remove: (i: number) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<BagCtx | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [open, setOpen] = useState(false);
  const add = (piece: Piece, mode: "Rent" | "Own" = "Rent", days?: 4 | 8, date?: string) => {
    setBag((b) => [...b, { piece, mode, days, date }]);
    setOpen(true);
  };
  const setMode = (i: number, mode: "Rent" | "Own") => setBag((x) => x.map((y, j) => (j === i ? { ...y, mode } : y)));
  const remove = (i: number) => setBag((x) => x.filter((_, j) => j !== i));
  return <Ctx.Provider value={{ bag, add, setMode, remove, open, setOpen }}>{children}</Ctx.Provider>;
}

export function useBag() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBag outside BagProvider");
  return ctx;
}

export function BagDrawer() {
  const { bag, setMode, remove, open, setOpen } = useBag();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-ink bg-bone transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-ink px-6 py-5">
          <h2 className="font-serif text-2xl italic">The Archive Bag</h2>
          <button onClick={() => setOpen(false)} className="micro hover:text-editorial">Close ×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {bag.length === 0 ? (
            <p className="hand text-3xl text-editorial">nothing yet. go find something.</p>
          ) : (
            <div className="space-y-6">
              {bag.map((b, i) => (
                <div key={i} className="grid grid-cols-[72px_1fr] gap-4 border-b border-ink pb-4">
                  <img src={b.piece.img} alt="" className="aspect-[3/4] w-full object-cover" />
                  <div>
                    <p className="micro">No. {b.piece.no}</p>
                    <p className="font-serif text-lg">{b.piece.name}</p>
                    {b.mode === "Rent" && (b.days || b.date) && (
                      <p className="micro mt-1 text-charcoal">{b.days ?? 4} days{b.date ? ` · from ${b.date}` : ""}</p>
                    )}
                    <div className="mt-2 flex gap-3">
                      {(["Rent", "Own"] as const).map((m) => (
                        <button key={m} onClick={() => setMode(i, m)} className={`micro border px-2 py-1 ${b.mode === m ? "bg-ink text-bone" : "border-ink"}`}>
                          {m} ${m === "Rent" ? b.piece.rent : b.piece.own}
                        </button>
                      ))}
                      <button onClick={() => remove(i)} className="micro ml-auto hover:text-editorial">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between font-serif text-xl">
                <span>Total</span>
                <span>${bag.reduce((s, b) => s + (b.mode === "Rent" ? b.piece.rent : b.piece.own), 0)}</span>
              </div>
              <button className="micro w-full bg-ink py-4 text-bone hover:bg-editorial">Checkout →</button>
              <p className="hand -rotate-1 text-2xl text-pen">checkout opens when the doors do. xx</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
