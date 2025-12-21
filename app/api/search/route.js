// app/api/search/route.js

const AMAZON_TAG = 'tallzcanada-20'

function norm(v) {
  return (v || '').toString().trim().toLowerCase()
}

// Clean, stable, tagged affiliate link
function amazonLink(asin) {
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`
}

// Best-effort image URL without PA-API.
// Works for some ASINs, but not all. We'll add a UI fallback if needed.
function amazonImage(asin, size = 600) {
  return `https://m.media-amazon.com/images/I/${asin}._AC_UL${size}_.jpg`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const category = norm(searchParams.get('category') || 'all')
  const q = norm(searchParams.get('q') || '')

  // ✅ Your products (deduped)
  const products = [
    // Lee jeans (bottoms)
    {
      id: 'amz-B07B6GMPHC',
      asin: 'B07B6GMPHC',
      title: "Lee Women's Regular Fit Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      category: 'bottoms',
      tall: true,
      image: amazonImage('B07B6GMPHC', 600),
      url: amazonLink('B07B6GMPHC'),
      source: 'amazon',
    },
    {
      id: 'amz-B0C7MYYS76',
      asin: 'B0C7MYYS76',
      title: "Lee Women's Legendary Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      category: 'bottoms',
      tall: true,
      image: amazonImage('B0C7MYYS76', 600),
      url: amazonLink('B0C7MYYS76'),
      source: 'amazon',
    },
    {
      id: 'amz-B01EOX2G8C',
      asin: 'B01EOX2G8C',
      title: "Lee Women's Modern Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      category: 'bottoms',
      tall: true,
      image: amazonImage('B01EOX2G8C', 600),
      url: amazonLink('B01EOX2G8C'),
      source: 'amazon',
    },
    {
      id: 'amz-B07CSM971H',
      asin: 'B07CSM971H',
      title: "Lee Women's Secretly Shapes Straight Leg Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      category: 'bottoms',
      tall: true,
      image: amazonImage('B07CSM971H', 600),
      url: amazonLink('B07CSM971H'),
      source: 'amazon',
    },

    // ASIN-only links (category unknown until you confirm)
    {
      id: 'amz-B0FS7M9NZ1',
      asin: 'B0FS7M9NZ1',
      title: 'Crewneck t-shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'Tops',
      tall: true,
      image: amazonImage('B0FS7M9NZ1', 600),
      url: amazonLink('B0FS7M9NZ1'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CRRG5D25',
      asin: 'B0CRRG5D25',
      title: 'Button up round neck t-shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'Tops',
      tall: true,
      image: amazonImage('B0CRRG5D25', 600),
      url: amazonLink('B0CRRG5D25'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CY541HCX',
      asin: 'B0CY541HCX',
      title: 'Cotton Racerback Yoga Tops',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'Tops',
      tall: true,
      image: amazonImage('B0CY541HCX', 600),
      url: amazonLink('B0CY541HCX'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CJXV6N9Q',
      asin: 'B0CJXV6N9Q',
      title: 'Linen short sleeve blouse',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'Tops',
      tall: true,
      image: amazonImage('B0CJXV6N9Q', 600),
      url: amazonLink('B0CJXV6N9Q'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CSMP6W73',
      asin: 'B0CSMP6W73',
      title: 'Striped blouse',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'Top',
      tall: true,
      image: amazonImage('B0CSMP6W73', 600),
      url: amazonLink('B0CSMP6W73'),
      source: 'amazon',
    },
  ]

  let filtered = products

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => norm(p.category) === category)
  }

  // Keyword filter (title/brand/store/category/asin)
  if (q) {
    filtered = filtered.filter((p) => {
      const haystack = [p.title, p.brand, p.store, p.category, p.asin, p.source]
        .map(norm)
        .join(' ')
      return haystack.includes(q)
    })
  }

  return Response.json(filtered)
}
