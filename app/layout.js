import './globals.css'


export const metadata = {
title: 'Tallz.ca — Tall women clothing in Canada',
description: 'Find tall‑friendly clothes for women that ship to Canada.'
}


export default function RootLayout({ children }) {
return (
<html lang="en">
<body className="bg-gray-50 text-gray-900">{children}
  <Footer />
  </body>
</html>
)
}
