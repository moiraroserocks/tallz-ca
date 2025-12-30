"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function Star({ filled, ...props }) {
  return (
    <button type="button" className="leading-none text-lg" {...props}>
      {filled ? "★" : "☆"}
    </button>
  );
}

function hasTextComment(r) {
  return Boolean((r?.comment ?? "").toString().trim());
}

export default function Reviews({ productId }) {
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ always show one "latest comment with text" card; expand for all
  const [expanded, setExpanded] = useState(false);

  const shown = hover || rating;

  // Tiny in-memory cache so opening the same product again doesn't refetch immediately
  const cacheKey = useMemo(() => String(productId || ""), [productId]);
  const cacheRef = useRef(new Map()); // key -> {avg,count,reviews,ts}
  const abortRef = useRef(null);

  async function load({ useCache = true } = {}) {
    if (!cacheKey) return;

    const cached = cacheRef.current.get(cacheKey);
    const now = Date.now();
    if (useCache && cached && now - cached.ts < 60_000) {
      setAvg(cached.avg);
      setCount(cached.count);
      setReviews(cached.reviews);
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/reviews?productId=${encodeURIComponent(cacheKey)}`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        setAvg(0);
        setCount(0);
        setReviews([]);
        return;
      }

      const data = await res.json();
      const next = {
        avg: Number(data.averageRating || 0),
        count: Number(data.count || 0),
        reviews: Array.isArray(data.reviews) ? data.reviews : [],
        ts: now,
      };

      cacheRef.current.set(cacheKey, next);
      setAvg(next.avg);
      setCount(next.count);
      setReviews(next.reviews);
    } catch (err) {
      if (err?.name !== "AbortError") {
        setAvg(0);
        setCount(0);
        setReviews([]);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setExpanded(false); // reset when switching products
    load({ useCache: true });

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  async function submit(e) {
    e.preventDefault();
    if (!rating || !cacheKey) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: cacheKey, rating, comment }),
      });

      if (!res.ok) return;

      setRating(0);
      setHover(0);
      setComment("");
      setExpanded(false);

      await load({ useCache: false });
    } finally {
      setSubmitting(false);
    }
  }

  // Pick the newest review that has a non-empty comment.
  // If none have comment text, fall back to the newest review (reviews[0]).
  const featured =
    reviews.find((r) => hasTextComment(r)) || reviews[0] || null;

  function ReviewRow({ r }) {
    const full = (r.comment || "").toString().trim();
    const preview = full.length > 60 ? full.slice(0, 59) + "…" : full;

    return (
      <div className="rounded-md border border-neutral-200 p-2">
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
            <span className="relative inline-block text-[11px] text-neutral-700">
              <span className="peer block max-w-[520px] truncate cursor-help">
                {preview}
              </span>

              <span className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-[520px] rounded-md border bg-white p-2 text-[11px] shadow-lg peer-hover:block">
                {full}
              </span>
            </span>
          </div>
        ) : (
          <div className="mt-1 text-[11px] text-neutral-400">(No comment)</div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-neutral-200 p-2">
      {/* Summary */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-semibold">{avg.toFixed(1)} / 5</div>
        <div className="text-[11px] text-neutral-600">({count})</div>
        {loading ? (
          <div className="text-[11px] text-neutral-400">Loading…</div>
        ) : null}
      </div>

      {/* Featured (latest with text) always visible */}
      {featured ? (
        <div className="mt-2 space-y-1">
          <ReviewRow r={featured} />

          {/* Three dots toggle (only if there are multiple reviews) */}
          {reviews.length > 1 ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[14px] leading-none text-neutral-500 hover:text-neutral-800"
              aria-label={expanded ? "Hide all reviews" : "Show all reviews"}
              title={expanded ? "Hide all reviews" : "Show all reviews"}
            >
              {expanded ? "×" : "…"}
            </button>
          ) : null}

          {/* All reviews when expanded */}
          {expanded ? (
            <div className="mt-2 space-y-1">
              {reviews.map((r) => (
                <ReviewRow key={r.id} r={r} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-2 text-[11px] text-neutral-500">No ratings yet.</div>
      )}

      {/* Form */}
      <form onSubmit={submit} className="mt-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              filled={i <= shown}
              onClick={(e) => {
                e.preventDefault();
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
        />

        <button
          type="submit"
          className="mt-1 rounded-md bg-black px-3 py-1 text-[11px] text-white disabled:opacity-50"
          disabled={!rating || submitting}
        >
          {submitting ? "Saving…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
