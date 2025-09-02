// src/components/Header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* ロゴ */}
        <a href="/" className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">Re:</span>
          <span className="text-2xl font-extrabold tracking-tight text-gray-700">lay</span>
        </a>

        {/* ナビゲーション */}
        <nav className="flex items-center gap-2">
          <a href="/" className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">ホーム</a>
          <a href="/compose" className="px-3 py-1.5 rounded-xl bg-black text-white text-sm hover:opacity-90">投稿</a>
          <a href="/me" className="px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">マイページ</a>
        </nav>
      </div>
    </header>
  );
}
