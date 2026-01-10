import Link from "next/link";
import ProductCard from "../../../components/ProductCard";
import Microcopy from "../../../components/Microcopy";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "Jeans femmes grandes au Canada | Tallz.ca"
      : "Tall Women’s Jeans in Canada | Tallz.ca",
    description: isFr
      ? "Découvrez des jeans pour femmes grandes livrés au Canada : entrejambes plus longues, coupes adaptées et options tall-friendly sélectionnées."
      : "Discover tall women’s jeans that actually fit. Long inseams, tall-friendly cuts, and trusted retailers shipping to Canada — all curated in one place.",
  };
}

async function getJeans() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=jeans&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json();
}

export default async function TallWomenJeansPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  const jeans = await getJeans();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        {isFr ? "Jeans femmes grandes au Canada" : "Tall Women’s Jeans in Canada"}
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
          ? "Jeans conçus pour les grandes tailles : entrejambe plus longue, meilleure montée et coupes adaptées."
          : "Jeans selected for tall fit: longer inseams, better rise, and tall-friendly cuts."}
      </Microcopy>

      <p className="mb-6 text-gray-700 leading-relaxed">
        {isFr ? (
          <>
            Trouver des jeans qui conviennent aux grandes femmes au Canada est souvent frustrant. Les
            entrejambes standards sont généralement trop courtes, et plusieurs détaillants n’indiquent pas
            clairement les tailles « tall ». Tallz.ca sélectionne des jeans adaptés aux grandes tailles, avec
            des entrejambes plus longues, chez des détaillants fiables qui livrent au Canada — pour vous aider
            à trouver des modèles qui tombent vraiment bien.
          </>
        ) : (
          <>
            Finding jeans that fit tall women in Canada is often frustrating. Standard inseams are usually too
            short, and many retailers don’t clearly label tall sizing. Tallz.ca curates tall-friendly jeans
            with longer inseams from trusted retailers, making it easier to find styles that actually fit.
          </>
        )}
      </p>

      <h2 className="text-xl font-medium mb-4">
        {isFr ? "Nos sélections de jeans adaptés" : "Our tall-friendly jeans picks"}
      </h2>

      {jeans.length === 0 ? (
        <p className="text-gray-700">
          {isFr ? "Aucun jean trouvé pour l’instant." : "No jeans found. (This would indicate a fetch or environment issue.)"}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jeans.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
