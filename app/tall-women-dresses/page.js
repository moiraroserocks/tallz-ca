import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Dresses in Canada | Tallz.ca",
  description:
    "Discover tall-friendly dresses for tall women in Canada — better lengths, proper proportions, and curated styles from trusted retailers.",
};

async function getDresses() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=dresses&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenDressesPage() {
  const dresses = await getDresses();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Dresses in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Dresses for tall women often fall too short or sit awkwardly at the waist.
        Tallz.ca curates tall-friendly dresses with better length and proportions,
        making it easier to find styles that flatter tall frames and fit as
        intended.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly dress picks
      </h2>

      {dresses.length === 0 ? (
        <p className="text-gray-700">
          No dresses found yet. Make sure relevant products include{" "}
          <code>categories: ["dresses"]</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dresses.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
