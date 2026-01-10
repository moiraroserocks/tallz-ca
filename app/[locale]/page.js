import { Suspense } from "react";
import HomeClient from "../home-client.js";
import Microcopy from "../../components/Microcopy";

export default async function Page({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <Microcopy className="mb-4">
        {isFr
          ? "Tous les articles sont sélectionnés pour leur coupe adaptée aux grandes tailles, la longueur d’entrejambe et leur disponibilité au Canada."
          : "All items are selected for tall fit, inseam length, and availability in Canada."}
      </Microcopy>

      <Suspense
        fallback={
          <div className="py-10 text-sm text-neutral-600">
            Loading…
          </div>
        }
      >
        <HomeClient />
      </Suspense>
    </main>
  );
}
