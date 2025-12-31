import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Tops in Canada | Tallz.ca",
  description:
    "Discover tall-friendly tops for tall women in Canada — better sleeve lengths, proportions that fit tall frames, and curated picks from trusted retailers.",
};

async function getTops() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}/api/search?category=tops&includeRatings=1`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenTopsPage() {
  const tops = await getTops();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Tops in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Tops for tall women often fall short in the sleeves, shoulders, or torso.
        Tallz.ca curates tall-friendly tops with better proportions for tall
        frames, making it easier to shop styles that fit comfortably and look
        polished.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly tops picks
      </h2>

      {tops.length === 0 ? (
        <p className="text-gray-700">
          No tops found yet. Make sure relevant products include{" "}
          <code>categories: ["tops"]</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tops.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
