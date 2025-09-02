// src/components/NovelReader.tsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  orderBy,
  query as fsQuery,
} from "firebase/firestore";

type Post = {
  id: string;
  title: string;
  author?: string;
  content: string;
  createdAt?: Date | null;
};

export default function NovelReader() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const colRef = collection(db, "posts");

        // まずは createdAt で並び替え取得を試す
        let snap;
        try {
          snap = await getDocs(fsQuery(colRef, orderBy("createdAt", "asc")));
        } catch {
          // 失敗したらフォールバック（素の getDocs）
          snap = await getDocs(colRef);
        }

        const docs: Post[] = snap.docs.map((doc) => {
          const data: any = doc.data();
          const created =
            data.createdAt?.toDate?.() ??
            (data.createdAt instanceof Date ? data.createdAt : null);
          return {
            id: doc.id,
            title: data.title ?? "",
            author: data.author ?? "",
            content: data.content ?? "",
            createdAt: created ?? null,
          };
        });

        // createdAt の有無に関係なく安全に昇順ソート
        docs.sort(
          (a, b) =>
            (a.createdAt?.getTime?.() ?? 0) - (b.createdAt?.getTime?.() ?? 0)
        );

        setPosts(docs);
        setPageIndex(0);
      } catch (err: any) {
        console.error(err);
        setErrorMsg(
          err?.code === "permission-denied"
            ? "権限エラー：Firestore の読み取りが許可されていません。"
            : err?.message || "データの読み込みに失敗しました。"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        読み込み中…
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white border rounded-2xl p-5 text-center">
          <p className="text-red-600 font-semibold mb-2">読み込みエラー</p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {errorMsg}
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-[#fdfcf5] min-h-screen flex items-center justify-center">
        <div className="text-gray-700 bg-white border rounded-2xl p-6">
          まだ投稿がありません。まずは最初の一話を作成してください。
        </div>
      </div>
    );
  }

  const p = posts[pageIndex];

  return (
    <div className="bg-[#fdfcf5] min-h-screen flex flex-col items-center py-8 px-4 font-serif text-lg leading-relaxed text-gray-900">
      <header className="max-w-3xl w-full mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">{p.title}</h1>
        {p.author ? (
          <p className="text-sm text-gray-500">作者：{p.author}</p>
        ) : null}
      </header>

      <article className="max-w-3xl w-full whitespace-pre-wrap">
        {p.content}
      </article>

      <div className="max-w-3xl w-full flex justify-between mt-8">
        <button
          onClick={() => setPageIndex((v) => Math.max(0, v - 1))}
          disabled={pageIndex === 0}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          前へ
        </button>
        <div className="text-sm text-gray-500">
          {pageIndex + 1} / {posts.length}
        </div>
        <button
          onClick={() => setPageIndex((v) => Math.min(posts.length - 1, v + 1))}
          disabled={pageIndex === posts.length - 1}
          className="px-4 py-2 rounded bg-gray-300 disabled:opacity-50"
        >
          次へ
        </button>
      </div>
    </div>
  );
}
