"use client";
import { useEffect, useState } from "react";

function Star({ filled, ...props }) {
  return (
    <button type="button" className="text-2xl leading-none" {...props}>
      {filled ? "★" : "☆"}
    </button>
  );
}

export default function Reviews({ productId }) {
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shown = hover || rating;

  async function load() {
    const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
    const data = await res.json();
    setAvg(data.averageRating || 0);
    setCount(data.count || 0);
    setReviews(data.reviews || []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  async function submit(e) {
    e.preventDefault();
    if (!rating) return;

    setSubmitting(true);
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });
      setRating(0);
      setHover(0);
      setComment("");
      await load();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-3 rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold">{avg.toFixed(1)} / 5</div>
        <div className="text-sm text-neutral-600">({count} ratings)</div>
      </div>

      <form onSubmit={submit} className="mt-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              filled={i <= shown}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
          <span className="ml-2 text-sm text-neutral-600">
            {shown ? `${shown}/5` : "Select a rating"}
          </span>
        </div>

        <input
          className="mt-2 w-full rounded-lg border px-3 py-2"
          placeholder="Optional comment (expands on hover below)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />

        <button
          className="mt-2 rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          disabled={!rating || submitting}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        {reviews.map((r) => {
          const full = (r.comment || "").trim();
          const preview = full.length > 70 ? full.slice(0, 69) + "…" : full;

          return (
            <div key={r.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {"★".repeat(r.rating)}
                  <span className="text-neutral-400">{"☆".repeat(5 - r.rating)}</span>
                </div>
                <div className="text-xs text-neutral-500">
                  {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>

              {full ? (
                <div className="mt-2">
                  {/* one-line preview + expands on hover */}
                  <span className="group relative inline-block cursor-help text-sm text-neutral-700">
                    <span className="block max-w-[520px] truncate">{preview}</span>
                    <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden w-[520px] rounded-lg border bg-white p-3 text-sm shadow-lg group-hover:block">
                      {full}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="mt-2 text-sm text-neutral-400">(No comment)</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
