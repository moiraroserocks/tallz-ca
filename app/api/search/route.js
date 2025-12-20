// app/api/search/route.js

const AMAZON_TAG = 'tallzcanada-20'

function norm(v) {
  return (v || '').toString().trim().toLowerCase()
}

function placeholderImage(label) {
  const text = encodeURIComponent(label)
  return `https://dummyimage.com/700x875/e5e7eb/111827&text=${text}`
}

function amazonCanonical(asin) {
  // Clean, stable, tagged affiliate link
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const category = norm(searchParams.get('category') || 'all')
  const q = norm(searchParams.get('q') || '')

  // ✅ Products from your provided links
  // Notes:
  // - Images are placeholders (PA-API will let us fetch real image/title later).
  // - Categories: Lee jeans are "bottoms". Unknown ASIN-only items are "uncategorized"
  //   so they show on All until you confirm what they are.
  const products = [
    // Lee jeans (from full URLs with /dp/ASIN)
    {
      id: 'amz-B07B6GMPHC',
      asin: 'B07B6GMPHC',
      title: "Lee Women's Regular Fit Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      category: 'bottoms',
      tall: true,
      image: placeholderImage('Lee Bootcut Jeans (B07B6GMPHC)'),
      url: amazonCanonical('B07B6GMPHC'),
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
      image: placeholderImage('Lee Legendary Bootcut (B0C7MYYS76)'),
      url: amazonCanonical('B0C7MYYS76'),
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
      image: placeholderImage('Lee Modern Bootcut (B01EOX2G8C)'),
      url: amazonCanonical('B01EOX2G8C'),
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
      image: placeholderImage('Lee Straight Leg (B07CSM971H)'),
      url: amazonCanonical('B07CSM971H'),
      source: 'amazon',
    },

    // ASIN-only URLs (we can’t safely infer product type without PA-API)
    {
      id: 'amz-B0FS7M9NZ1',
      asin: 'B0FS7M9NZ1',
      title: 'Amazon Item (B0FS7M9NZ1)',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'uncategorized',
      tall: true,
      image: placeholderImage('Amazon Item B0FS7M9NZ1'),
      url: amazonCanonical('B0FS7M9NZ1'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CRRG5D25',
      asin: 'B0CRRG5D25',
      title: 'Amazon Item (B0CRRG5D25)',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'uncategorized',
      tall: true,
      image: placeholderImage('Amazon Item B0CRRG5D25'),
      url: amazonCanonical('B0CRRG5D25'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CY541HCX',
      asin: 'B0CY541HCX',
      title: 'Amazon Item (B0CY541HCX)',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'uncategorized',
      tall: true,
      image: placeholderImage('Amazon Item B0CY541HCX'),
      url: amazonCanonical('B0CY541HCX'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CJXV6N9Q',
      asin: 'B0CJXV6N9Q',
      title: 'Amazon Item (B0CJXV6N9Q)',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'uncategorized',
      tall: true,
      image: placeholderImage('Amazon Item B0CJXV6N9Q'),
      url: amazonCanonical('B0CJXV6N9Q'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CSMP6W73',
      asin: 'B0CSMP6W73',
      title: 'Amazon Item (B0CSMP6W73)',
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'uncategorized',
      tall: true,
      image: placeholderImage('Amazon Item B0CSMP6W73'),
      url: amazonCanonical('B0CSMP6W73'),
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
