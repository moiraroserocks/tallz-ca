import { query } from "../../../lib/db";

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

  try {
    // Run queries in parallel
    const [agg, reviews] = await Promise.all([
      query(
        `
        SELECT
          COALESCE(AVG(rating), 0) AS avg_rating,
          COUNT(*) AS count
        FROM product_reviews
        WHERE product_id = $1
        `,
        [productId]
      ),
      query(
        `
        SELECT id, rating, comment, created_at
        FROM product_reviews
        WHERE product_id = $1
        ORDER BY created_at DESC
        LIMIT 10
        `,
        [productId]
      ),
    ]);

    return Response.json(
      {
        productId,
        averageRating: Number(agg.rows[0]?.avg_rating ?? 0),
        count: Number(agg.rows[0]?.count ?? 0),
        reviews: reviews.rows ?? [],
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    return Response.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reviews
 * Body: { productId, rating, comment }
 */
export async function POST(req) {
  const body = await req.json().catch(() => null);

  const productId = body?.productId;
  const rating = Number(body?.rating);
  const comment = (body?.comment ?? "")
    .toString()
    .trim()
    .slice(0, 500);

  if (!productId || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return Response.json(
      { error: "Invalid productId or rating" },
      { status: 400 }
    );
  }

  try {
    await query(
      `
      INSERT INTO product_reviews (product_id, rating, comment)
      VALUES ($1, $2, $3)
      `,
      [productId, rating, comment || null]
    );

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    return Response.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
