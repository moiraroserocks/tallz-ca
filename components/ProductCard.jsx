export default function ProductCard({ product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition"
    >
      <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <div className="text-xs text-gray-500">
          {product.brand || product.store || 'Store'}
        </div>
        <div className="mt-1 text-sm font-medium leading-snug">
          {product.title}
        </div>

        {product.tall && (
          <div className="mt-2 inline-flex text-[11px] px-2 py-1 rounded-full border">
            Tall-friendly
          </div>
        )}
      </div>
    </a>
  )
}
