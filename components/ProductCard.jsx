'use client'

import { useEffect, useMemo, useState } from 'react'

function Stars({ value, onChange }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={(e) => {
            e.preventDefault() // prevents clicking the card link
            onChange(n)
          }}
          className="leading-none"
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
        >
          <span
            className={`text-base ${
              n <= value ? 'text-amber-500' : 'text-neutral-300'
            }`}
          >
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

export default function ProductCard({ product }) {
  const storageKey = useMemo(() => `rating:${product.id}`, [product.id])
  const [rating, setRating] = useState(0)

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(storageKey) || 0)
      if (!Number.isNaN(saved)) setRating(saved)
    } catch {
      // ignore
    }
  }, [storageKey])

  function updateRating(next) {
    setRating(next)
    try {
      localStorage.setItem(storageKey, String(next))
    } catch {
      // ignore
    }
  }

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300"
    >
      <div className="aspect-[4/5] bg-neutral-50 overflow-hidden max-h-[220px]">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <div className="text-xs text-neutral-500">
          {product.brand || product.store || 'Store'}
        </div>

        <div className="mt-1 text-sm font-medium leading-snug">
          {product.title}
        </div>

        {/* ⭐ Rating UI (under title) */}
        <div className="mt-2">
          <Stars value={rating} onChange={updateRating} />
          <div className="mt-1 text-[11px] text-neutral-500">
            {rating ? `You rated: ${rating}/5` : 'Tallz customer ratings'}
          </div>
        </div>

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
