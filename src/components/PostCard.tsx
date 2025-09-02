// src/components/PostCard.tsx
import { Post } from "../types/Post";

type Props = { post: Post };

export default function PostCard({ post }: Props) {
  return (
    <article className="bg-white border rounded-2xl p-4 sm:p-5 hover:shadow-sm transition">
      <div className="flex items-start gap-4">
        <img
          src={post.thumbnail && post.thumbnail.trim() !== "" ? post.thumbnail : "/no-image.jpg"}
          onError={(e) => (e.currentTarget.src = "/no-image.jpg")}
          alt={post.title}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg font-bold leading-snug truncate">{post.title}</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {post.genre} ・ 参加人数 {post.members} ・ 最終 {post.lastAuthor}（{post.postedAgo}）
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold">▶ {post.latestEpisode}</p>
      <p className="mt-1 text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
        {post.excerpt}
      </p>

      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
        <span>👍 {post.batonCount}</span>
        <span>💬 {post.comments}</span>
        <button className="ml-auto px-3 py-1.5 rounded-xl bg-black text-white hover:opacity-90">
          続きを書く
        </button>
      </div>
    </article>
  );
}
