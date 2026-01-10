import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Tenues de travail femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Workwear in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des tenues de travail adaptées aux grandes tailles au Canada — pièces soignées, coupes adaptées et sélection Tallz.ca."
      : "Discover tall-friendly workwear for tall women in Canada — polished pieces curated from trusted retailers, all in one place.",
  };
}

async function getWorkwear() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=workwear&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenWorkwearPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const workwear = await getWorkwear();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Tenues de travail femmes grandes au Canada" : "Tall Women’s Workwear in Canada"}
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
          ? "Tenues de travail pour grandes tailles : coupes professionnelles avec longueurs adaptées (manches/entrejambe)."
          : "Workwear curated for tall fit: professional cuts with better sleeve/inseam lengths."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Trouver des tenues de travail qui conviennent aux grandes femmes peut être étonnamment difficile —
            manches, taille et entrejambe sont souvent trop courtes, et « une taille plus longue » ne règle
            pas toujours le problème. Tallz.ca sélectionne des vêtements de travail adaptés aux grandes tailles,
            soignés et prêts pour le bureau, plus faciles à magasiner auprès de détaillants qui livrent au Canada.
          </>
        ) : (
          <>
            Finding workwear that fits tall women can be surprisingly hard — sleeves, rises, and inseams are often
            too short, and “one size longer” rarely solves it. Tallz.ca curates tall-friendly workwear that’s polished,
            office-ready, and easier to shop from Canadian-friendly retailers.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections travail adaptées" : "Our tall-friendly workwear picks"}
      </h2>

      {workwear.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? (
            <>
              Aucun article de travail pour l’instant. Vérifiez que les produits contiennent{" "}
              <code>categories: ["...","workwear"]</code>.
            </>
          ) : (
            <>
              No workwear items found yet. Make sure relevant products include{" "}
              <code>categories: ["...","workwear"]</code>.
            </>
          )}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workwear.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
