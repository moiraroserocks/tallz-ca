export async function GET(request) {
const { searchParams } = new URL(request.url)
const category = searchParams.get('category')
const keyword = searchParams.get('q')?.toLowerCase()


const products = [
{
id: 'gap-tall-tunic-001',
title: 'Tall Tunic Top',
brand: 'Gap',
category: 'tops',
image: 'https://dummyimage.com/300x400/e5e7eb/111827&text=Tall+Tunic+Top',
url: 'https://www.gapcanada.ca',
},
{
id: 'oldnavy-tall-legging-001',
title: 'Tall Active Leggings',
brand: 'Old Navy',
category: 'workout',
image: 'https://dummyimage.com/300x400/e5e7eb/111827&text=Tall+Leggings',
url: 'https://www.oldnavy.ca',
},
]


let filtered = products


if (category) {
filtered = filtered.filter(p => p.category === category)
}


if (keyword) {
filtered = filtered.filter(p =>
p.title.toLowerCase().includes(keyword)
)
}


return Response.json(filtered)
}
