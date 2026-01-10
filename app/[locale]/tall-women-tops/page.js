import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Hauts femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Tops in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des hauts adaptés aux grandes tailles au Canada — manches plus longues, proportions équilibrées et sélection Tallz.ca."
      : "Discover tall-friendly tops for tall women in Canada — better sleeve lengths, proportions that fit tall frames, and curated picks from trusted retailers.",
  };
}

async function getTops() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=tops&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenTopsPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const tops = await getTops();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Hauts femmes grandes au Canada" : "Tall Women’s Tops in Canada"}
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
          ? "Hauts pour grandes tailles : manches plus longues, longueurs de buste adaptées et coupes confortables."
          : "Tops selected for tall fit: longer sleeves, better torso length, and comfortable cuts."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Les hauts pour grandes femmes manquent souvent de longueur au niveau des manches, des épaules ou du
            buste. Tallz.ca sélectionne des hauts adaptés aux grandes tailles, avec des proportions mieux pensées
            pour les silhouettes élancées — pour magasiner plus facilement des styles confortables et soignés.
          </>
        ) : (
          <>
            Tops for tall women often fall short in the sleeves, shoulders, or torso. Tallz.ca curates
            tall-friendly tops with better proportions for tall frames, making it easier to shop styles that fit
            comfortably and look polished.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections de hauts adaptés" : "Our tall-friendly tops picks"}
      </h2>

      {tops.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucun haut pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["tops"]</code>.
            </>
          ) : (
            <>
              No tops found yet. Make sure relevant products include{" "}
              <code>categories: ["tops"]</code>.
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tops.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
