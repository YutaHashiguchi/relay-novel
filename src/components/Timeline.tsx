// src/components/Timeline.tsx
import { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import PostCard from "./PostCard";
import { Post } from "../types/Post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

dayjs.extend(relativeTime);
dayjs.locale("ja");

export default function Timeline({ genre }: { genre?: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate?.();
        return {
          id: doc.id,
          title: data.title,
          content: data.content,
          author: data.author,
          createdAt,
          likes: data.likes,
          batonCount: data.batonCount,
          genre: data.genre,
          thumbnail: data.thumbnail,
          members: data.members,
          lastAuthor: data.lastAuthor,
          postedAgo: createdAt ? dayjs(createdAt).fromNow() : "不明",
          latestEpisode: data.latestEpisode,
          excerpt: data.excerpt,
          comments: data.comments,
        } as Post;
      });
      setPosts(docs);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(
    () => (genre ? posts.filter((p) => p.genre === genre) : posts),
    [posts, genre]
  );

  return (
    <section className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">📚 Re:lay タイムライン</h1>

      {loading ? (
        <p className="text-gray-500">読み込み中…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-gray-600 bg-white">
          まだ投稿がありません。<a href="/compose" className="underline">最初の一話を投稿</a>しよう！
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((post) => (
            <li key={post.id}><PostCard post={post} /></li>
          ))}
        </ul>
      )}
    </section>
  );
}
