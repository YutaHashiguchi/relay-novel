// src/components/GenreTabs.tsx
import { useState } from "react";

const genres = ["恋愛", "SF", "ホラー", "青春", "ミステリ", "ファンタジー"];

type Props = { onSelect: (genre: string) => void; initial?: string };

export default function GenreTabs({ onSelect, initial }: Props) {
  const [active, setActive] = useState<string>(initial ?? genres[0]);

  const click = (g: string) => {
    setActive(g);
    onSelect(g);
  };

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex flex-wrap gap-2 py-3">
        {genres.map((g) => {
          const isActive = active === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => click(g)}
              aria-pressed={isActive}
              className={[
                "px-4 py-2 rounded-full text-sm transition",
                isActive
                  ? "bg-gray-900 text-white shadow"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              ].join(" ")}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}
