import './globals.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata = {
  title: 'Tallz.ca — Tall-friendly clothing in Canada',
  description: 'Find tall-friendly clothing that ships to Canada.',
  other: {
    'impact-site-verification': 'a0c4b259-1226-42b2-957d-84337afc4912',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-950">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
