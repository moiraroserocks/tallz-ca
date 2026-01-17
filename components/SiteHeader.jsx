import Link from "next/link";

export default function SiteHeader({ locale = "en" }) {
  const loc = locale === "fr" ? "fr" : "en";

  // Helper to prefix internal page links with /en or /fr
  const l = (path) => `/${loc}${path === "/" ? "" : path}`;

  // Basic labels (you can expand later into JSON dictionaries)
  const t = {
    tagline: loc === "fr" ? "sélection pensée pour les grandes tailles" : "tailored finds for tall frames",
    explore: loc === "fr" ? "Explorer" : "Explore",
    all: loc === "fr" ? "Tous les produits adaptés" : "All tall-friendly products",
    jeans: loc === "fr" ? "Jeans femmes grandes" : "Tall women jeans",
    pants: loc === "fr" ? "Pantalons femmes grandes" : "Tall women pants",
    workwear: loc === "fr" ? "Tenues de travail femmes grandes" : "Tall women workwear",
    coats: loc === "fr" ? "Manteaux femmes grandes" : "Tall women coats",
    dresses: loc === "fr" ? "Robes femmes grandes" : "Tall women dresses",
    tops: loc === "fr" ? "Hauts femmes grandes" : "Tall women tops",
    workout: loc === "fr" ? "Sport femmes grandes" : "Tall women workout clothes",
    about: loc === "fr" ? "À propos de Tallz" : "About Tallz",
    how: loc === "fr" ? "Comment Tallz fonctionne" : "How Tallz Works",
    brands: loc === "fr" ? "Pour les marques" : "For brands",
    contact: loc === "fr" ? "Contact" : "Be in touch",
    langSwitch: loc === "fr" ? "English" : "Français",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LEFT: logo + brand text */}
        <Link href={l("/")} className="flex items-baseline gap-3">
          <img src="/logo.png" alt="Tallz logo" className="h-8 w-auto" />

          <span className="hidden sm:block text-xs text-neutral-500 tracking-tight relative top-[-6px]">
            {t.tagline}
          </span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Explore dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t.explore}
              <span className="text-xs">▾</span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <nav className="flex flex-col py-2">
                {/* Product pages */}
                <Link
                  href={l("/")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.all}
                </Link>

                <Link
                  href={l("/tall-women-jeans")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.jeans}
                </Link>

                <Link
                  href={l("/tall-women-pants")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.pants}
                </Link>

                <Link
                  href={l("/tall-women-workwear")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.workwear}
                </Link>

                <Link
                  href={l("/tall-women-coats")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.coats}
                </Link>

                <Link
                  href={l("/tall-women-dresses")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.dresses}
                </Link>

                <Link
                  href={l("/tall-women-tops")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.tops}
                </Link>

                <Link
                  href={l("/tall-women-workout")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.workout}
                </Link>

                <div className="my-1 border-t border-neutral-200" />

                {/* Informational pages */}
                <Link
                  href={l("/about")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.about}
                </Link>

                <Link
                  href={l("/how-tallz-works")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.how}
                </Link>

                <Link
                  href={l("/partnerships")}
                  className="px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {t.brands}
                </Link>
              </nav>
            </div>
          </div>

          {/* Language toggle */}
          <Link
            href={loc === "fr" ? "/en" : "/fr"}
            className="text-sm text-neutral-600 hover:text-neutral-900"
            title={t.langSwitch}
          >
            {t.langSwitch}
          </Link>

          {/* Contact button */}
          <Link
            href={l("/contact")}
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:border-neutral-400"
          >
            {t.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
