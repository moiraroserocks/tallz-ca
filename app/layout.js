import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Tallz.ca — Tall women clothing in Canada',
  description: 'Find tall-friendly clothing for women that ships to Canada.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
