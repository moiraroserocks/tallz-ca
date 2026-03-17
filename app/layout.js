import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Tallz.ca",
  description: "Tall-friendly clothing in Canada.",
  other: {
    "impact-site-verification": "a0c4b259-1226-42b2-957d-84337afc4912",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-950">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZC2K6TQBC9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZC2K6TQBC9');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}