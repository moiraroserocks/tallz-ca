import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Pants in Canada | Tallz.ca",
  description:
    "Discover tall-friendly pants for tall women in Canada — longer inseams, better proportions, and curated picks from trusted retailers.",
};

async function getPants() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=pants&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenPantsPage() {
  const pants = await getPants();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Pants in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Pants that fit tall women well can be hard to find — inseams run short,
        rises sit in the wrong place, and proportions often feel off. Tallz.ca
        curates tall-friendly pants for tall women in Canada, so you can find
        options with longer lengths and a better overall fit.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly pants picks
      </h2>

      {pants.length === 0 ? (
        <p className="text-gray-700">
          No pants found yet. Make sure relevant products include{" "}
          <code>categories: ["...","pants"]</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pants.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
