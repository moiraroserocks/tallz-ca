import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Tallz<span className="text-neutral-400">.ca  A clean, searchable catalog of tall-friendly pieces that ship to Canada.</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/about">
            About
          </Link>
        <a
  className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:border-neutral-400"
  href="mailto:tallz.ca@proton.me?subject=Tallz.ca%20Inquiry"
>
  Be in touch
</a>

        </div>
      </div>
    </header>
  )
}
