import Header from "../components/Header";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";

export default function About() {
  const base = import.meta.env.BASE_URL;

  const sections = [
    {
      label: "PROFILE / 個人簡介",
      title: "哈囉，我是阿昏 Jerry。",
      image: `${base}about-1.jpg`,
      reverse: false,
      paragraphs: [
        "今年 25 歲，畢業於 NCKU CSIE 研究所。",
        "曾於 2025.10 ~ 2026.03 到德國慕尼黑工業大學 TUM 的 Informatics 交換。",
        "目前正在努力成為 Software Engineer，喜歡把想法做成真的作品，也喜歡記錄生活中的片段。",
      ],
    },
    {
      label: "MUSIC / ANIME / DRAMA",
      title: "我呢 ... 本質是宅宅。",
      image: `${base}about-2.jpg`,
      reverse: true,
      paragraphs: [
        "喜歡的音樂風格有 J-pop、動漫歌曲、2000 年代到 2010 年初的華語抒情歌與西洋搖滾。",
        "目前最常聽的歌手是五月天、盧廣仲、周杰倫、綠黃色社會、Official 髭男 dism、結束バンド、Mrs. GREEN APPLE。",
        "最喜歡的動畫有《銀魂》、《海賊王》、《名偵探柯南》、《棒球大聯盟》、《排球少年》、《學園救援團》、《鋼之鍊金術師》、《進擊的巨人》、《刀劍神域》、《ドラえもん》。",
        "近年來喜歡《咒術迴戰》、《JoJo》、《鬼滅之刃》、《Re:0》、《無職轉生》、《このすば》、《碧藍之海》、《孤獨搖滾》、《輝夜姬想讓人告白》、《敗犬女主太多了》。",
        "喜歡的劇有《月薪嬌妻》、《信用詐欺師 JP》、《怪奇物語》、《請回答 1988》。喜歡的電影類型有漫威英雄片、動作片、勵志片、愛情片等等。",
      ],
    },
    {
      label: "OUTDOOR / TRAVEL / NOW",
      title: "另外，我還算是個 Outdoor 咖。",
      image: `${base}about-3.jpg`,
      reverse: false,
      paragraphs: [
        "全台灣跑透透外，日本去過四次，遍及關西、北陸、北海道、九州。",
        "交換半年跑了歐洲 11 國，最喜歡北極、法國、義大利、瑞士。",
        "運動方面喜歡游泳、打羽毛球，也喜歡爬山、潛水、露營等等 Outdoor 運動。",
        "業餘時用力產出旅遊 VLOG，往慢節奏但充實的人生邁進中。",
        "現在單身但想脫單，請大家多多指教！",
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />
      <section className="relative px-4 py-5 sm:px-6 md:px-10 md:py-8">
        {/* Top Bar */}
        <Header />

        {/* Page Title */}
        <section className="mx-auto max-w-7xl pt-16 pb-12 md:pt-24">
          <p className="animate-fade-up text-xs uppercase tracking-[0.45em] text-stone-500">
            ABOUT ME / 關於我
          </p>

          <h1 className="animate-fade-up delay-100 mt-6 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-stone-900 sm:text-6xl md:text-7xl">
            A-Hsun
            <br />
            Jerry
            <br />
          </h1>
        </section>

        {/* Three About Parts */}
        <div className="mx-auto max-w-7xl space-y-24 pb-24 md:space-y-32 md:pb-32">
          {sections.map((section, index) => (
            <section
              key={section.label}
              className={`grid items-center gap-10 md:min-h-[720px] md:gap-16 ${
                section.reverse
                  ? "md:grid-cols-[1.05fr_0.95fr]"
                  : "md:grid-cols-[0.95fr_1.05fr]"
              }`}
            >
              {/* Photo */}
              <div
                className={`animate-image-reveal ${
                  section.reverse ? "md:order-2" : ""
                }`}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-stone-200 shadow-2xl md:rounded-[2rem]">
                  <img
                    src={section.image}
                    alt={section.label}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Text */}
              <div
                className={`animate-fade-up ${
                  section.reverse ? "md:order-1" : ""
                }`}
              >
                <div className="flex items-center gap-5">
                  <span className="text-5xl font-black tracking-[-0.08em] text-stone-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="text-xs uppercase tracking-[0.42em] text-stone-500">
                    {section.label}
                  </p>
                </div>

                <h2 className="mt-7 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-stone-900 md:text-4xl">
                  {section.title}
                </h2>

                <div className="mt-8 max-w-2xl space-y-6 text-[16px] leading-8 tracking-wide text-stone-700 md:mt-10 md:space-y-7 md:text-[18px] md:leading-9">
                  {section.paragraphs.map((text, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="animate-fade-up"
                      style={{
                        animationDelay: `${0.12 * paragraphIndex}s`,
                      }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <Footer />

    </main>
  );
}