"use client";
import { useEffect, useState } from "react";

function Star({ filled, ...props }) {
  return (
    <button type="button" className="leading-none text-lg" {...props}>
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
    <div className="mt-2 rounded-lg border border-neutral-200 p-2">
      {/* Summary (small) */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-semibold">{avg.toFixed(1)} / 5</div>
        <div className="text-[11px] text-neutral-600">({count})</div>
      </div>

      {/* Existing ratings/comments ABOVE the form */}
      {reviews.length > 0 ? (
        <div className="mt-2 space-y-1">
          {reviews.slice(0, 3).map((r) => {
            const full = (r.comment || "").trim();
            const preview = full.length > 60 ? full.slice(0, 59) + "…" : full;

            return (
              <div key={r.id} className="rounded-md border border-neutral-200 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-[11px]">
                    {"★".repeat(r.rating)}
                    <span className="text-neutral-300">{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>

                {full ? (
                  <div className="mt-1">
                    {/* one-line preview + expands on hover */}
                    <span className="group relative inline-block cursor-help text-[11px] text-neutral-700">
                      <span className="block max-w-[520px] truncate">{preview}</span>
                      <span className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-[520px] rounded-md border bg-white p-2 text-[11px] shadow-lg group-hover:block">
                        {full}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="mt-1 text-[11px] text-neutral-400">(No comment)</div>
                )}
              </div>
            );
          })}

          {reviews.length > 3 ? (
            <div className="text-[11px] text-neutral-500">
              + {reviews.length - 3} more
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2 text-[11px] text-neutral-500">No ratings yet.</div>
      )}

      {/* Form BELOW (compact) */}
      <form onSubmit={submit} className="mt-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              filled={i <= shown}
              onClick={(e) => {
                e.preventDefault(); // avoid clicking card link
                setRating(i);
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
          <span className="ml-1 text-[11px] text-neutral-600">
            {shown ? `${shown}/5` : "Rate"}
          </span>
        </div>

        <input
          className="mt-1 w-full rounded-md border border-neutral-200 px-2 py-1 text-[11px]"
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          onClick={(e) => e.preventDefault()} // avoid card link click
          onMouseDown={(e) => e.preventDefault()} // avoid card link click
        />

        <button
          className="mt-1 rounded-md bg-black px-3 py-1 text-[11px] text-white disabled:opacity-50"
          disabled={!rating || submitting}
          onClick={(e) => e.preventDefault() || submit(e)}
        >
          {submitting ? "Saving…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
