export const metadata = {
  title: "About Tallz.ca — Why I Created It",
  description:
    "Tallz.ca was created by a tall woman in Canada to make it easier to find tall-friendly clothing that actually fits. Discover the mission and how you can contribute.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-10 text-3xl font-medium tracking-tight">
        Why I Created Tallz.ca
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          I’m a tall woman who has spent hours hunting for clothes that actually
          fit. I often say I wear the clothes I can — not the ones I’d like —
          because the styles I love are rarely available in tall sizes or made
          with tall-friendly proportions.
        </p>

        <p>
          After exchanging shopping tips with other tall women around me, I
          realized this wasn’t just my experience — it’s a shared frustration.
          That’s when the idea for Tallz.ca clicked: we can expand a small
          community of tall-shopping knowledge into a place that helps tall women
          across Canada.
        </p>

        <p>
          Tallz.ca is the result — a simple, curated space where tall women in
          Canada can discover and share tall-friendly clothing options.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">
          Be part of the community
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-gray-800">
          <p>Your suggestions help grow the catalogue and make Tallz.ca better.</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              Email me your favorite tall-friendly brands, stores, or specific
              items using the <strong>Be in touch</strong> button above.
            </li>
            <li>
              Comment on items in the catalogue using the rating and review
              features.
            </li>
            <li>
              Share Tallz.ca with other tall women in your entourage.
            </li>
          </ul>

          <p>
            I sincerely hope Tallz.ca fills a gap and makes shopping for tall
            clothing easier — and more enjoyable — for you.
          </p>

          <p>Looking forward to hearing from you.</p>
        </div>
      </section>
    </main>
  );
}
