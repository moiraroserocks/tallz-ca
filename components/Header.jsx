'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-800 hover:text-gray-900"
    >
      {children}
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [softwareOpen, setSoftwareOpen] = useState(false)
  const menuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) {
        setSoftwareOpen(false)
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div ref={menuRef} className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left: logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-extrabold tracking-tight text-xl">
              Tallz<span className="text-gray-400">.ca</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 ml-6">
              {/* “Software”-style dropdown (like Capterra) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSoftwareOpen(v => !v)}
                  className="text-sm font-medium text-gray-800 hover:text-gray-900 inline-flex items-center gap-1"
                  aria-expanded={softwareOpen}
                >
                  Browse
                  <span className="text-gray-500">▾</span>
                </button>

                {softwareOpen && (
                  <div className="absolute left-0 mt-3 w-[520px] rounded-2xl border bg-white shadow-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link className="p-3 rounded-xl hover:bg-gray-50" href="/?category=tops">
                        <div className="font-semibold">Tops</div>
                        <div className="text-xs text-gray-600">Tunic tops, blouses, sweaters</div>
                      </Link>
                      <Link className="p-3 rounded-xl hover:bg-gray-50" href="/?category=bottoms">
                        <div className="font-semibold">Bottoms</div>
                        <div className="text-xs text-gray-600">Jeans, trousers, leggings</div>
                      </Link>
                      <Link className="p-3 rounded-xl hover:bg-gray-50" href="/?category=workout">
                        <div className="font-semibold">Workout</div>
                        <div className="text-xs text-gray-600">Tall activewear</div>
                      </Link>
                      <Link className="p-3 rounded-xl hover:bg-gray-50" href="/?category=outdoors">
                        <div className="font-semibold">Outdoors</div>
                        <div className="text-xs text-gray-600">Outerwear, layers</div>
                      </Link>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <Link href="/" className="text-sm font-medium hover:underline" onClick={() => setSoftwareOpen(false)}>
                        Browse all
                      </Link>
                      <Link href="/about" className="text-sm text-gray-700 hover:underline" onClick={() => setSoftwareOpen(false)}>
                        About Tallz.ca
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/about">About</NavLink>
              <NavLink href="/legal/disclosure">Disclosure</NavLink>
              <NavLink href="/legal/privacy">Privacy</NavLink>
              <NavLink href="/legal/terms">Terms</NavLink>
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <a
  href="mailto:tallz.ca@proton.me?subject=Tallz.ca%20Inquiry"
  className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full border hover:bg-gray-50"
>
  Be in touch
</a>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border"
              onClick={() => setOpen(v => !v)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="grid gap-2">
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/?category=tops" onClick={() => setOpen(false)}>
                Tops
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/?category=bottoms" onClick={() => setOpen(false)}>
                Bottoms
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/?category=workout" onClick={() => setOpen(false)}>
                Workout
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/?category=outdoors" onClick={() => setOpen(false)}>
                Outdoors
              </Link>

              <div className="h-px bg-gray-200 my-2" />

              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/legal/disclosure" onClick={() => setOpen(false)}>
                Disclosure
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/legal/privacy" onClick={() => setOpen(false)}>
                Privacy
              </Link>
              <Link className="px-3 py-2 rounded-lg hover:bg-gray-50" href="/legal/terms" onClick={() => setOpen(false)}>
                Terms
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
