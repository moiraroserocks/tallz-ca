import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

export const metadata = {
  title: "Tall Women’s Workout Clothes in Canada | Tallz.ca",
  description:
    "Discover tall-friendly workout clothes for tall women in Canada — better lengths, comfortable fits, and curated activewear from trusted retailers.",
};

async function getWorkout() {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/search?category=workout&includeRatings=1`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];
  return await res.json(); // API returns an array
}

export default async function TallWomenWorkoutPage() {
  const workout = await getWorkout();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Tall Women’s Workout Clothes in Canada
      </h1>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-sm text-neutral-600 hover:text-neutral-900"
      >
        ← Back to our full product list
      </Link>

      <p className="mb-6 text-gray-700 leading-relaxed">
        Workout clothes for tall women should move with you — without riding up
        at the ankles, wrists, or torso. Tallz.ca curates tall-friendly activewear
        with better proportions for tall frames, making it easier to find
        comfortable, performance-ready options that ship to Canada.
      </p>

      <h2 className="text-xl font-medium mb-4">
        Our tall-friendly workout picks
      </h2>

      {workout.length === 0 ? (
        <p className="text-gray-700">
          No workout items found yet. Make sure relevant products include{" "}
          <code>categories: ["...","workout"]</code> (or <code>["workout"]</code>).
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workout.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
