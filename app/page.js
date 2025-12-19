'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (category !== 'all') params.set('category', category)
        if (query.trim()) params.set('q', query.trim())

        const url = params.toString()
          ? `/api/search?${params.toString()}`
          : '/api/search'

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
  }, [category, query])

  const visible = useMemo(() => {
    let list = products
    if (category !== 'all') list = list.filter(p => p.category === category)
    if (query.trim()) {
      const k = query.trim().toLowerCase()
      list = list.filter(p => (p.title || '').toLowerCase().includes(k))
    }
    return list
  }, [products, category, query])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Tall-friendly clothing
          </h1>
          <p className="text-gray-600 mt-2">
            Search tall items that ship to Canada.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search (e.g., "tunic")'
            className="w-full md:w-[320px] rounded-full border px-4 py-2 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border px-4 py-2 text-sm bg-white"
          >
            <option value="all">All</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
            <option value="dresses">Dresses</option>
            <option value="workout">Workout</option>
            <option value="outdoors">Outdoors</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : (
        <>
          <div className="text-sm text-gray-600 mb-4">
            Showing <span className="font-medium">{visible.length}</span> items
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-gray-600 mt-8">No results.</p>
          )}
        </>
      )}
    </div>
  )
}
