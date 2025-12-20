export default function ProductCard({ product }) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300"
    >
      <div className="aspect-[4/5] bg-neutral-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <div className="text-xs text-neutral-500">{product.brand || product.store || 'Store'}</div>
        <div className="mt-1 text-sm font-medium leading-snug">{product.title}</div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm">
            <span className="font-semibold">${product.price}</span>
            <span className="text-neutral-500"> CAD</span>
          </div>

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
