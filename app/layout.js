import './globals.css'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Tallz.ca — Tall women clothing in Canada',
  description: 'Find tall-friendly clothing for women that ships to Canada.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
