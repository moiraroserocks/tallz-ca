'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '../components/ProductCard'

const COLLECTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Tops', value: 'tops' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Workout', value: 'workout' },
  { label: 'Outdoors', value: 'outdoors' },
]

export default function HomeClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const category = searchParams.get('category') || 'all'
  const q = searchParams.get('q') || ''

  function setParam(next) {
    const sp = new URLSearchParams(searchParams.toString())
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

        const url = sp.toString()
          ? `/api/search?${sp.toString()}`
          : '/api/search'

        const res = await fetch(url)
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
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

        {/* Search + filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setParam({ q: e.target.value })}
            placeholder='Search (e.g., "tunic")'
            className="w-full rounded-full border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-neutral-400"
          />

          <select
            value={category}
            onChange={(e) => setParam({ category: e.target.value })}
            className="rounded-full border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-neutral-400"
          >
            {COLLECTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Collection pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => {
            const active = category === c.value
            return (
              <button
                key={c.value}
                onClick={() => setParam({ category: c.value })}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Results */}
      <div className="mb-5 text-sm text-neutral-600">
        {loading ? 'Loading…' : `Showing ${visible.length} items`}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-neutral-200"
            >
              <div className="aspect-[4/5] bg-neutral-100" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-24 rounded bg-neutral-100" />
                <div className="h-4 w-40 rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}
