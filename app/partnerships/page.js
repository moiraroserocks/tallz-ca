export const metadata = {
  title: "Partnerships — Tallz.ca",
  description:
    "Partner with Tallz.ca to reach tall women in Canada through editorial, fit-focused product discovery.",
};

export default function PartnershipsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Partner with Tallz.ca
      </h1>

      <p className="mt-6 text-base leading-7 text-zinc-700">
        Tallz.ca is a Canadian-based content and product discovery platform
        dedicated to tall women (5’9” and above). We help an underserved
        audience find clothing and products that truly fit by combining original
        editorial content, fit guidance, and curated recommendations from
        relevant brands.
      </p>

      <p className="mt-4 text-base leading-7 text-zinc-700">
        Our focus is long-term usefulness, trust, and representation — not
        mass-market promotion.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Audience overview</h2>
        <ul className="mt-4 list-disc pl-6 text-base leading-7 text-zinc-700">
          <li>Primary audience: Tall women (5’9”+)</li>
          <li>Geography: Canada</li>
          <li>Age range: 25–45</li>
          <li>
            Interests: Fit &amp; sizing, fashion, online shopping, body
            confidence, inclusive brands
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Our partnership approach
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          Tallz.ca works with brands through editorial product features,
          fit-focused comparisons and recommendations, and brand inclusion in
          relevant guides and sizing resources.
        </p>

        <p className="mt-4 text-base leading-7 text-zinc-700">We prioritize:</p>
        <ul className="mt-3 list-disc pl-6 text-base leading-7 text-zinc-700">
          <li>Tall-specific or extended sizing</li>
          <li>Clear sizing information</li>
          <li>Quality and consistency of fit</li>
          <li>Brands that ship to Canada</li>
        </ul>

        <p className="mt-4 text-base leading-7 text-zinc-700">
          All brand mentions are contextually relevant and integrated into
          informational content — never forced placements.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Affiliate disclosure &amp; compliance
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-700">
          Tallz.ca participates in affiliate programs including AWIN, Amazon
          Associates, and other major networks. Affiliate relationships are
          clearly disclosed and all content remains editorial and informational.
        </p>

        <ul className="mt-4 list-disc pl-6 text-base leading-7 text-zinc-700">
          <li>No incentivized traffic</li>
          <li>No coupon scraping</li>
          <li>No misleading practices</li>
          <li>No toolbars, extensions, or pop-ups</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Interested in partnering?
        </h2>
        <p className="mt-3 text-base leading-7 text-zinc-700">
          We welcome partnerships with brands that serve tall women and value
          fit, quality, and inclusivity.
        </p>

        <div className="mt-5 flex flex-col gap-2 text-base text-zinc-800">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:partnerships@tallz.ca"
            >
              partnerships@tallz.ca
            </a>
          </p>
          <p>
            <span className="font-medium">Website:</span>{" "}
            <a
              className="underline underline-offset-4"
              href="https://tallz.ca"
              target="_blank"
              rel="noreferrer"
            >
              https://tallz.ca
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
