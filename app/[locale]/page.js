import { Suspense } from "react";
import HomeClient from "../home-client.js";

export default async function Page({ params }) {
  const { locale } = await params;

  return (
    <main className="mx-auto max-w-7xl px-4">
      <Suspense
        fallback={
          <div className="py-10 text-sm text-neutral-600">
            Loading…
          </div>
        }
      >
        <HomeClient locale={locale} />
      </Suspense>
    </main>
  );
}
