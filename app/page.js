import { Suspense } from "react";
import HomeClient from "./home-client.js";
import Microcopy from "@/components/Microcopy";

export default function Page() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      {/* Microcopy explaining curation */}
      <Microcopy className="mb-4">
        All items are selected for tall fit, inseam length, and availability in Canada.
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
