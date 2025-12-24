export const metadata = {
  title: 'Contact — Tallz.ca',
  description: 'Get in touch with Tallz.ca',
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">
        Get in touch
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        Brands, retailers, and readers — we’d love to hear from you.
        Use the form below and we’ll get back to you shortly.
      </p>

      <form
        action="https://formspree.io/f/XXXXXXX"
        method="POST"
        className="mt-8 space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Your email"
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
        />

        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
        />

        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Send message
        </button>
      </form>
    </main>
  )
}
