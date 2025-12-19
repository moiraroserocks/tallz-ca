import Link from 'next/link'

const NAV = [
  { label: 'Tops', href: '/?category=tops' },
  { label: 'Bottoms', href: '/?category=bottoms' },
  { label: 'Dresses', href: '/?category=dresses' },
  { label: 'Workout', href: '/?category=workout' },
  { label: 'Outdoors', href: '/?category=outdoors' },
]

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Tallz<span className="text-gray-400">.ca</span>
            </Link>

            <nav className="hidden md:flex items-center gap-5">
              {NAV.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  className="text-sm text-gray-700 hover:text-black"
                >
                  {i.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="text-sm text-gray-700 hover:text-black"
            >
              About
            </Link>
            <Link
              href="/legal/disclosure"
              className="text-sm text-gray-700 hover:text-black"
            >
              Disclosure
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
