export async function GET() {
return Response.json([
{
id: '1',
title: 'High‑rise wide‑leg jeans (Tall)',
store: 'ASOS Tall',
price: 89,
tall: true,
image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
url: 'https://www.asos.com'
},
{
id: '2',
title: 'Long sleeve maxi dress — Tall fit',
store: 'Long Tall Sally',
price: 129,
tall: true,
image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=800',
url: 'https://www.longtallsally.com'
},
{
id: '3',
title: 'Regular blazer (not tall)',
store: 'Zara',
price: 110,
tall: false,
image: 'https://images.unsplash.com/photo-1520974735194-6c8f16c31c0c?w=800',
url: 'https://www.zara.com'
}
])
}
