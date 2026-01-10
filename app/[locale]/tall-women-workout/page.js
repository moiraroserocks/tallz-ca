import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Vêtements de sport femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Workout Clothes in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des vêtements de sport adaptés aux grandes tailles au Canada — meilleures longueurs, coupes confortables et sélection Tallz.ca."
      : "Discover tall-friendly workout clothes for tall women in Canada — better lengths, comfortable fits, and curated activewear from trusted retailers.",
  };
}

async function getWorkout() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=workout&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenWorkoutPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const workout = await getWorkout();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr
          ? "Vêtements de sport femmes grandes au Canada"
          : "Tall Women’s Workout Clothes in Canada"}
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
          ? "Vêtements de sport pour grandes tailles : longueurs adaptées, maintien, et coupes qui bougent bien."
          : "Workout clothes selected for tall frames: better lengths, support, and movement-friendly fits."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Les vêtements de sport pour grandes femmes devraient bouger avec vous — sans remonter aux chevilles,
            aux poignets ou au niveau du buste. Tallz.ca sélectionne des vêtements d’entraînement adaptés aux
            grandes tailles, avec des proportions mieux pensées pour les silhouettes élancées, afin de vous aider
            à trouver des options confortables et performantes livrées au Canada.
          </>
        ) : (
          <>
            Workout clothes for tall women should move with you — without riding up at the ankles, wrists, or
            torso. Tallz.ca curates tall-friendly activewear with better proportions for tall frames, making it
            easier to find comfortable, performance-ready options that ship to Canada.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections sport adaptées" : "Our tall-friendly workout picks"}
      </h2>

      {workout.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucun article de sport pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["...","workout"]</code> (ou <code>["workout"]</code>).
            </>
          ) : (
            <>
              No workout items found yet. Make sure relevant products include{" "}
              <code>categories: ["...","workout"]</code> (or <code>["workout"]</code>).
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workout.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
