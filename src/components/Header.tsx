import { Link } from "react-router-dom";

export default function Header({ light = false }: { light?: boolean }) {
  const navItems = [
    ["ABOUT", "關於我", "/about"],
    ["RESUME", "履歷", "/resume"],
    ["MUSIC", "音樂", "/music"],
    ["DRAMA", "追劇", "/drama"],
    ["TRAVEL", "旅遊紀錄", "/travel"],
    ["PROJECTS", "專案", "/projects"],
  ];

  const textMain = light ? "text-white" : "text-stone-900";
  const textSub = light ? "text-white/70" : "text-stone-500";
  const hover = light ? "hover:text-white/60" : "hover:text-stone-500";
  const iconFilter = light ? "invert" : "";

  return (
    <header className="relative z-20 flex flex-wrap items-start justify-between gap-y-5 animate-nav-fade lg:grid lg:grid-cols-[180px_1fr_180px] lg:items-start">
      {/* Left Brand */}
      <Link
        to="/"
        className={`shrink-0 text-xs uppercase tracking-[0.32em] transition ${textMain} ${hover}`}
      >
        <p>A-HSUN JERRY</p>
        <p className={`mt-1 ${textSub}`}>PORTFOLIO / 2026</p>
      </Link>

      {/* Center Navigation */}
      <nav className="order-3 -mx-1 flex w-full gap-8 overflow-x-auto whitespace-nowrap px-1 pb-2 lg:order-none lg:mx-0 lg:w-auto lg:justify-center lg:gap-12 lg:overflow-visible lg:px-0 lg:pb-0">
        {navItems.map(([en, zh, href]) => (
          <Link
            key={en}
            to={href}
            className={`group shrink-0 text-center transition ${hover}`}
          >
            <p className={`text-xs uppercase tracking-[0.35em] ${textMain}`}>
              {en}
            </p>
            <p className={`mt-2 text-[11px] tracking-[0.25em] ${textSub}`}>
              {zh}
            </p>
          </Link>
        ))}
      </nav>

      {/* Right Social Icons */}
      <div className="flex shrink-0 justify-end gap-4 lg:gap-5">
        <a
          href="https://www.youtube.com/@A-HsunJerry"
          target="_blank"
          className="transition hover:opacity-50"
          aria-label="YouTube"
        >
          <img
            src="https://cdn.simpleicons.org/youtube/292524"
            alt="YouTube"
            className={`h-[18px] w-[18px] ${iconFilter}`}
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
            className={`h-[18px] w-[18px] ${iconFilter}`}
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
            className={`h-[18px] w-[18px] ${iconFilter}`}
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
            className={`h-[18px] w-[18px] opacity-80 ${iconFilter}`}
            style={
              light
                ? undefined
                : {
                    filter:
                      "brightness(0) saturate(100%) invert(13%) sepia(8%) saturate(1100%) hue-rotate(345deg) brightness(92%) contrast(89%)",
                  }
            }
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
            className={`h-[18px] w-[18px] ${iconFilter}`}
          />
        </a>
      </div>
    </header>
  );
}