export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return {
    title: isFr
      ? "À propos de Tallz.ca — Pourquoi je l’ai créé"
      : "About Tallz.ca — Why I Created It",
    description: isFr
      ? "Tallz.ca a été créé par une grande femma située au Canada pour faciliter la recherche de vêtements adaptés aux grandes tailles. Découvrez la mission et comment contribuer."
      : "Tallz.ca was created by a tall woman in Canada to make it easier to find tall-friendly clothing that actually fits. Discover the mission and how you can contribute.",
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-10 text-3xl font-medium tracking-tight">
        {isFr ? "Pourquoi j’ai créé Tallz.ca" : "Why I Created Tallz.ca"}
      </h1>

      <div className="space-y-6 text-base leading-relaxed text-gray-800">
        {isFr ? (
          <>
            <p>
              Je suis grande et j’ai passé des heures à chercher des vêtements qui me font réellement.
              Je dis souvent que je porte les vêtements que je peux — pas ceux que j’aimerais — parce que les
              styles que j’aime sont rarement offerts en tailles « tall » ou avec des proportions adaptées.
            </p>

            <p>
              Après avoir échangé des astuces de magasinage avec d’autres autour de moi, j’ai
              réalisé que ce problème était partagé. J'ai donc voulu agrandir notre petit cercle en communauté afin qu'on puisse s'aider 
              à trouver des vêtements appropriés de partout au Canada.
            </p>

            <p>
              Tallz.ca est le résultat : un espace où les grandes femmes peuvent
              découvrir et partager des options de vêtements vraiment adaptées disponibles au Canada.
            </p>
          </>
        ) : (
          <>
            <p>
              I’m a tall woman who has spent hours hunting for clothes that actually fit. I often say I wear the
              clothes I can — not the ones I’d like — because the styles I love are rarely available in tall
              sizes or made with tall-friendly proportions.
            </p>

            <p>
              After exchanging shopping tips with other tall women around me, I realized this wasn’t just my
              experience — it’s a shared frustration. That’s when the idea for Tallz.ca clicked: we can expand a
              small community of tall-shopping knowledge into a place that helps tall women across Canada.
            </p>

            <p>
              Tallz.ca is the result — a simple, curated space where tall women in Canada can discover and share
              tall-friendly clothing options.
            </p>
          </>
        )}
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-medium tracking-tight">
          {isFr ? "Faire partie de la communauté" : "Be part of the community"}
        </h2>

        <div className="space-y-4 text-base leading-relaxed text-gray-800">
          <p>
            {isFr
              ? "Vos suggestions aident à faire grandir le catalogue et à améliorer Tallz.ca."
              : "Your suggestions help grow the catalogue and make Tallz.ca better."}
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              {isFr ? (
                <>
                  Envoyez-moi vos marques, boutiques ou items préférés via le bouton{" "}
                  <strong>Contact</strong> en haut.
                </>
              ) : (
                <>
                  Email me your favorite tall-friendly brands, stores, or specific items using the{" "}
                  <strong>Be in touch</strong> button above.
                </>
              )}
            </li>
            <li>
              {isFr
                ? "Laissez une note et un avis sur les items du catalogue."
                : "Comment on items in the catalogue using the rating and review features."}
            </li>
            <li>
              {isFr
                ? "Partagez la page Tallz.ca avec d’autres grandes femmes dans votre entourage."
                : "Share Tallz.ca with other tall women in your entourage."}
            </li>
          </ul>

          <p>
            {isFr ? (
              <>
                J’espère sincèrement que Tallz.ca facilitera le magasinage pour grandes 
                 et le rendra plus agréable.
              </>
            ) : (
              <>
                I sincerely hope Tallz.ca makes shopping for tall clothing easier — and more
                enjoyable — for you.
              </>
            )}
          </p>

          <p>{isFr ? "Au plaisir de vous lire." : "Looking forward to hearing from you."}</p>
        </div>
      </section>
    </main>
  );
}
