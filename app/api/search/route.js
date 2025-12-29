// app/api/search/route.js

const AMAZON_TAG = "tallzcanada-20";

function norm(v) {
  return (v || "").toString().trim().toLowerCase();
}

function amazonLink(asin) {
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`;
}

// Build once (not on every request)
const PRODUCTS = [
  {
    id: "amz-B07B6GMPHC",
    asin: "B07B6GMPHC",
    title: "Lee Women's Regular Fit Bootcut Jeans",
    brand: "Lee",
    store: "Amazon.ca",
    categories: ["bottoms"],
    genders: ["women"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/61Fej2rPSwL._AC_SY445_SX342_QL70_ML2_.jpg",
    url: amazonLink("B07B6GMPHC"),
    source: "amazon",
  },
  // ... keep the rest of your products unchanged ...
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const category = norm(searchParams.get("category") || "all");
  const q = norm(searchParams.get("q") || "");
  const gender = norm(searchParams.get("gender") || "all");

  let filtered = PRODUCTS;

  // Gender filter
  if (gender && gender !== "all") {
    filtered = filtered.filter((p) => {
      if (!Array.isArray(p.genders)) return true;
      const gs = p.genders.map(norm);
      return gs.includes(gender);
    });
  }

  // Category filter
  if (category && category !== "all") {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.map(norm) : [];
      return cats.includes(category);
    });
  }

  // Keyword filter
  if (q) {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.join(" ") : "";
      const haystack = [p.title, p.brand, p.store, p.asin, p.source, cats]
        .map(norm)
        .join(" ");
      return haystack.includes(q);
    });
  }

  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Static-ish catalog: cache a bit (tune later)
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}
