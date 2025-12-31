import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* LEFT: logo + brand text */}
        <Link href="/" className="flex items-baseline gap-3">
          <img
            src="/logo.png"
            alt="Tallz logo"
            className="h-8 w-auto"
          />

          <span className="hidden sm:block text-xs text-neutral-500 tracking-tight relative top-[-6px]">
            tailored finds for tall frames
          </span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Explore dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Explore
              <span className="text-xs">▾</span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <nav className="flex flex-col py-2">

                {/* Product pages */}
                <Link
                  href="/"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  All tall-friendly products
                </Link>

                <Link
                  href="/tall-women-jeans"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Tall women jeans
                </Link>

                <Link
                  href="/tall-women-pants"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Tall women pants
                </Link>

                <Link
                  href="/tall-women-workwear"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Tall women workwear
                </Link>

                <Link
                  href="/tall-women-coats"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Tall women coats
                </Link>

                <div className="my-1 border-t border-neutral-200" />

                {/* Informational pages */}
                <Link
                  href="/about"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  About Tallz
                </Link>

                <Link
                  href="/partnerships"
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  For brands
                </Link>
              </nav>
            </div>
          </div>

          {/* Contact button */}
          <Link
            href="/contact"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:border-neutral-400"
          >
            Be in touch
          </Link>
        </div>

      </div>
    </header>
  );
}
