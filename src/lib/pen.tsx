import type { ReactNode } from "react";

/* Hand-drawn pen marks shared across every view */
export const ink = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function Under({ className = "", double = false }: { className?: string; double?: boolean | undefined }) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 w-full ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.6" d="M2 8 C 40 5, 90 9, 130 6 S 185 7, 198 5" />
      {double && <path {...ink} strokeWidth="1.2" d="M18 15 C 60 12, 110 16, 150 13 S 180 14, 190 12" />}
    </svg>
  );
}

export function Arrow({ className = "", d = "M10 10 C 60 0, 95 30, 88 78" }: { className?: string; d?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`pointer-events-none ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.5" d={d} />
      <path {...ink} strokeWidth="1.5" d="M76 66 C 80 72, 85 77, 88 80 C 90 74, 93 69, 97 64" />
    </svg>
  );
}

export function Loop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 120" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} aria-hidden>
      <path {...ink} strokeWidth="1.4" d="M40 30 C 110 8, 250 10, 285 45 C 305 80, 220 112, 130 108 C 40 104, 2 80, 12 55 C 22 32, 90 18, 170 16" />
      <path {...ink} strokeWidth="1" d="M60 24 C 140 6, 270 20, 290 55 C 298 90, 200 116, 110 104 C 30 96, 8 70, 25 45" />
    </svg>
  );
}

export function Strike({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} aria-hidden>
      <path {...ink} strokeWidth="2.4" d="M3 13 C 60 9, 130 14, 200 11 S 330 9, 397 12" />
      <path {...ink} strokeWidth="1.6" d="M14 15 C 90 12, 170 16, 250 12 S 360 13, 390 9" />
    </svg>
  );
}

export function Mark({ children, color = "text-editorial", double }: { children: ReactNode; color?: string; double?: boolean | undefined }) {
  return <span className="relative inline-block">{children}<Under double={double} className={`-bottom-2 h-3 ${color}`} /></span>;
}
