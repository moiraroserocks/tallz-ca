import ProductGrid from "@/components/ProductGrid"; // adjust if your path differs

export const metadata = {
  title: "Tall Women’s Jeans in Canada | Tallz.ca",
  description:
    "Discover tall women’s jeans that actually fit. Long inseams, tall-friendly cuts, and trusted retailers shipping to Canada — all curated in one place.",
};

export default function TallWomenJeansPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* H1 */}
      <h1 className="text-3xl font-semibold mb-4">
        Tall Women’s Jeans in Canada
      </h1>

      {/* Intro text (SEO + trust) */}
      <p className="mb-6 text-gray-700 leading-relaxed">
        Finding jeans that fit tall women in Canada is often frustrating.
        Standard inseams are usually too short, and many retailers don’t clearly
        label tall sizing. Tallz.ca curates tall-friendly jeans with longer
        inseams from trusted retailers, making it easier to find styles that
        actually fit.
      </p>

      {/* Optional supporting heading */}
      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly jeans picks
      </h2>

      {/* Product grid */}
      <ProductGrid category="jeans" />
    </main>
  );
}
