'use client'


import { useEffect, useState } from 'react'


const categories = ['all', 'tops', 'bottoms', 'workout', 'outdoors']


export default function Home() {
const [products, setProducts] = useState([])
const [category, setCategory] = useState('all')
const [query, setQuery] = useState('')


useEffect(() => {
let url = '/api/search'


const params = new URLSearchParams()
if (category !== 'all') params.set('category', category)
if (query) params.set('q', query)


if (params.toString()) {
url += `?${params.toString()}`
}


fetch(url)
.then(res => res.json())
.then(setProducts)
}, [category, query])


return (
<main className="p-6">
<h1 className="text-2xl font-bold mb-4">Tall women clothing in Canada</h1>


{/* Keyword search */}
<input
type="text"
placeholder="Search keywords (e.g. tunic, leggings)"
value={query}
onChange={e => setQuery(e.target.value)}
className="border px-3 py-2 mb-4 w-full max-w-md"
/>


{/* Category filters */}
<div className="flex gap-2 mb-6">
{categories.map(c => (
<button
key={c}
onClick={() => setCategory(c)}
className="px-3 py-1 rounded bg-gray-200"
>
{c}
</button>
))}
</div>


{/* Product grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{products.map(p => (
<a
key={p.id}
href={p.url}
target="_blank"
rel="noopener noreferrer"
className="border rounded p-2 hover:shadow"
>
<img
src={p.image}
alt={p.title}
className="w-full h-40 object-cover mb-2"
/>
<h3 className="text-sm font-medium">{p.title}</h3>
<p className="text-xs text-gray-600">{p.brand}</p>
</a>
))}
</div>
</main>
)
}
