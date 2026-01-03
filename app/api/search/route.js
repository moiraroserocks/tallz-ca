// app/api/search/route.js
import { query } from "../../../lib/db"; // keep relative unless @ alias is configured

const AMAZON_TAG = "tallzcanada-20";

function norm(v) {
  return (v || "").toString().trim().toLowerCase();
}

function amazonLink(asin) {
  return `https://www.amazon.ca/dp/${asin}?tag=${AMAZON_TAG}`;
}

/**
 * ✅ IMPORTANT:
 * Paste your FULL PRODUCTS array here exactly as it is in your local file,
 * so you keep every single item unchanged.
 *
 * I included what you pasted in chat, but your real file contains more items.
 */
const PRODUCTS = [
  {
    id: "amz-B07B6GMPHC",
    asin: "B07B6GMPHC",
    title: "Lee Women's Regular Fit Bootcut Jeans",
    brand: "Lee",
    store: "Amazon.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/61Fej2rPSwL._AC_SY445_SX342_QL70_ML2_.jpg",
    url: amazonLink("B07B6GMPHC"),
    source: "amazon",
  },
  {
    id: "amz-B0C7MYYS76",
    asin: "B0C7MYYS76",
    title: "Lee Women's Legendary Bootcut Jeans",
    brand: "Lee",
    store: "Amazon.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/61QopScXiwL._AC_SY550_.jpg",
    url: amazonLink("B0C7MYYS76"),
    source: "amazon",
  },
  {
    id: "amz-B01EOX2G8C",
    asin: "B01EOX2G8C",
    title: "Lee Women's Modern Bootcut Jeans",
    brand: "Lee",
    store: "Amazon.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/81UkJtZLMvL._AC_SX342_SY445_QL70_ML2_.jpg",
    url: amazonLink("B01EOX2G8C"),
    source: "amazon",
  },
  {
    id: "amz-B07CSM971H",
    asin: "B07CSM971H",
    title: "Lee Women's Secretly Shapes Straight Leg Jeans",
    brand: "Lee",
    store: "Amazon.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/710AvhgMtDL._AC_SX342_SY445_QL70_ML2_.jpg",
    url: amazonLink("B07CSM971H"),
    source: "amazon",
  },

  {
    id: "amz-B0FS7M9NZ1",
    asin: "B0FS7M9NZ1",
    title: "Crew Neck T-Shirt",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/61WUWYhoV3L._AC_SY550_.jpg",
    url: amazonLink("B0FS7M9NZ1"),
    source: "amazon",
  },
  {
    id: "amz-B0CRRG5D25",
    asin: "B0CRRG5D25",
    title: "Round Neck Buttoned T-Shirt",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/61ShURNh2YL._AC_SY445_SX342_QL70_ML2_.jpg",
    url: amazonLink("B0CRRG5D25"),
    source: "amazon",
  },
  {
    id: "amz-B0CY541HCX",
    asin: "B0CY541HCX",
    title: "Racerback Tops",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops","workout"],
    tall: true,
    image:
      "https://m.media-amazon.com/images/I/81tGYvEZaCL._AC_SX342_SY445_QL70_ML2_.jpg",
    url: amazonLink("B0CY541HCX"),
    source: "amazon",
  },
  {
    id: "amz-B0CJXV6N9Q",
    asin: "B0CJXV6N9Q",
    title: "Linen Short-Sleeve Buttoned Shirt",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/7183tTld--L._AC_SX466_.jpg",
    url: amazonLink("B0CJXV6N9Q"),
    source: "amazon",
  },
  {
    id: "amz-B0CSMP6W73",
    asin: "B0CSMP6W73",
    title: "Striped Buttoned Shirt",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/61aOjjSN36L._AC_SY679_.jpg",
    url: amazonLink("B0CSMP6W73"),
    source: "amazon",
  },
  {
    id: "amz-B07F23Y859",
    asin: "B07F23Y859",
    title: "Lightweight V-Neck Tunic",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/81A1QQNPjkL._AC_SX569_.jpg",
    url: amazonLink("B07F23Y859"),
    source: "amazon",
  },
  {
    id: "amz-B0FCXTWGHR",
    asin: "B0FCXTWGHR",
    title: "Crewneck Raglan Tunic With Thumbholes",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/71M2vcN6JPL._AC_SY741_.jpg",
    url: amazonLink("B0FCXTWGHR"),
    source: "amazon",
  },
  {
    id: "amz-B0CF5DD9J6",
    asin: "B0CF5DD9J6",
    title: "Crewneck Pockets Tunic",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/715Q2OlaN9L._AC_SY606_.jpg",
    url: amazonLink("B0CF5DD9J6"),
    source: "amazon",
  },
  {
    id: "amz-B0BKXPLB26",
    asin: "B0BKXPLB26",
    title: "Crewneck Soft Sweatshirt",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/71eyp8Hz3jL._AC_SY500_.jpg",
    url: amazonLink("B0BKXPLB26"),
    source: "amazon",
  },
  {
    id: "amz-B0FVLWZ5PK",
    asin: "B0FVLWZ5PK",
    title: "V-Neck Sweater",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/71WlbIGW4cL._AC_SY741_.jpg",
    url: amazonLink("B0FVLWZ5PK"),
    source: "amazon",
  },
  {
    id: "amz-B0BJDGZHKL-pack",
    asin: "B0BJDGZHKL",
    title: "Tank Tops 3-Pack",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops","workout"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/71PkY9YrOjL._AC_SX679_.jpg",
    url: amazonLink("B0BJDGZHKL"),
    source: "amazon",
  },
  {
    id: "amz-B0BJDGZHKL-stretch",
    asin: "B0BJDGZHKL",
    title: "Stretchy Tank Tops 3-Pack",
    brand: "Amazon",
    store: "Amazon.ca",
    categories: ["tops","workout"],
    tall: true,
    image: "https://m.media-amazon.com/images/I/71RVqO23OPL._AC_SX679_.jpg",
    url: amazonLink("B0BJDGZHKL"),
    source: "amazon",
  },

  // Non-Amazon examples you pasted
  {
    id: "pcid=1367772560238",
    asin: "7772560238",
    title: "Lace-Trim V-Neck Crepe Maxi Dress",
    brand: "Gap",
    store: "gapcanada.ca",
    categories: ["dresses","workwear"],
    tall: true,
    image: "https://www.gapcanada.ca/webcontent/0060/139/746/cn60139746.jpg",
    url: "https://www.gapcanada.ca/browse/product.do?pid=777256023&vid=2&pcid=13658&cid=13658&nav=meganav%3AFemme%3ACat%C3%A9gories%3ARobes&locale=en_CA#pdp-page-content",
    source: "gap",
  },
  {
    id: "pid=875487013",
    asin: "875487013",
    title: "Poplin Cinched Midi Shirtdress",
    brand: "Gap",
    store: "gapcanada.ca",
    categories: ["dresses","workwear"],
    tall: true,
    image: "https://www.gapcanada.ca/webcontent/0061/217/347/cn61217347.jpg",
    url: "https://www.gapcanada.ca/browse/product.do?pid=875487013&vid=2&pcid=13658&cid=13658&nav=meganav%3AFemme%3ACat%C3%A9gories%3ARobes#pdp-page-content",
    source: "gap",
  },
  {
    id: "pid=843284003",
    asin: "pid=843284003",
    title: "CashSoft Rib Midi Sweater Dress",
    brand: "Gap",
    store: "gapcanada.ca",
    categories: ["dresses","workwear"],
    tall: true,
    image: "https://www.gapcanada.ca/webcontent/0060/565/996/cn60565996.jpg",
    url: "https://www.gapcanada.ca/browse/product.do?pid=843284003&vid=2&pcid=13658&cid=13658&nav=meganav%3AFemme%3ACat%C3%A9gories%3ARobes#pdp-page-content",
    source: "gap",
  },
  {
    id: "pid=7435620333",
    asin: "743562033",
    title: "Cotton Poplin Tuxedo-Front Midi Dress",
    brand: "Banana Republic",
    store: "bananarepublic.gapcanada.ca",
    categories: ["dresses","workwear"],
    tall: true,
    image: "https://bananarepublic.gapcanada.ca/webcontent/0060/015/025/cn60015025.jpg",
    url: "https://bananarepublic.gapcanada.ca/browse/product.do?pid=743562033&vid=2&pcid=69883&cid=69883#pdp-page-content",
    source: "bananarepublic",
  },
  {
    id: "pid=pid=817746013",
    asin: "817746013",
    title: "Stretch-Crepe Flutter-Sleeve Maxi Dress",
    brand: "Banana Republic",
    store: "bananarepublic.gapcanada.ca",
    categories: ["dresses","workwear"],
    tall: true,
    image: "https://bananarepublic.gapcanada.ca/webcontent/0059/754/934/cn59754934.jpg",
    url: "https://bananarepublic.gapcanada.ca/browse/product.do?pid=817746013&vid=2&pcid=69883&cid=69883#pdp-page-content",
    source: "bananarepublic",
  },
  {
    id: "tall-washed-black-high-waist-turn-up-hem-barrel-style-jean",
    title: "Tall Washed Black High Waist Turn Up Hem Barrel Style Jean",
    brand: "PrettyLittleThing",
    store: "prettylittlething.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image: "https://cdn-img.prettylittlething.com/a/7/9/d/a79d3bbd03962e943edc93d1f67b3d57a832a0c6_CNL7130_1_tall_washed_black_high_waist_turn_up_hem_barrel_style_jean.jpg?imwidth=600",
    url: "https://www.prettylittlething.ca/tall-washed-black-high-waist-turn-up-hem-barrel-style-jean.html",
    source: "prettylittlething",
  },
  {
    id: "tall-vintage-washed-mid-rise-wide-leg-jeans",
    title: "Tall Vintage Washed Mid Rise Wide Leg Jeans",
    brand: "PrettyLittleThing",
    store: "prettylittlething.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image: "https://cdn-img.prettylittlething.com/e/a/3/f/ea3f887dfd4308acd0e68169f3efd7ca28f9c709_CNL4596_2_tall_vintage_washed_mid_rise_wide_leg_jeans.jpg?imwidth=600",
    url: "https://www.prettylittlething.ca/tall-vintage-washed-mid-rise-wide-leg-jeans.html",
    source: "prettylittlething",
  },
  {
    id: "tall-stone-tie-waist-trench-coat",
    title: "Tall Stone Tie Waist Trench Coat",
    brand: "PrettyLittleThing",
    store: "prettylittlething.ca",
    categories: ["outdoors","coats"],
    tall: true,
    image: "https://cdn-img.prettylittlething.com/4/0/b/3/40b33a947b973657eeebc50952dfd8def78b7b6b_CNO3230_1_tall_stone_tie_waist_trench_coat.jpg?imwidth=600",
    url: "https://www.prettylittlething.ca/tall-stone-tie-waist-trench-coat.html",
    source: "prettylittlething",
  },
  {
    id: "boohoo-HZZ01421",
    title: "Tall Soft Knit Marl Oversized High Neck Jumper",
    brand: "Boohoo",
    store: "ca.boohoo.com",
    categories: ["tops"],
    tall: true,
    image: "https://mediahub.boohoo.com/hzz01421_grey_xl/female-grey-tall-soft-knit-marl-oversized-high-neck-jumper?w=675&fmt=auto&sm=",
    url: "https://ca.boohoo.com/tall-soft-knit-marl-oversized-high-neck-jumper/HZZ01421.html",
    source: "boohoo",
  },
  {
    id: "boohoo-HZZ38987",
    title: "Tall Snake Print Lace Trim Midaxi Dress",
    brand: "Boohoo",
    store: "ca.boohoo.com",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://mediahub.boohoo.com/hzz38987_stone_xl/female-stone-tall-snake-print-lace-trim-midaxi-dress?w=675&fmt=auto&sm=C",
    url: "https://ca.boohoo.com/tall-snake-print-lace-trim-midaxi-dress/HZZ38987.html",
    source: "boohoo",
  },
  {
    id: "miik-christal-pull-on-pintuck-ankle-pant",
    title: "Christal pull-on pintuck ankle pant",
    brand: "Miik",
    store: "miik.ca",
    categories: ["bottoms","workwear"],
    tall: true,
    image: "https://www.miik.ca/cdn/shop/files/Christal-pull-on-pintuck-dress-pant-black-long-for-women.webp?v=1763670270&width=750",
    url: "https://www.miik.ca/collections/tall-friendly-bottoms/products/christal-pull-on-pintuck-dress-pant?variant=40309668446282",
    source: "miik",
  },
  {
    id: "lululemon-prod9410008",
    title: "lululemon Align™ High-Rise Pant 31",
    brand: "Lululemon",
    store: "shop.lululemon.com",
    categories: ["bottoms","workout"],
    tall: true,
    image: "https://images.lululemon.com/is/image/lululemon/LW5DQPT_063787_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    url: "https://shop.lululemon.com/en-ca/p/womens-leggings/Align-Pant-Tall/_/prod9410008?color=63787",
    source: "lululemon",
  },
  {
    id: "lululemon-prod11720572",
    title: "Swift Mid-Rise Wide-Leg Pant",
    brand: "Lululemon",
    store: "shop.lululemon.com",
    categories: ["bottoms","workout"],
    tall: true,
    image: "https://images.lululemon.com/is/image/lululemon/LW5GX2S_070108_1?wid=1080&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    url: "https://shop.lululemon.com/en-ca/p/women-pants/Swift-Wide-Leg-Mid-Rise-Pant-MD/_/prod11720572?color=70108",
    source: "lululemon",
  },
  {
    id: "pid=8287690033105",
    title: "Low Rise Long & Lean Jeans",
    brand: "Gap",
    store: "gapcanada.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image: "https://www.gapcanada.ca/webcontent/0061/135/714/cn61135714.jpg",
    url: "https://www.gapcanada.ca/browse/product.do?pid=828769003&vid=2&pcid=1026616&cid=1026616#pdp-page-content",
    source: "gap",
  },
    {
    id: "pid=815641003",
    title: "High Rise ’90s Slim Straight Jeans",
    brand: "Gap",
    store: "gapcanada.ca",
    categories: ["bottoms","jeans"],
    tall: true,
    image: "https://www.gapcanada.ca/webcontent/0060/058/319/cn60058319.jpg",
    url: "https://www.gapcanada.ca/browse/product.do?pid=815641003&vid=2&pcid=1026616&cid=1026616#pdp-page-content",
    source: "gap",
  },
    {
    id: "pid=7980270131010",
    title: "High-Waisted Pixie Skinny Ankle Pants",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["bottoms","pants", "workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0060/191/413/cn60191413.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=7980270131010&vid=2&pcid=1185233&cid=1185233&nav=meganav%3AWomen%3A%3A#pdp-page-content",
    source: "oldnavy",
  },
    {
    id: "pid=868001003",
    title: "High-Waisted Taylor Trouser Wide-Leg Pants",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["bottoms","pants", "workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0060/974/082/cn60974082.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=868001003&vid=2&pcid=1185233&cid=1185233&nav=meganav%3AWomen%3A%3A#pdp-page-content",
    source: "oldnavy",
  },
    {
    id: "pid=868068003",
    title: "High-Waisted Pixie Flare Pants",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["bottoms","pants", "workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0060/985/632/cn60985632.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=868068003&vid=2&pcid=1185233&cid=1185233&nav=meganav%3AWomen%3A%3A#pdp-page-content",
    source: "oldnavy",
  },
      {
    id: "pid=798103003",
    title: "High-Waisted Billie Straight Ankle Trouser",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["bottoms","pants", "workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0059/511/280/cn59511280.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=798103003&vid=1&pcid=1185233&cid=1185233&nav=meganav%3AWomen%3A%3A#pdp-page-content",
    source: "oldnavy",
  },
{
    id: "pid=798437003",
    title: "Oversized Button-Down Boyfriend Shirt",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0059/907/041/cn59907041.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=798437003&vid=2&pcid=1185233&cid=1185233#pdp-page-content",
    source: "oldnavy",
  },
{
    id: "pid=802090033",
    title: "Satin Button-Down Shirt",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0060/447/361/cn60447361.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=802090033&vid=2&pcid=1185233&cid=1185233#pdp-page-content",
    source: "oldnavy",
  },
  {
    id: "pid=513768023",
    title: "Classic Button-Down Shirt",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0056/231/587/cn56231587.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=513768023&vid=2&pcid=1185233&cid=1185233#pdp-page-content",
    source: "oldnavy",
  },
    {
    id: "pid=861166003",
    title: "Garter-Knit Cardigan Sweater",
    brand: "Old Navy",
    store: "oldnavy.gapcanada.ca",
    categories: ["tops","workwear"],
    tall: true,
    image: "https://oldnavy.gapcanada.ca/webcontent/0060/803/584/cn60803584.jpg",
    url: "https://oldnavy.gapcanada.ca/browse/product.do?pid=861166003&vid=2&pcid=20408&cid=20408&nav=meganav%3AWomen%3AWomen%E2%80%99s+Tops%3ASweaters+%26+Cardigans#pdp-page-content",
    source: "oldnavy",
  },
    {
    id: "489933",
    title: "Straight-Leg High-Rise Plaid Pants - The Modern Stretch (R) - Tall",
    brand: "Reitmans",
    store: "reitmans.com",
    categories: ["bottoms", "pants","workwear"],
    tall: true,
    image: "https://www.reitmans.com/on/demandware.static/-/Sites-Reitmans-catalog/default/dw626681be/images/xlarge/reitmans_489933_252_0.jpg",
    url: "https://www.reitmans.com/en/straight-leg-high-rise-plaid-pants---the-modern-stretch-%28r%29---tall/489933.html?dwvar_489933_color=Chestnut-&cgid=shop-by-fit-tall",
    source: "reitmans",
  },
      {
    id: "488882",
    title: "Tapered-Leg High-Rise Pants - The Modern Stretch (R) - Tall",
    brand: "Reitmans",
    store: "reitmans.com",
    categories: ["bottoms", "pants","workwear"],
    tall: true,
    image: "https://www.reitmans.com/on/demandware.static/-/Sites-Reitmans-catalog/default/dw2407cc39/images/xlarge/reitmans_488882_1_0.jpg",
    url: "https://www.reitmans.com/en/tapered-leg-high-rise-pants---the-modern-stretch-%28r%29---tall/488882.html?dwvar_488882_color=Black&cgid=shop-by-fit-tall",
    source: "reitmans",
  },
        {
    id: "460407",
    title: "Straight-Leg High-Rise Pant - The Iconic (R) - Tall",
    brand: "Reitmans",
    store: "reitmans.com",
    categories: ["bottoms", "pants","workwear"],
    tall: true,
    image: "https://www.reitmans.com/on/demandware.static/-/Sites-Reitmans-catalog/default/dw1759ab5e/images/xlarge/reitmans_460407_1_0.jpg",
    url: "https://www.reitmans.com/en/straight-leg-high-rise-pant---the-iconic-%28r%29---tall/460407.html?dwvar_460407_color=Black&cgid=shop-by-fit-tall",
    source: "reitmans",
  },
          {
    id: "492890",
    title: "Wide-Leg Mid-Rise Denim Trousers - Tall",
    brand: "Reitmans",
    store: "reitmans.com",
    categories: ["bottoms", "pants","workwear"],
    tall: true,
    image: "https://www.reitmans.com/on/demandware.static/-/Sites-Reitmans-catalog/default/dwf0428f3d/images/xlarge/reitmans_492890_497_0.jpg",
    url: "https://www.reitmans.com/en/wide-leg-mid-rise-denim-trousers---tall/492890.html?dwvar_492890_color=Rinse%20denim&cgid=shop-by-fit-tall",
    source: "reitmans",
  },
  // ✅ Paste the rest of your items below this line (from your local file)
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const rawCategory = norm(searchParams.get("category") || "all");
  const q = norm(searchParams.get("q") || "");

  // ✅ NEW: brands filter (comma-separated)
  const brandsRaw = searchParams.get("brands") || "";
  const brands = brandsRaw ? brandsRaw.split(",").map(norm).filter(Boolean) : [];

  const categoryAliases = {
    all: "all",
    top: "tops",
    tops: "tops",
    bottom: "bottoms",
    bottoms: "bottoms",
    workout: "workout",
  };
  const category = categoryAliases[rawCategory] || rawCategory || "all";

  const includeRatings =
    searchParams.get("includeRatings") === "1" ||
    searchParams.get("includeRatings") === "true";

  let filtered = PRODUCTS;

  // ✅ Category filter
  if (category && category !== "all") {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.map(norm) : [];
      return cats.includes(category);
    });
  }

  // ✅ Brand filter (multi-select)
  if (brands.length > 0) {
    filtered = filtered.filter((p) => brands.includes(norm(p.brand)));
  }

  // ✅ Keyword filter
  if (q) {
    filtered = filtered.filter((p) => {
      const cats = Array.isArray(p.categories) ? p.categories.join(" ") : "";
      const haystack = [p.title, p.brand, p.store, p.asin, p.source, cats]
        .map(norm)
        .join(" ");
      return haystack.includes(q);
    });
  }

  // If no ratings requested, return quickly (cacheable)
  if (!includeRatings || filtered.length === 0) {
    return Response.json(filtered, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
    });
  }

  // Attach ratings/count from DB in one query for all products
  try {
    const ids = filtered.map((p) => p.id);

    const agg = await query(
      `
      SELECT
        product_id,
        COALESCE(AVG(rating), 0) AS avg_rating,
        COUNT(*) AS count
      FROM product_reviews
      WHERE product_id = ANY($1)
      GROUP BY product_id
      `,
      [ids]
    );

    const stats = new Map(
      (agg.rows ?? []).map((r) => [
        r.product_id,
        {
          averageRating: Number(r.avg_rating ?? 0),
          reviewCount: Number(r.count ?? 0),
        },
      ])
    );

    const enriched = filtered.map((p) => {
      const s = stats.get(p.id) || { averageRating: 0, reviewCount: 0 };
      return { ...p, ...s };
    });

    return Response.json(enriched, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("GET /api/search includeRatings error:", err);
    // If DB fails, still return products
    return Response.json(filtered, {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
    });
  }
}
