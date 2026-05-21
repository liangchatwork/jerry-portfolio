import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type NavItem = [string, string, string];

type SocialItem = {
  label: string;
  href: string;
  src?: string;
  icon?: "linkedin";
};

function SocialIcon({
  social,
  light,
  size = 18,
}: {
  social: SocialItem;
  light: boolean;
  size?: number;
}) {
  if (social.icon === "linkedin") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={light ? "fill-white" : "fill-[#292524]"}
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.267 2.371 4.267 5.455v6.288h-.003ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
      </svg>
    );
  }

  return (
    <img
      src={social.src}
      alt={social.label}
      className={light ? "invert" : ""}
      style={{ width: size, height: size }}
    />
  );
}

export default function Header({
  light = false,
  map = false,
}: {
  light?: boolean;
  map?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    ["ABOUT", "關於我", "/about"],
    ["RESUME", "履歷", "/resume"],
    ["TRAVEL", "旅遊紀錄", "/travel"],
    ["MUSIC", "音樂", "/music"],
    ["DRAMA", "追劇", "/drama"],
    ["PROJECTS", "專案", "/projects"],
  ];

  const socials: SocialItem[] = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/@A-HsunJerry",
      src: "https://cdn.simpleicons.org/youtube/292524",
    },
    {
      label: "Gmail",
      href: "mailto:liangchatwork@gmail.com",
      src: "https://cdn.simpleicons.org/gmail/292524",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/hsunjerry_liang",
      src: "https://cdn.simpleicons.org/instagram/292524",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hsunjerry-liang/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/liangchatwork",
      src: "https://cdn.simpleicons.org/github/292524",
    },
  ];

  const textMain = light ? "text-white" : "text-stone-900";
  const textSub = light ? "text-white/70" : "text-stone-500";
  const hover = light ? "hover:text-white/60" : "hover:text-stone-500";

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      <header
        className={`relative z-20 flex items-start justify-between gap-y-5 animate-nav-fade lg:grid lg:grid-cols-[180px_1fr_180px] lg:items-start ${
          map ? "-mx-10 -mt-8 bg-[#dcecf3] px-10 py-8" : ""
        }`}
      >
        <Link
          to="/"
          className={`shrink-0 text-xs uppercase tracking-[0.32em] transition ${textMain} ${hover}`}
        >
          <p>A-HSUN JERRY</p>
          <p className={`mt-1 ${textSub}`}>PORTFOLIO / 2026</p>
        </Link>

        <nav className="hidden justify-center gap-12 lg:flex">
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

        <div className="hidden shrink-0 justify-end gap-4 lg:flex lg:gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="transition hover:opacity-50"
              aria-label={social.label}
            >
              <SocialIcon social={social} light={light} size={18} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] shadow-lg backdrop-blur-xl transition lg:hidden ${
            light
              ? "border-white/45 bg-black/20 text-white hover:bg-black/30"
              : "border-stone-900/15 bg-white/50 text-stone-900 hover:bg-white/70"
          }`}
          aria-label="Open menu"
        >
          Menu
        </button>
      </header>

      <div
        className={`fixed inset-0 z-[100] lg:hidden transition duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu background"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-stone-950/55 backdrop-blur-md"
        />

        <div className="relative z-10 h-full overflow-y-auto px-4 py-5">
          <div
            className={`mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 text-stone-900 shadow-2xl backdrop-blur-2xl transition duration-500 ${
              menuOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-5 scale-95 opacity-0"
            }`}
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.36em] text-stone-500">
                  A-HSUN JERRY
                </p>

                <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.08em] text-stone-950">
                  Menu
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-stone-300/70 bg-white/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-700 shadow-md backdrop-blur-xl"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav className="mt-7 grid grid-cols-2 gap-3">
              {navItems.map(([en, zh, href], index) => (
                <Link
                  key={en}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[1.35rem] border border-white/70 bg-white/55 p-4 shadow-lg backdrop-blur-xl transition active:scale-[0.98]"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <p className="mt-3 text-[16px] font-black uppercase tracking-[0.12em] text-stone-950">
                    {en}
                  </p>

                  <p className="mt-2 text-sm tracking-[0.24em] text-stone-600">
                    {zh}
                  </p>
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-stone-300/70 pt-5">
              <p className="text-[10px] uppercase tracking-[0.34em] text-stone-500">
                Social
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={
                      social.href.startsWith("mailto:") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noreferrer"
                    }
                    className="flex items-center gap-2 rounded-full border border-stone-300/70 bg-white/55 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-800 shadow-md backdrop-blur-xl"
                    aria-label={social.label}
                  >
                    <SocialIcon social={social} light={false} size={14} />
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </div>
    </>
  );
}