// app/api/search/route.js

const AMAZON_TAG = 'tallzcanada-20'

function amazonLink(asin) {
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`
}

function norm(v) {
  return (v || '').toString().trim().toLowerCase()
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const category = norm(searchParams.get('category') || 'all')
  const q = norm(searchParams.get('q') || '')

  {
  id: 'amz-lee-bootcut-001',
  title: "Lee Women's Regular Fit Bootcut Jeans",
  brand: 'Lee',
  store: 'Amazon.ca',
  category: 'bottoms',
  tall: true,
  image: 'https://m.media-amazon.com/images/I/B07B6GMPHC._AC_UL320_.jpg',
  url: 'https://www.amazon.ca/dp/B07B6GMPHC?tag=tallzcanada-20',
  source: 'amazon'
},

    {
      id: 'amz-tall-leggings-001',
      title: "Women's Active Leggings (Long length)",
      brand: 'Amazon',
      store: 'Amazon.ca',
      category: 'workout',
      price: 29.99,
      tall: true,
      image:
        'https://dummyimage.com/700x875/e5e7eb/111827&text=Amazon+Tall+Leggings',
      url: amazonLink('B0YYYYYYY'),
      source: 'amazon',
    },

    // --- Non-Amazon placeholders (until you have affiliate links) ---
    {
      id: 'gap-tall-top-001',
      title: 'Tall Tunic Top',
      brand: 'Gap',
      store: 'Gap Canada',
      category: 'tops',
      price: 54.0,
      tall: true,
      image: 'https://dummyimage.com/700x875/e5e7eb/111827&text=Gap+Tall+Top',
      url: 'https://www.gapcanada.ca/',
      source: 'retailer',
    },
    {
      id: 'oldnavy-tall-bottom-001',
      title: 'Tall Straight Jeans',
      brand: 'Old Navy',
      store: 'Old Navy Canada',
      category: 'bottoms',
      price: 59.0,
      tall: true,
      image:
        'https://dummyimage.com/700x875/e5e7eb/111827&text=Old+Navy+Tall+Jeans',
      url: 'https://oldnavy.gapcanada.ca/',
      source: 'retailer',
    },
    {
      id: 'lts-dress-001',
      title: 'Tall Maxi Dress',
      brand: 'Long Tall Sally',
      store: 'Long Tall Sally',
      category: 'dresses',
      price: 119.0,
      tall: true,
      image:
        'https://dummyimage.com/700x875/e5e7eb/111827&text=Tall+Maxi+Dress',
      url: 'https://www.longtallsally.com/',
      source: 'retailer',
    },
    {
      id: 'outdoor-shell-001',
      title: 'Outdoor Shell Jacket (Long length)',
      brand: 'Outdoor Brand',
      store: 'Outdoor Brand',
      category: 'outdoors',
      price: 149.0,
      tall: true,
      image:
        'https://dummyimage.com/700x875/e5e7eb/111827&text=Shell+Jacket',
      url: 'https://example.com/',
      source: 'retailer',
    },
  ]

  let filtered = products

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => norm(p.category) === category)
  }

  // Keyword filter (search in title, brand, store, category)
  if (q) {
    filtered = filtered.filter((p) => {
      const haystack = [p.title, p.brand, p.store, p.category, p.source]
        .map(norm)
        .join(' ')
      return haystack.includes(q)
    })
  }

  return Response.json(filtered)
}
