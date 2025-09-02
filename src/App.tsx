// src/App.tsx
import { useState } from "react";
import GenreTabs from "./components/GenreTabs";
import Header from "./components/Header";
import Timeline from "./components/Timeline";

export default function App() {
  const [selectedGenre, setSelectedGenre] = useState<string>("恋愛");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="pb-12">
        <section className="mx-auto max-w-5xl px-4">
          <div className="flex items-end justify-between pt-4">
            <h2 className="text-xl sm:text-2xl font-bold">
              表示中のジャンル：{selectedGenre}
            </h2>
          </div>
        </section>
        <GenreTabs onSelect={setSelectedGenre} initial={selectedGenre} />
        <Timeline genre={selectedGenre} />
      </main>
    </div>
  );
}
