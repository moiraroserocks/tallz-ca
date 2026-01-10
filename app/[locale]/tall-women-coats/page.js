import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Manteaux femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Coats in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des manteaux adaptés aux grandes tailles au Canada — manches plus longues, proportions équilibrées et sélection Tallz.ca."
      : "Discover tall-friendly coats for tall women in Canada — longer sleeves, better proportions, and curated picks from trusted retailers.",
  };
}

async function getCoats() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=coats&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenCoatsPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const coats = await getCoats();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Manteaux grandes femmes au Canada" : "Tall Women’s Coats in Canada"}
      </h1>

      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        {isFr ? "← Retour à la liste complète" : "← Back to our full product list"}
      </Link>

      {/* Step 1: bilingual microcopy */}
      <Microcopy className="mb-6">
        {isFr
          ? "Manteaux pour grandes tailles : manches plus longues, épaules mieux placées et proportions adaptées."
          : "Coats selected for tall proportions: longer sleeves, better shoulders, and balanced fits."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Un manteau qui convient vraiment à une silhouette grande change tout — surtout lorsque la longueur
            des manches, l’emplacement de la taille et la longueur globale sont bien proportionnés. Tallz.ca
            sélectionne des manteaux adaptés aux grandes tailles livrés au Canada, pour vous aider à trouver
            des pièces élégantes et confortables.
          </>
        ) : (
          <>
            A coat that truly fits a tall frame makes a huge difference — especially when sleeves, waist
            placement, and overall length are proportional. Tallz.ca curates tall-friendly coats for tall women
            in Canada, making it easier to find pieces that look polished and feel comfortable.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections de manteaux adaptés" : "Our tall-friendly coat picks"}
      </h2>

      {coats.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucun manteau pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["...","coats"]</code>.
            </>
          ) : (
            <>
              No coats found yet. Make sure relevant products include{" "}
              <code>categories: ["...","coats"]</code>.
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coats.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
