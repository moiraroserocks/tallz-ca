import Link from "next/link"

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* LEFT: logo + brand text */}
        <Link
          href="/"
          className="flex items-baseline gap-3"
        >
          <img
            src="/logo.png"
            alt="Tallz logo"
            className="h-8 w-auto"
          />

          <span className="hidden sm:block text-xs text-neutral-500 tracking-tight relative top-[-3px]">
            tailored finds for tall frames
          </span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <Link
            href="/about"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:border-neutral-400"
          >
            Be in touch
          </Link>
        </div>

      </div>
    </header>
  )
}
