"use client";

import { useState } from "react";

const categories = [
  { label: "Tradicional", anchor: "tradicional" },
  { label: "Ouro", anchor: "ouro" },
  { label: "Platina", anchor: "platina" },
  { label: "Diamante", anchor: "diamante" },
] as const;

export function CategoryNav() {
  const [active, setActive] = useState<string>(categories[0].anchor);

  function handleClick(anchor: string) {
    setActive(anchor);
    const el = document.getElementById(anchor);
    if (el) {
      const offset = 68 + 50 + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="sticky top-[68px] z-40 border-b border-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex h-[50px] max-w-[1200px] items-center gap-3 overflow-x-auto px-4 md:px-6">
        {categories.map((cat) => (
          <button
            key={cat.anchor}
            type="button"
            onClick={() => handleClick(cat.anchor)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors ${
              active === cat.anchor
                ? "border-[#1C1C1C]/30 bg-[#F7F7F7] text-[#1C1C1C]"
                : "border-gray-200 bg-white text-[#4A4A4A] hover:border-gray-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
