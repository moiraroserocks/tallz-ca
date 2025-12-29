"use client";

import { useMemo, useState } from "react";
import Reviews from "./Reviews";

export default function ProductCard({ product }) {
  const productId = useMemo(() => {
    return String(product?.id ?? product?.url ?? product?.title ?? "");
  }, [product?.id, product?.url, product?.title]);

  const [showReviews, setShowReviews] = useState(false);

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300"
    >
      {/* Image */}
      <div className="bg-neutral-50 h-[170px] sm:h-[190px] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="text-xs text-neutral-500">
          {product.brand || product.store || "Store"}
        </div>

        <div className="mt-1 text-sm font-medium leading-snug">
          {product.title}
        </div>

        {/* ⭐ Ratings & comments (lazy-load on hover/focus) */}
        {productId && (
          <div className="mt-2">
            {!showReviews ? (
              <span
                role="button"
                tabIndex={0}
                onMouseEnter={() => setShowReviews(true)}
                onFocus={() => setShowReviews(true)}
                onClick={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowReviews(true);
                  }
                }}
                className="inline-block text-xs text-neutral-500 hover:text-neutral-800 underline-offset-4 hover:underline"
              >
                Ratings
              </span>
            ) : (
              // Prevent clicks inside reviews from navigating away
              <div
                onClick={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
              >
                <Reviews productId={productId} />
              </div>
            )}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {typeof product.price === "number" ? (
            <div className="text-sm">
              <span className="font-semibold">${product.price}</span>
              <span className="text-neutral-500"> CAD</span>
            </div>
          ) : (
            <div />
          )}

          {product.tall && (
            <span className="rounded-full border border-neutral-200 px-2 py-1 text-[11px] text-neutral-700">
              Tall
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
