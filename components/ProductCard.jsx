'use client'

import Reviews from './Reviews'
import { useMemo } from 'react'

export default function ProductCard({ product }) {
  // Stable unique ID for reviews storage
  const productId = useMemo(() => {
    return String(product?.id ?? product?.url ?? product?.title ?? '')
  }, [product?.id, product?.url, product?.title])

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
          {product.brand || product.store || 'Store'}
        </div>

        <div className="mt-1 text-sm font-medium leading-snug">
          {product.title}
        </div>

        {/* ⭐ Ratings & comments (shared across all users) */}
        {productId && (
          <div className="mt-2">
            <Reviews productId={productId} />
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          {typeof product.price === 'number' ? (
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
  )
}
