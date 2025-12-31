import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Jeans in Canada | Tallz.ca",
  description:
    "Discover tall women’s jeans that actually fit. Long inseams, tall-friendly cuts, and trusted retailers shipping to Canada — all curated in one place.",
};

async function getJeans() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=jeans&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenJeansPage() {
  const jeans = await getJeans();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-4">
        Tall Women’s Jeans in Canada
      </h1>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Finding jeans that fit tall women in Canada is often frustrating.
        Standard inseams are usually too short, and many retailers don’t clearly
        label tall sizing. Tallz.ca curates tall-friendly jeans with longer
        inseams from trusted retailers, making it easier to find styles that
        actually fit.
      </p>

      <h2 className="text-xl font-medium mb-4">Our tall-friendly jeans picks</h2>

      {jeans.length === 0 ? (
        <p className="text-gray-700">
          No jeans found. (But your API does return jeans — this would indicate a
          fetch/environment mismatch.)
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jeans.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
