import "./globals.css";

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
      <body className="min-h-screen bg-white text-neutral-950">{children}</body>
    </html>
  );
}
