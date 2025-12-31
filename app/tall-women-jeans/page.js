import ProductCard from "../../components/ProductCard";

export const metadata = {
  title: "Tall Women’s Jeans in Canada | Tallz.ca",
  description:
    "Discover tall women’s jeans that actually fit. Long inseams, tall-friendly cuts, and trusted retailers shipping to Canada — all curated in one place.",
};

async function getProducts() {
  const baseUrl =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

  // includeRatings=1 ensures averageRating/reviewCount are included (if your API supports it)
  const res = await fetch(`${baseUrl}/api/search?includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : data.products || [];
}

export default async function TallWomenJeansPage() {
  const all = await getProducts();

const jeans = all.filter((p) => {
  const cats = Array.isArray(p.categories) ? p.categories : [];
  return cats
    .map((c) => String(c).trim().toLowerCase())
    .includes("jeans");
});

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
          No jeans found. Double-check your catalog items include{" "}
          <code>categories: ["bottoms","jeans"]</code>.
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
