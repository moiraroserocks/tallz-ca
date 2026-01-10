import "../globals.css";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export async function generateMetadata({ params }) {
  // Next 15.5: params may be async in dynamic segments
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Tallz.ca — Vêtements adaptés aux grandes tailles au Canada"
      : "Tallz.ca — Tall-friendly clothing in Canada",
    description: isFr
      ? "Trouvez des vêtements adaptés aux grandes tailles qui livrent au Canada."
      : "Find tall-friendly clothing that ships to Canada.",
    other: {
      "impact-site-verification": "a0c4b259-1226-42b2-957d-84337afc4912",
    },
  };
}

export default async function RootLayout({ children, params }) {
  // Next 15.5: params may be async in dynamic segments
  const { locale } = await params;
  const lang = locale === "fr" ? "fr" : "en";

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-white text-neutral-950">
        <SiteHeader locale={lang} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
