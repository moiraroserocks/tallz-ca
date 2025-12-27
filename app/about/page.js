export const metadata = {
  title: "About — Tallz.ca",
  description: "What Tallz is, and why it exists.",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        About Tallz
      </h1>

      <p className="mt-4 text-lg sm:text-xl text-neutral-700 leading-relaxed">
        Tallz is a curated catalogue of clothes that are actually made to fit
        taller bodies — for women and men — and that ship to Canada.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold tracking-tight">Our mission</h2>
          <p className="mt-2 text-neutral-700 leading-relaxed">
            Shopping while tall shouldn’t feel like a compromise. Too short in the sleeves,
            too cropped in the torso, inseams that stop halfway — you know the drill.
            Tallz exists to make “long enough” the default, not the exception.
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            We curate pieces with better proportions for tall frames — longer inseams,
            longer rises, longer sleeves, and sizing that respects height — then keep it
            simple: clean browsing, useful filters, and a catalogue that grows over time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight">How it works</h2>
          <ul className="mt-2 list-disc pl-5 text-neutral-700 space-y-2">
            <li>Browse by category and filter by women/men.</li>
            <li>Click a product to shop on the retailer’s site.</li>
            <li>Leave a rating (and a comment if you want) to help other tall shoppers.</li>
          </ul>
          <p className="mt-3 text-sm text-neutral-500">
            Tallz may earn a small commission from qualifying purchases (at no cost to you).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight">What we’re building</h2>
          <p className="mt-2 text-neutral-700 leading-relaxed">
            A calm, trustworthy place to find well-cut clothes for tall people — and a
            community signal (ratings + comments) that gets smarter as more tall shoppers
            weigh in.
          </p>
        </section>
      </div>
    </main>
  )
}
