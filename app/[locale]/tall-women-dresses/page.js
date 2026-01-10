import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Robes femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Dresses in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des robes adaptées aux grandes tailles au Canada — meilleures longueurs, taille mieux placée et styles sélectionnés."
      : "Discover tall-friendly dresses for tall women in Canada — better lengths, proper proportions, and curated styles from trusted retailers.",
  };
}

async function getDresses() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=dresses&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenDressesPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const dresses = await getDresses();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Robes femmes grandes au Canada" : "Tall Women’s Dresses in Canada"}
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
          ? "Robes pour grandes tailles : longueurs plus flatteuses, taille mieux placée et proportions harmonieuses."
          : "Dresses curated for tall fit: better lengths, waist placement, and proportions."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Les robes pour grandes femmes sont souvent trop courtes ou tombent de façon étrange à la taille.
            Tallz.ca sélectionne des robes adaptées aux grandes tailles, avec de meilleures longueurs et des
            proportions plus justes, pour vous aider à trouver des modèles qui mettent en valeur les silhouettes
            élancées et tombent comme prévu.
          </>
        ) : (
          <>
            Dresses for tall women often fall too short or sit awkwardly at the waist. Tallz.ca curates
            tall-friendly dresses with better length and proportions, making it easier to find styles that
            flatter tall frames and fit as intended.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections de robes adaptées" : "Our tall-friendly dress picks"}
      </h2>

      {dresses.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucune robe pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["dresses"]</code>.
            </>
          ) : (
            <>
              No dresses found yet. Make sure relevant products include{" "}
              <code>categories: ["dresses"]</code>.
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dresses.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
