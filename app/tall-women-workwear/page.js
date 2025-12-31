import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Workwear in Canada | Tallz.ca",
  description:
    "Discover tall-friendly workwear for tall women in Canada — polished pieces curated from trusted retailers, all in one place.",
};

async function getWorkwear() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=workwear&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenWorkwearPage() {
  const workwear = await getWorkwear();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Workwear in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Finding workwear that fits tall women can be surprisingly hard — sleeves,
        rises, and inseams are often too short, and “one size longer” rarely
        solves it. Tallz.ca curates tall-friendly workwear that’s polished,
        office-ready, and easier to shop from Canadian-friendly retailers.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly workwear picks
      </h2>

      {workwear.length === 0 ? (
        <p className="text-gray-700">
          No workwear items found yet. Make sure relevant products include{" "}
          <code>categories: ["...","workwear"]</code>.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workwear.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
