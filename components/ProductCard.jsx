export default function ProductCard({ product }) {
return (
<div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
<img
src={product.image}
alt={product.title}
className="h-64 w-full object-cover"
/>


<div className="p-4">
<p className="text-sm text-gray-500">{product.store}</p>
<h2 className="font-medium mt-1">{product.title}</h2>


<div className="flex items-center justify-between mt-3">
<span className="font-semibold">${product.price} CAD</span>
<a
href={product.url}
target="_blank"
rel="noopener noreferrer"
className="text-sm px-3 py-1 border rounded-full hover:bg-black hover:text-white"
>
Buy
</a>
</div>


{product.tall && (
<span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
Tall‑friendly
</span>
)}
</div>
</div>
)
  }
