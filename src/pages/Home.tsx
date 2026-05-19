import { Link } from "react-router-dom";

export default function Home() {
    const navItems = [
        ["ABOUT", "關於我", "/about"],
        ["RESUME", "履歷", "/resume"],
        ["MUSIC", "音樂", "/music"],
        ["DRAMA", "追劇", "/drama"],
        ["TRAVEL", "旅遊紀錄", "/travel"],
        ["PROJECTS", "專案", "/projects"],
      ];

    const base = import.meta.env.BASE_URL;
  
    return (
        <main className="min-h-screen min-w-[1280px] bg-[#f4f1ea] text-stone-900">
        <section className="relative min-h-screen overflow-hidden px-6 py-6 md:px-10 md:py-8">
          {/* Top Bar */}
          <header className="relative z-20 grid grid-cols-[180px_1fr_180px] items-start animate-nav-fade">
            {/* Left Brand */}
            <div className="text-xs uppercase tracking-[0.32em] text-stone-800">
              <p>A-HSUN JERRY</p>
              <p className="mt-1 text-stone-500">PORTFOLIO / 2026</p>
            </div>
  
            {/* Center Navigation */}
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
  
            {/* Right Social Icons */}
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
  
          {/* Main Visual */}
          <div className="absolute inset-x-6 bottom-8 top-28 overflow-hidden rounded-[2rem] md:inset-x-10 md:bottom-10 md:top-28 animate-image-reveal delay-100">
            <img
              src={`${base}profile.jpg`}
              alt="Jerry in the mountains"
              className="h-full w-full object-cover object-[center_85%]"
            />
  
            <div className="absolute inset-0 bg-black/10" />
          </div>
  
          {/* Big Title */}
          <div className="relative z-10 flex min-h-[calc(100vh-7rem)] items-end pb-12 pl-8 animate-fade-up delay-300 md:pb-14 md:pl-12 lg:pb-16 lg:pl-16">
            <div>
              <h1 className="text-[14vw] font-black uppercase leading-[0.96] tracking-[-0.025em] text-white sm:text-[12vw] md:text-[8vw] lg:text-[6.6vw]">
                阿昏
                <br />
                Jerry
              </h1>
  
              <p className="mt-5 text-sm uppercase tracking-[0.45em] text-white/85 md:text-base animate-fade-up delay-500">
                A-Hsun Jerry
              </p>
            </div>
          </div>
        </section>
  
        
      </main>
    );
  }