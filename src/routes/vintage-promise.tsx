import { createFileRoute } from "@tanstack/react-router";
import { VintagePromise } from "@/components/VintagePromise";

export const Route = createFileRoute("/vintage-promise")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Our Vintage Promise — Finders Edit" },
      { name: "description", content: "What to expect from pre-loved vintage jewelry: patina, character, and a piece cleaned after every rental." },
      { property: "og:title", content: "Our Vintage Promise — Finders Edit" },
      { property: "og:description", content: "Beautiful vintage jewelry, with a life before yours." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-[1000px] px-5 py-20">
      <VintagePromise />
    </div>
  ),
});
