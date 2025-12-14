export default function Footer() {
  return (
    <footer className="border-t mt-12 py-6 text-center text-sm text-gray-600">
      <p className="mb-2">
        Tallz.ca earns commissions from qualifying purchases.
      </p>

      <nav className="flex justify-center gap-4 mb-2">
        <a href="/legal/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/legal/terms" className="hover:underline">
          Terms of Service
        </a>
        <a href="/legal/disclosure" className="hover:underline">
          Affiliate Disclosure
        </a>
      </nav>

      <p className="text-xs text-gray-400">
        © {new Date().getFullYear()} Tallz.ca
      </p>
    </footer>
  )
}
