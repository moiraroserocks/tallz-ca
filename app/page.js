'use client'

import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'


export default function HomePage() {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)


useEffect(() => {
async function load() {
try {
const res = await fetch('/api/search')
const data = await res.json()
setProducts(data)
} catch (e) {
console.error(e)
} finally {
setLoading(false)
}
}
load()
}, [])


return (
<main className="max-w-7xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold mb-2">Tall women clothing — Canada</h1>
<p className="text-gray-600 mb-6">
Find tall‑friendly clothes that ship to Canada. We search multiple stores so you don’t have to.
</p>


{loading && <p>Loading products…</p>}


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{products.map(product => (
<ProductCard key={product.id} product={product} />
))}
</div>
</main>
)
}
