"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

function norm(v) {
  return (v || "").toString().trim();
}

export default function HomeClient({ locale = "en" }) {
  const loc = locale === "fr" ? "fr" : "en";
  const isFr = loc === "fr";

  const t = {
    // Labels
    brands: isFr ? "Marques" : "Brands",
    selectBrands: isFr ? "Choisir des marques" : "Select brands",
    clear: isFr ? "Effacer" : "Clear",
    noBrands: isFr ? "Aucune marque trouvée." : "No brands found.",

    // Intro / values text
    inclusion: isFr
      ? "Sur Tallz.ca, nous utilisons le terme « grandes femmes » pour décrire plusieurs catégories, car c’est ainsi que ces vêtements sont généralement commercialisés. Cela dit, Tallz.ca s’adresse à toute personne qui trouve ces styles, coupes ou proportions attrayants, indépendamment de son identité de genre."
      : "Throughout Tallz.ca, we use the word “women” reflecting how these garments are typically labeled by brands. At the same time, Tallz.ca is for anyone who finds these styles or proportions appealing, regardless of gender identity.",
    land: isFr
      ? "Tallz.ca est opéré depuis Sherbrooke, sur le territoire traditionnel non cédé du peuple abénaki (Ndakina). Nous reconnaissons la présence continue et le rôle de gardien·ne·s du territoire des peuples autochtones."
      : "Tallz.ca is operated from Sherbrooke, Québec, on the unceded traditional territory of the Abenaki people (Ndakina). We acknowledge the enduring presence and stewardship of Indigenous peoples on this land.",

    // Category pills
    collections: [
      { label: isFr ? "Tout" : "All", value: "all" },
      { label: isFr ? "Hauts" : "Tops", value: "tops" },
      { label: isFr ? "Bas" : "Bottoms", value: "bottoms" },
      { label: isFr ? "Robes" : "Dresses", value: "dresses" },
      { label: isFr ? "Sport" : "Workout", value: "workout" },
      { label: isFr ? "Manteaux" : "Coats", value: "coats" },
      { label: isFr ? "Pour le travail" : "Work", value: "workwear" },
    ],

    // Results header
    loading: isFr ? "Chargement…" : "Loading…",
    showing: (n) => (isFr ? `Affichage de ${n} articles` : `Showing ${n} items`),
    catalogueNote: isFr
      ? "— nous mettons souvent le catalogue à jour; aidez-nous en nous envoyant des liens vers vos items tall-friendly préférés."
      : "— we're updating our catalogue often; help us grow it by sending us links to your favorite tall-friendly items.",
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "all";

  // Brand filtering
  const brandsParam = searchParams.get("brands") || "";
  const [brandOpen, setBrandOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedBrands = useMemo(() => {
    return new Set(
      brandsParam
        .split(",")
        .map((s) => norm(s))
        .filter(Boolean)
    );
  }, [brandsParam]);

  useEffect(() => {
    function onDocClick(e) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setBrandOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function setParam(next) {
    const sp = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === "all") sp.delete(k);
      else sp.set(k, v);
    });
    const qs = sp.toString();
    router.push(qs ? `/${loc}/?${qs}` : `/${loc}`);
  }

  const brandOptions = useMemo(() => {
    const m = new Map();
    for (const p of products) {
      const b = norm(p?.brand);
      if (!b) continue;
      const key = b.toLowerCase();
      if (!m.has(key)) m.set(key, b);
    }
    return Array.from(m.values()).sort((a, b) => a.localeCompare(b));
  }, [products]);

  function toggleBrand(brand) {
    const b = norm(brand);
    if (!b) return;

    const next = new Set(selectedBrands);
    if (next.has(b)) next.delete(b);
    else next.add(b);

    setParam({ brands: Array.from(next).join(",") });
  }

  function clearBrands() {
    setParam({ brands: "" });
  }

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const sp = new URLSearchParams();

        if (category !== "all") sp.set("category", category);
        sp.set("includeRatings", "1");

        if (selectedBrands.size > 0) {
          sp.set("brands", Array.from(selectedBrands).join(","));
        }

        const res = await fetch(`/api/search?${sp.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err?.name !== "AbortError") {
          console.error(err);
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [category, selectedBrands]);

  const visible = useMemo(() => products, [products]);
  const selectedBrandCount = selectedBrands.size;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10">
      <section className="mb-10">
        {/* Intro text */}
        <div className="max-w-3xl text-sm text-neutral-700 leading-relaxed">
          <p>{t.inclusion}</p>
          <p className="mt-3 text-xs text-neutral-500">{t.land}</p>
        </div>

        {/* Category pills + Brands dropdown */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {t.collections.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setParam({ category: c.value })}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  active
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                {c.label}
              </button>
            );
          })}

          {/* Brands dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setBrandOpen((v) => !v)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                selectedBrandCount > 0
                  ? "border-neutral-900 bg-white text-neutral-900"
                  : "border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {t.brands}
              {selectedBrandCount > 0 ? ` (${selectedBrandCount})` : ""} ▾
            </button>

            {brandOpen && (
              <div className="absolute left-0 z-20 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-xs font-medium text-neutral-700">
                    {t.selectBrands}
                  </div>
                  {selectedBrandCount > 0 && (
                    <button
                      type="button"
                      onClick={clearBrands}
                      className="text-xs text-neutral-500 hover:text-neutral-800 underline-offset-4 hover:underline"
                    >
                      {t.clear}
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-auto px-1 py-1">
                  {brandOptions.length === 0 ? (
                    <div className="px-2 py-2 text-xs text-neutral-500">
                      {t.noBrands}
                    </div>
                  ) : (
                    brandOptions.map((b) => (
                      <label
                        key={b}
                        className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-neutral-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.has(b)}
                          onChange={() => toggleBrand(b)}
                        />
                        <span className="text-sm text-neutral-800">{b}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results header */}
      <div className="mb-5 flex flex-col gap-1 text-sm text-neutral-600 sm:flex-row sm:items-center sm:gap-2">
        <div>{loading ? t.loading : t.showing(visible.length)}</div>
        {!loading && <div className="text-neutral-500">{t.catalogueNote}</div>}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-neutral-200">
              <div className="aspect-[4/5] bg-neutral-100" />
              <div className="space-y-2 p-3">
                <div className="h-3 w-24 rounded bg-neutral-100" />
                <div className="h-4 w-40 rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} locale={loc} />
          ))}
        </div>
      )}
    </main>
  );
}
