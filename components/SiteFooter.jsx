import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-sm font-semibold">
              Tallz<span className="text-neutral-400">.ca</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-neutral-600">
              Tallz.ca earns commissions from qualifying purchases. We don’t sell products—retailers do.
            </p>
          </div>

          <div className="flex gap-8 text-sm">
            <div className="grid gap-2">
              <div className="font-medium">Company</div>
              <Link className="text-neutral-600 hover:text-neutral-900" href="/about">About</Link>
            </div>

            <div className="grid gap-2">
              <div className="font-medium">Legal</div>
              <Link className="text-neutral-600 hover:text-neutral-900" href="/legal/disclosure">Disclosure</Link>
              <Link className="text-neutral-600 hover:text-neutral-900" href="/legal/privacy">Privacy</Link>
              <Link className="text-neutral-600 hover:text-neutral-900" href="/legal/terms">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-neutral-500">
          © {new Date().getFullYear()} Tallz.ca
        </div>
      </div>
    </footer>
  )
}
