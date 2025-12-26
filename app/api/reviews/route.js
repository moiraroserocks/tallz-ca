import { sql } from "@vercel/postgres";

/**
 * GET /api/reviews?productId=...
 * Returns average rating, count, and latest reviews
 */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return Response.json(
      { error: "productId required" },
      { status: 400 }
    );
  }

  // Aggregate rating
  const agg = await sql`
    SELECT
      COALESCE(AVG(rating)::numeric(10,2), 0) AS avg_rating,
      COUNT(*)::int AS count
    FROM product_reviews
    WHERE product_id = ${productId}
  `;

  // Latest reviews
  const reviews = await sql`
    SELECT id, rating, comment, created_at
    FROM product_reviews
    WHERE product_id = ${productId}
    ORDER BY created_at DESC
    LIMIT 50
  `;

  return Response.json({
    productId,
    averageRating: Number(agg.rows[0].avg_rating),
    count: agg.rows[0].count,
    reviews: reviews.rows,
  });
}

/**
 * POST /api/reviews
 * Body: { productId, rating, comment }
 */
export async function POST(req) {
  const body = await req.json().catch(() => null);

  const productId = body?.productId;
  const rating = Number(body?.rating);
  const comment = (body?.comment ?? "").toString().trim().slice(0, 500);

  if (!productId || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json(
      { error: "Invalid productId or rating" },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO product_reviews (product_id, rating, comment)
    VALUES (${productId}, ${rating}, ${comment})
  `;

  return new Response(null, { status: 204 });
}

