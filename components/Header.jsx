import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Tallz.ca
        </Link>

        <nav className="flex gap-4 text-sm text-gray-700">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/legal/disclosure" className="hover:underline">
            Disclosure
          </Link>
        </nav>
      </div>
    </header>
  )
}
