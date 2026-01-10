export const metadata = {
  title: "How Tallz.ca Works — Tall Fit Explained",
  description:
    "Learn how Tallz.ca selects tall-friendly clothing for tall women in Canada, why standard brands fail tall fit, how inseam and proportions work, and how to shop tall in Canada.",
};

export default function HowTallzWorksPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-10 text-3xl font-medium tracking-tight">
        How Tall Clothing Is Selected on Tallz.ca
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          Tallz.ca exists to solve a very specific problem: finding clothing that
          truly fits tall women shopping online in Canada.
        </p>

        <p>
          Unlike standard fashion sites or marketplaces, Tallz.ca does not aim to
          list everything available. Each product featured is selected because it
          meets clear tall-fit criteria, with a strong focus on inseam length,
          proportions, and real-world wearability.
        </p>

        <p>Clothing is evaluated based on:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Verified tall inseams appropriate for the category</li>
          <li>
            Proportional fit, including rise, sleeve length, and garment balance
          </li>
          <li>Measurement transparency from the retailer</li>
          <li>Availability and shipping to Canada</li>
          <li>Reliable retailers with clear policies</li>
        </ul>

        <p>
          Items that do not clearly meet tall-specific standards are excluded,
          even if they are widely sold or labeled as “long.” The goal is to reduce
          guesswork and help tall women shop with confidence.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">
          Why Standard Brands Often Fail Tall Women
        </h2>

        <div className="space-y-6 text-base leading-relaxed text-gray-800">
          <p>
            Most mainstream clothing brands design garments using a standard-height
            fit model, typically around 5’5”–5’7”. When “long” or “tall” options
            are offered, adjustments are often minimal or inconsistent.
          </p>

          <p>Common issues include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Inseams that remain too short once worn or washed</li>
            <li>Waistlines and rises that sit incorrectly</li>
            <li>
              Sleeves and pant legs that are lengthened without adjusting
              proportions
            </li>
            <li>Coats and jackets that end at awkward points on the body</li>
          </ul>

          <p>
            Tall fit is not just about adding length. Without proper proportional
            adjustments, garments may technically be longer but still fail to fit
            tall bodies comfortably or correctly.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">
          Understanding Inseam, Rise, and Tall Fit
        </h2>

        <div className="space-y-6 text-base leading-relaxed text-gray-800">
          <p>
            <strong>Inseam</strong> measures the length from the crotch seam to the hem.
            For tall women, this often ranges from <strong>34” to 38”</strong>,
            depending on height, leg length, and footwear.
          </p>

          <p>However, inseam alone does not define a proper tall fit.</p>

          <p>Tall-friendly clothing also accounts for:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li><strong>Rise</strong>, which affects where pants sit on the waist</li>
            <li>Knee and hip placement, especially in structured garments</li>
            <li>Sleeve length and shoulder positioning</li>
            <li>Overall garment proportions, not just added fabric at the hem</li>
          </ul>

          <p>
            Tallz.ca prioritizes products designed with these factors in mind,
            rather than garments that simply extend length without rebalancing the fit.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">
          Shopping Tall Clothing in Canada
        </h2>

        <div className="space-y-6 text-base leading-relaxed text-gray-800">
          <p>
            Shopping for tall clothing in Canada comes with additional challenges:
            limited in-store availability, inconsistent international shipping,
            and unclear sizing information.
          </p>

          <p>
            Tallz.ca focuses specifically on tall clothing options that ship to Canada,
            helping Canadian shoppers avoid international sizing confusion, duties,
            and unreliable returns.
          </p>

          <p>Tallz.ca helps simplify the process by:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Curating tall-friendly clothing that ships to Canada</li>
            <li>Highlighting inseam-appropriate options upfront</li>
            <li>Centralizing tall-compatible products across multiple retailers</li>
            <li>Eliminating ads, clutter, and irrelevant listings</li>
          </ul>

          <p>
            Instead of searching across dozens of sites, tall women can browse knowing
            that each product was selected with height and fit as the primary criteria.
          </p>
        </div>
      </section>

      <p className="mt-16 text-sm text-gray-500">
        Products featured on Tallz.ca are selected based on tall-specific fit criteria,
        measurement transparency, and availability to shoppers in Canada.
      </p>
    </main>
  );
}
