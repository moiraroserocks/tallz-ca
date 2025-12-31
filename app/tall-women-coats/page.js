import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Coats in Canada | Tallz.ca",
  description:
    "Discover tall-friendly coats for tall women in Canada — longer sleeves, better proportions, and curated picks from trusted retailers.",
};

async function getCoats() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=coats&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenCoatsPage() {
  const coats = await getCoats();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Coats in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        A coat that truly fits a tall frame makes a huge difference — especially
        when sleeves, waist placement, and overall length are proportional.
        Tallz.ca curates tall-friendly coats for tall women in Canada, making it
        easier to find pieces that look polished and feel comfortable.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly coat picks
      </h2>

      {coats.length === 0 ? (
        <p className="text-gray-700">
          No coats found yet. Make sure relevant products include{" "}
          <code>categories: ["...","coats"]</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coats.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
