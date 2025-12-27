import './globals.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

export const metadata = {
  title: 'Tallz.ca — Tall-friendly clothing in Canada',
  description: 'Find tall-friendly clothing that ships to Canada.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Impact verification — must be first meta tag */}
        <meta
          name="impact-site-verification"
          content="a0c4b259-1226-42b2-957d-84337afc4912"
        />

        {/* Standard meta */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body className="min-h-screen bg-white text-neutral-950">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
