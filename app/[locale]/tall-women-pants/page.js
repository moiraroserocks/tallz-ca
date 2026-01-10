import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Pantalons femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Pants in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des pantalons adaptés aux grandes tailles au Canada — entrejambes plus longues, proportions mieux équilibrées et sélection Tallz.ca."
      : "Discover tall-friendly pants for tall women in Canada — longer inseams, better proportions, and curated picks from trusted retailers.",
  };
}

async function getPants() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=pants&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenPantsPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const pants = await getPants();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Pantalons femmes grandes au Canada" : "Tall Women’s Pants in Canada"}
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
          ? "Pantalons adaptés aux grandes tailles : longueurs vérifiées, coupes allongées et options livrées au Canada."
          : "Pants selected for tall frames: verified lengths, elongated cuts, and Canada-available options."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Trouver des pantalons qui conviennent bien aux grandes femmes peut être difficile — entrejambes trop
            courtes, taille qui tombe au mauvais endroit, et proportions souvent déséquilibrées. Tallz.ca
            sélectionne des pantalons adaptés aux grandes tailles livrés au Canada, pour vous aider à trouver des
            options plus longues et mieux coupées.
          </>
        ) : (
          <>
            Pants that fit tall women well can be hard to find — inseams run short, rises sit in the wrong place,
            and proportions often feel off. Tallz.ca curates tall-friendly pants for tall women in Canada, so you
            can find options with longer lengths and a better overall fit.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections de pantalons adaptés" : "Our tall-friendly pants picks"}
      </h2>

      {pants.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucun pantalon pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["...","pants"]</code>.
            </>
          ) : (
            <>
              No pants found yet. Make sure relevant products include{" "}
              <code>categories: ["...","pants"]</code>.
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pants.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
