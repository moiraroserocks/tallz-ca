'use client'


import { useEffect, useState } from 'react'


const categories = ['all', 'tops', 'bottoms', 'workout', 'outdoors']


export default function Home() {
const [products, setProducts] = useState([])
const [category, setCategory] = useState('all')


useEffect(() => {
const url = category === 'all'
? '/api/search'
: `/api/search?category=${category}`


fetch(url)
.then(res => res.json())
.then(setProducts)
}, [category])


return (
<main className="p-6">
<h1 className="text-2xl font-bold mb-4">Tall women clothing in Canada</h1>


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


<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
{products.map(p => (
<a
key={p.id}
href={p.url}
target="_blank"
rel="noopener noreferrer"
className="border rounded p-3 hover:shadow"
>
<img
src={p.image}
alt={p.title}
className="w-full h-60 object-cover mb-2"
/>
<h3 className="font-medium">{p.title}</h3>
<p className="text-sm text-gray-600">{p.brand}</p>
</a>
))}
</div>
</main>
)
}
