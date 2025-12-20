'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useRouter, useSearchParams } from 'next/navigation'

const COLLECTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Tops', value: 'tops' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Workout', value: 'workout' },
  { label: 'Outdoors', value: 'outdoors' }
]

export default function HomePage() {
  const router = useRouter()
  const params = useSearchParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const category = params.get('category') || 'all'
  const q = params.get('q') || ''

  function setParam(next) {
    const sp = new URLSearchParams(params.toString())
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === 'all') sp.delete(k)
      else sp.set(k, v)
    })
    const qs = sp.toString()
    router.push(qs ? `/?${qs}` : '/')
  }

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const sp = new URLSearchParams()
        if (category !== 'all') sp.set('category', category)
        if (q.trim()) sp.set('q', q.trim())

        const url = sp.toString() ? `/api/search?${sp.toString()}` : '/api/search'
        const res = await fetch(url)
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, q])

  const visible = useMemo(() => products, [products])

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10">
      {/* Hero */}
      <section className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Tall-friendly clothing
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          A clean, searchable catalog of tall-friendly pieces that ship to Canada.
        </p>

        {/* Search row */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              value={q}
              onChange={(e) => setParam({ q: e.target.value })}
              placeholder='Search (e.g., "tunic")'
              className="w-full rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Collection</span>
            <select
              value={category}
              onChange={(e) => setParam({ category: e.target.value })}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-neutral-400"
            >
              {COLLECTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collection pills (template vibe) */}
        <div className="mt-5 flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => {
            const active = (category || 'all') === c.value
            return (
              <button
                key={c.value}
                onClick={() => setParam({ category: c.value })}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Results header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          {loading ? 'Loading…' : `Showing ${visible.length} items`}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-neutral-200"
            >
              <div className="aspect-[4/5] rounded-t-2xl bg-neutral-100" />
              <div className="p-3">
                <div className="h-3 w-24 rounded bg-neutral-100" />
                <div className="mt-2 h-4 w-40 rounded bg-neutral-100" />
                <div className="mt-3 h-3 w-16 rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-10 rounded-2xl border border-neutral-200 p-6 text-sm text-neutral-600">
              No results. Try another keyword or pick “All”.
            </div>
          )}
        </>
      )}
    </main>
  )
}
