"use client";

import { useMemo, useState } from "react";
import Reviews from "./Reviews";

export default function ProductCard({ product }) {
  const productId = useMemo(() => {
    return String(product?.id ?? product?.url ?? product?.title ?? "");
  }, [product?.id, product?.url, product?.title]);

  const [showReviews, setShowReviews] = useState(false);

  const avg = Number(product?.averageRating ?? 0);
  const count = Number(product?.reviewCount ?? 0);

  return (
    <div className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300">
      {/* Image (already links to Amazon) */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-neutral-50 h-[170px] sm:h-[190px] flex items-center justify-center overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </a>

      {/* Content */}
      <div className="p-3">
        <div className="text-xs text-neutral-500">
          {product.brand || product.store || "Store"}
        </div>

        <div className="mt-1 text-sm font-medium leading-snug">
          {product.title}
        </div>

        {/* Rating summary */}
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-600">
          {count > 0 ? (
            <>
              <span className="font-semibold">{avg.toFixed(1)}</span>
              <span aria-hidden>★</span>
              <span className="text-neutral-500">({count})</span>
            </>
          ) : (
            <span className="text-neutral-400">No reviews yet</span>
          )}

          {!showReviews && productId && (
            <button
              type="button"
              onClick={() => setShowReviews(true)}
              className="ml-auto text-xs text-neutral-500 hover:text-neutral-800 underline-offset-4 hover:underline"
            >
              Add / view reviews
            </button>
          )}
        </div>

        {/* Reviews */}
        {showReviews && productId && (
          <div className="mt-2">
            <Reviews productId={productId} />
          </div>
        )}
      </div>
    </div>
  );
}
