export async function GET(request) {
const { searchParams } = new URL(request.url)
const category = searchParams.get('category')


const products = [
{
id: 'gap-tall-tunic-001',
title: 'Tall Tunic Top',
brand: 'Gap',
category: 'tops',
image: 'https://dummyimage.com/400x500/e5e7eb/111827&text=Tall+Tunic+Top',
url: 'https://www.gapcanada.ca',
},
{
id: 'oldnavy-tall-legging-001',
title: 'Tall Active Leggings',
brand: 'Old Navy',
category: 'workout',
image: 'https://dummyimage.com/400x500/e5e7eb/111827&text=Tall+Leggings',
url: 'https://www.oldnavy.ca',
},
]


const filtered = category
? products.filter(p => p.category === category)
: products


return Response.json(filtered)
}
