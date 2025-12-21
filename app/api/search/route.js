// app/api/search/route.js

const AMAZON_TAG = 'tallzcanada-20'

function norm(v) {
  return (v || '').toString().trim().toLowerCase()
}

function amazonLink(asin) {
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  const category = norm(searchParams.get('category') || 'all')
  const q = norm(searchParams.get('q') || '')

  const products = [
    {
      id: 'amz-B07B6GMPHC',
      asin: 'B07B6GMPHC',
      title: "Lee Women's Regular Fit Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image:
        'https://m.media-amazon.com/images/I/61Fej2rPSwL._AC_SY445_SX342_QL70_ML2_.jpg',
      url: amazonLink('B07B6GMPHC'),
      source: 'amazon',
    },
    {
      id: 'amz-B0C7MYYS76',
      asin: 'B0C7MYYS76',
      title: "Lee Women's Legendary Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61QopScXiwL._AC_SY550_.jpg',
      url: amazonLink('B0C7MYYS76'),
      source: 'amazon',
    },
    {
      id: 'amz-B01EOX2G8C',
      asin: 'B01EOX2G8C',
      title: "Lee Women's Modern Bootcut Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image:
        'https://m.media-amazon.com/images/I/81UkJtZLMvL._AC_SX342_SY445_QL70_ML2_.jpg',
      url: amazonLink('B01EOX2G8C'),
      source: 'amazon',
    },
    {
      id: 'amz-B07CSM971H',
      asin: 'B07CSM971H',
      title: "Lee Women's Secretly Shapes Straight Leg Jeans",
      brand: 'Lee',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image:
        'https://m.media-amazon.com/images/I/710AvhgMtDL._AC_SX342_SY445_QL70_ML2_.jpg',
      url: amazonLink('B07CSM971H'),
      source: 'amazon',
    },

    {
      id: 'amz-B0FS7M9NZ1',
      asin: 'B0FS7M9NZ1',
      title: 'Crew Neck T-Shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61WUWYhoV3L._AC_SY550_.jpg',
      url: amazonLink('B0FS7M9NZ1'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CRRG5D25',
      asin: 'B0CRRG5D25',
      title: 'Round Neck Buttoned T-Shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image:
        'https://m.media-amazon.com/images/I/61ShURNh2YL._AC_SY445_SX342_QL70_ML2_.jpg',
      url: amazonLink('B0CRRG5D25'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CY541HCX',
      asin: 'B0CY541HCX',
      title: 'Racerback Tops',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops', 'workout'],
      tall: true,
      image:
        'https://m.media-amazon.com/images/I/81tGYvEZaCL._AC_SX342_SY445_QL70_ML2_.jpg',
      url: amazonLink('B0CY541HCX'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CJXV6N9Q',
      asin: 'B0CJXV6N9Q',
      title: 'Linen Short-Sleeve Buttoned Shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/7183tTld--L._AC_SX466_.jpg',
      url: amazonLink('B0CJXV6N9Q'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CSMP6W73',
      asin: 'B0CSMP6W73',
      title: 'Striped Buttoned Shirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61aOjjSN36L._AC_SY679_.jpg',
      url: amazonLink('B0CSMP6W73'),
      source: 'amazon',
    },
    {
      id: 'amz-B07F23Y859',
      asin: 'B07F23Y859',
      title: 'Lightweight V-Neck Tunic',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/81A1QQNPjkL._AC_SX569_.jpg',
      url: amazonLink('B07F23Y859'),
      source: 'amazon',
    },
    {
      id: 'amz-B0FCXTWGHR',
      asin: 'B0FCXTWGHR',
      title: 'Crewneck Raglan Tunic With Thumbholes',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71M2vcN6JPL._AC_SY741_.jpg',
      url: amazonLink('B0FCXTWGHR'),
      source: 'amazon',
    },
    {
      id: 'amz-B0CF5DD9J6',
      asin: 'B0CF5DD9J6',
      title: 'Crewneck Pockets Tunic',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/715Q2OlaN9L._AC_SY606_.jpg',
      url: amazonLink('B0CF5DD9J6'),
      source: 'amazon',
    },
    {
      id: 'amz-B0BKXPLB26',
      asin: 'B0BKXPLB26',
      title: 'Crewneck Soft Sweatshirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71eyp8Hz3jL._AC_SY500_.jpg',
      url: amazonLink('B0BKXPLB26'),
      source: 'amazon',
    },
    {
      id: 'amz-B0FVLWZ5PK',
      asin: 'B0FVLWZ5PK',
      title: 'V-Neck Sweater',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71WlbIGW4cL._AC_SY741_.jpg',
      url: amazonLink('B0FVLWZ5PK'),
      source: 'amazon',
    },
    {
      id: 'amz-B0BJDGZHKL-pack',
      asin: 'B0BJDGZHKL',
      title: 'Tank Tops 3-Pack',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops', 'workout'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71PkY9YrOjL._AC_SX679_.jpg',
      url: amazonLink('B0BJDGZHKL'),
      source: 'amazon',
    },
    {
      id: 'amz-B0B49HSW16',
      asin: 'B0B49HSW16',
      title: 'Crewneck Sweatshirt',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/81G6sI-BmlL._AC_SX569_.jpg',
      url: amazonLink('B0B49HSW16'),
      source: 'amazon',
    },
    {
      // You had the same ASIN twice; keep it once with a unique id
      id: 'amz-B0BJDGZHKL-stretch',
      asin: 'B0BJDGZHKL',
      title: 'Stretchy Tank Tops 3-Pack',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops', 'workout'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71RVqO23OPL._AC_SX679_.jpg',
      url: amazonLink('B0BJDGZHKL'),
      source: 'amazon',
    },
    {
      id: 'amz-B0D629H73T',
      asin: 'B0D629H73T',
      title: 'Swing V-Neck Tunic 3/4 Sleeves',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['tops'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71KzCK5mjVL._AC_SY741_.jpg',
      url: amazonLink('B0D629H73T'),
      source: 'amazon',
    },
    {
      id: 'amz-B0FG2QN2ZV',
      asin: 'B0FG2QN2ZV',
      title: 'Tall Women Stretch Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/6191T920-tL._AC_SY741_.jpg',
      url: amazonLink('B0FG2QN2ZV'),
      source: 'amazon',
    },
    {
      id: 'amz-B0DDTCFXZR',
      asin: 'B0DDTCFXZR',
      title: 'Tall Women Yoga Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/51D8m2LiR0L._AC_SX385_.jpg',
      url: amazonLink('B0DDTCFXZR'),
      source: 'amazon',
    },
    {
      id: 'amz-B0DFM8YLZS',
      asin: 'B0DFM8YLZS',
      title: 'Tall Women Yoga Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/71E9OaYFRcL._AC_SY741_.jpg',
      url: amazonLink('B0DFM8YLZS'),
      source: 'amazon',
    },
    {
      id: 'amz-B0DQ1N8RXL',
      asin: 'B0DQ1N8RXL',
      title: 'Tall Women Lightweight Workout Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61sLpTHt--L._AC_SY741_.jpg',
      url: amazonLink('B0DQ1N8RXL'),
      source: 'amazon',
    },
    {
      id: 'amz-B089SXJ7BV',
      asin: 'B089SXJ7BV',
      title: 'Tall Women Jogger Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61+dtJBOoOL._AC_SX569_.jpg',
      url: amazonLink('B089SXJ7BV'),
      source: 'amazon',
    },
    {
      id: 'amz-B0FG2Q1LPM',
      asin: 'B0FG2Q1LPM',
      title: 'Tall Women Bootcut Dress Pants',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/61W6dRKKFfL._AC_SY741_.jpg',
      url: amazonLink('B0FG2Q1LPM'),
      source: 'amazon',
    },
    {
      id: 'amz-B0DB8JQHB3',
      asin: 'B0DB8JQHB3',
      title: 'Tall Women Mid Waisted Stretchy Loose Jeans',
      brand: 'Amazon',
      store: 'Amazon.ca',
      categories: ['bottoms'],
      tall: true,
      image: 'https://m.media-amazon.com/images/I/812Xsoo9C3L._AC_SY741_.jpg',
      url: amazonLink('B0DB8JQHB3'),
      source: 'amazon',
    },
  ]

  let filtered = products

  // ✅ Category filter (supports multi-category items)
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.map(norm) : []
      return cats.includes(category)
    })
  }

  // ✅ Keyword filter (search title/brand/store/categories/asin/source)
  if (q) {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.join(' ') : ''
      const haystack = [p.title, p.brand, p.store, p.asin, p.source, cats]
        .map(norm)
        .join(' ')
      return haystack.includes(q)
    })
  }

  return Response.json(filtered)
}
