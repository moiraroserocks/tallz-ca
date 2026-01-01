export const metadata = {
  title: "About Tallz.ca — Why it was createdd",
  description:
    "Learn the story of Tallz.-ca, why it was created to help tall women in Canada find tall-friendly clothing, and the mission to simplify tall shopping online.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-10 text-3xl font-medium tracking-tight">
        Why creating Tallz.ca
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        <p>
          I'm a tall women who spends hours hunting for clothes that actually fit. I always say I wear the clothes I can, but not the ones I'd like. Because whatever styles I like, I seldom find them in tall sizes or with tall-friendly proportions.
        </p>

        <p>
          I started exchanging shopping tips with other tall women in my entourage, and realized that we can expand our small community to all tall women in Canada. Tallz.ca is the result of that idea — a place where tall women in Canada can find and share tall-friendly clothing options.
        </p>

        <p>Be part of the community:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>Email me your favorite tall-friendly brands and stores or items using the Be in touch button above.  </li>
          <li>
           Comment on the items we have in our catalogue, using the rating and review features.
          </li>
          <li>Talk about Tallz.ca to other tall women in your entourage.</li>
        </ul>

        <p>
          Your suggestions will help me grow the catalogue and make Tallz.ca even more useful for tall women in Canada.
        </p>
         <p>
          I sincerely hope that Tallz.ca will fill a gap and make shopping for tall clothing easier and more enjoyable for you.
        </p>
         <p>
          Looking forward to hearing from you.
        </p>
      </div>

     
    </main>
  );
}
