import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Tallz<span className="text-neutral-400">.ca</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/?category=tops">Tops</Link>
            <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/?category=bottoms">Bottoms</Link>
            <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/?category=dresses">Dresses</Link>
            <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/?category=workout">Workout</Link>
            <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/?category=outdoors">Outdoors</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link className="text-sm text-neutral-600 hover:text-neutral-900" href="/about">
            About
          </Link>
          <Link
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:border-neutral-400"
            href="/about"
          >
            Work with us
          </Link>
        </div>
      </div>
    </header>
  )
}
