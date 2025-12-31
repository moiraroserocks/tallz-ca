"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

const COLLECTIONS = [
  { label: "All", value: "all" },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Dresses", value: "dresses" },
  { label: "Workout", value: "workout" },
  { label: "Outdoors", value: "outdoors" },
];

function norm(v) {
  return (v || "").toString().trim();
}

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "all";
  const q = searchParams.get("q") || "";

  // ✅ NEW: read selected brands from URL (comma-separated)
  const brandsParam = searchParams.get("brands") || "";

  // Local input state so typing feels instant
  const [qInput, setQInput] = useState(q);

  // ✅ NEW: dropdown state
  const [brandOpen, setBrandOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ NEW: selected brands Set (derived from URL)
  const selectedBrands = useMemo(() => {
    return new Set(
      brandsParam
        .split(",")
        .map((s) => norm(s))
        .filter(Boolean)
    );
  }, [brandsParam]);

  // Keep input in sync if user navigates back/forward
  useEffect(() => {
    setQInput(q);
  }, [q]);

  // ✅ NEW: close dropdown on outside click
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
    router.push(qs ? `/?${qs}` : "/");
  }

  // ✅ NEW: build brand options from loaded products
  const brandOptions = useMemo(() => {
    const m = new Map(); // lower -> display
    for (const p of products) {
      const b = norm(p?.brand);
      if (!b) continue;
      const key = b.toLowerCase();
      if (!m.has(key)) m.set(key, b);
    }
    return Array.from(m.values()).sort((a, b) => a.localeCompare(b));
  }, [products]);

  // ✅ NEW: toggle brand selection and persist to URL
  function toggleBrand(brand) {
    const b = norm(brand);
    if (!b) return;

    const next = new Set(selectedBrands);
    if (next.has(b)) next.delete(b);
    else next.add(b);

    const value = Array.from(next).join(",");
    setParam({ brands: value });
  }

  // ✅ NEW: clear selected brands
  function clearBrands() {
    setParam({ brands: "" });
  }

  // Debounce URL updates while typing
  useEffect(() => {
    const t = setTimeout(() => {
      if ((qInput || "") !== (q || "")) {
        setParam({ q: qInput });
      }
    }, 300);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const sp = new URLSearchParams();

        if (category !== "all") sp.set("category", category);
        if (q.trim()) sp.set("q", q.trim());

        // ✅ includeRatings=1 so cards can show avg+count
        sp.set("includeRatings", "1");

        // ✅ NEW: brands filter (comma-separated)
        if (selectedBrands.size > 0) {
          sp.set("brands", Array.from(selectedBrands).join(","));
        }

        const url = `/api/search?${sp.toString()}`;

        const res = await fetch(url, {
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
  }, [category, q, selectedBrands]); // ✅ NEW dependency

  // ✅ Since the API already filters by category + q + brands, visible === products.
  const visible = useMemo(() => products, [products]);

  const selectedBrandCount = selectedBrands.size;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-10">
      <section className="mb-10">
        {/* Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
            placeholder='Search (e.g., "tunic")'
            className="w-full rounded-full border px-4 py-2.5 text-sm"
          />
        </div>

        {/* Category pills + Brands dropdown */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {COLLECTIONS.map((c) => {
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

          {/* ✅ NEW: Brands dropdown */}
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
              Brands{selectedBrandCount > 0 ? ` (${selectedBrandCount})` : ""} ▾
            </button>

            {brandOpen ? (
              <div className="absolute left-0 z-20 mt-2 w-64 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
                <div className="flex items-center justify-between px-2 py-1">
                  <div className="text-xs font-medium text-neutral-700">
                    Select brands
                  </div>
                  {selectedBrandCount > 0 ? (
                    <button
                      type="button"
                      onClick={clearBrands}
                      className="text-xs text-neutral-500 hover:text-neutral-800 underline-offset-4 hover:underline"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                <div className="max-h-64 overflow-auto px-1 py-1">
                  {brandOptions.length === 0 ? (
                    <div className="px-2 py-2 text-xs text-neutral-500">
                      No brands found.
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
            ) : null}
          </div>
        </div>
      </section>

      {/* Results header */}
      <div className="mb-5 flex flex-col gap-1 text-sm text-neutral-600 sm:flex-row sm:items-center sm:gap-2">
        <div>{loading ? "Loading…" : `Showing ${visible.length} items`}</div>

        {!loading && (
          <div className="text-neutral-500">
            — we&apos;re updating our catalogue often; help us grow it by sending
            us links to your favorite tall-friendly items.
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border border-neutral-200"
            >
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
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
