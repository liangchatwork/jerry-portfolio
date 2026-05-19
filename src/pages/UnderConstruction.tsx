import { Link } from "react-router-dom";
import PageBackground from "../components/PageBackground";

type UnderConstructionProps = {
  title: string;
  subtitle: string;
};

export default function UnderConstruction({
  title,
  subtitle,
}: UnderConstructionProps) {
  const navItems = [
    ["ABOUT", "關於我", "/about"],
    ["RESUME", "履歷", "/resume"],
    ["MUSIC", "音樂", "/music"],
    ["DRAMA", "追劇", "/drama"],
    ["TRAVEL", "旅遊紀錄", "/travel"],
    ["PROJECTS", "專案", "/projects"],
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />
      <section className="relative min-h-screen overflow-hidden px-6 py-6 md:px-10 md:py-8">
        {/* Top Bar */}
        <header className="relative z-20 grid grid-cols-[180px_1fr_180px] items-start animate-nav-fade">
          <Link
            to="/"
            className="text-xs uppercase tracking-[0.32em] text-stone-800 transition hover:text-stone-500"
          >
            <p>A-HSUN JERRY</p>
            <p className="mt-1 text-stone-500">PORTFOLIO / 2026</p>
          </Link>

          <nav className="hidden justify-center gap-12 md:flex">
            {navItems.map(([en, zh, href]) => (
              <Link
                key={en}
                to={href}
                className="group text-center transition hover:text-stone-500"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-stone-900">
                  {en}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.25em] text-stone-500">
                  {zh}
                </p>
              </Link>
            ))}
          </nav>

          <div className="hidden justify-end gap-5 md:flex">
            <a
              href="https://www.youtube.com/@A-HsunJerry"
              target="_blank"
              className="transition hover:opacity-50"
              aria-label="YouTube"
            >
              <img
                src="https://cdn.simpleicons.org/youtube/292524"
                alt="YouTube"
                className="h-[18px] w-[18px]"
              />
            </a>

            <a
              href="mailto:liangchatwork@gmail.com"
              className="transition hover:opacity-50"
              aria-label="Gmail"
            >
              <img
                src="https://cdn.simpleicons.org/gmail/292524"
                alt="Gmail"
                className="h-[18px] w-[18px]"
              />
            </a>

            <a
              href="https://www.instagram.com/hsunjerry_liang"
              target="_blank"
              className="transition hover:opacity-50"
              aria-label="Instagram"
            >
              <img
                src="https://cdn.simpleicons.org/instagram/292524"
                alt="Instagram"
                className="h-[18px] w-[18px]"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/hsunjerry-liang/"
              target="_blank"
              className="transition hover:opacity-50"
              aria-label="LinkedIn"
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg"
                alt="LinkedIn"
                className="h-[18px] w-[18px] opacity-80"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(1100%) hue-rotate(345deg) brightness(92%) contrast(89%)",
                }}
              />
            </a>

            <a
              href="https://github.com/liangchatwork"
              target="_blank"
              className="transition hover:opacity-50"
              aria-label="GitHub"
            >
              <img
                src="https://cdn.simpleicons.org/github/292524"
                alt="GitHub"
                className="h-[18px] w-[18px]"
              />
            </a>
          </div>
        </header>

        {/* Construction Content */}
        <section className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
          <div className="text-center">
            <p className="animate-fade-up text-xs uppercase tracking-[0.5em] text-stone-500">
              {title} / {subtitle}
            </p>

            <h1 className="animate-fade-up delay-100 mt-8 text-8xl font-black tracking-[-0.08em] text-stone-900">
              施工中...
            </h1>

            <p className="animate-fade-up delay-300 mt-8 text-sm uppercase tracking-[0.35em] text-stone-500">
              Coming Soon
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}