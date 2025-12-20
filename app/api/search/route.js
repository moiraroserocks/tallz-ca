export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const q = (searchParams.get('q') || '').toLowerCase()

  // Replace these with real feeds later
  const products = [
    {
      id: 'gap-tall-tunic-001',
      title: 'Tall Tunic Top',
      brand: 'Gap',
      category: 'tops',
      price: 54,
      tall: true,
      image: 'https://dummyimage.com/700x875/e5e7eb/111827&text=Tall+Tunic+Top',
      url: 'https://www.gapcanada.ca'
    },
    {
      id: 'oldnavy-tall-legging-001',
      title: 'Tall Active Leggings',
      brand: 'Old Navy',
      category: 'workout',
      price: 39,
      tall: true,
      image: 'https://dummyimage.com/700x875/e5e7eb/111827&text=Tall+Leggings',
      url: 'https://oldnavy.gapcanada.ca'
    },
    {
      id: 'lts-dress-001',
      title: 'Tall Maxi Dress',
      brand: 'Long Tall Sally',
      category: 'dresses',
      price: 119,
      tall: true,
      image: 'https://dummyimage.com/700x875/e5e7eb/111827&text=Tall+Maxi+Dress',
      url: 'https://www.longtallsally.com'
    },
    {
      id: 'outdoor-shell-001',
      title: 'Tall Outdoor Shell Jacket',
      brand: 'Outdoor Brand',
      category: 'outdoors',
      price: 149,
      tall: true,
      image: 'https://dummyimage.com/700x875/e5e7eb/111827&text=Shell+Jacket',
      url: 'https://example.com'
    }
  ]

  let filtered = products

  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (q) {
    filtered = filtered.filter((p) =>
      (p.title || '').toLowerCase().includes(q)
    )
  }

  return Response.json(filtered)
}
