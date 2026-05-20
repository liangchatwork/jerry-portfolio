import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";

type DramaCategory = "classicAnime" | "recentAnime" | "drama" | "movies";

type DramaItem = {
  title: string;
  originalTitle?: string;
  type: string;
  category: DramaCategory;
  wikiTitle?: string;
  note: string;
  rotate: string;
  offset: string;
  delay: string;
};

const dramaItems: DramaItem[] = [
  {
    title: "銀魂",
    originalTitle: "Gintama",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Gintama",
    note: "萬事屋三人組，永遠的神。新劇場版《吉原大炎上》快去看!!",
    rotate: "-rotate-3",
    offset: "md:translate-y-10",
    delay: "0ms",
  },
  {
    title: "海賊王",
    originalTitle: "One Piece",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "One Piece",
    note: "船長，ONE PIECE應該就在眼前了對吧...",
    rotate: "rotate-2",
    offset: "md:-translate-y-4",
    delay: "80ms",
  },
  {
    title: "名偵探柯南",
    originalTitle: "Detective Conan",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Case Closed",
    note: "73老賊到底是打算什麼時候完結?",
    rotate: "-rotate-1",
    offset: "md:translate-y-14",
    delay: "160ms",
  },
  {
    title: "棒球大聯盟",
    originalTitle: "Major",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Major (manga)",
    note: "啟蒙大谷翔平棒球之路的神作，但他現在已經超越茂野了。XD",
    rotate: "rotate-3",
    offset: "md:translate-y-0",
    delay: "240ms",
  },
  {
    title: "排球少年",
    originalTitle: "Haikyu!!",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Haikyu!!",
    note: "運動番第一，不接受反駁!!!飛吧~!!!",
    rotate: "-rotate-2",
    offset: "md:-translate-y-8",
    delay: "320ms",
  },
  {
    title: "學園救援團",
    originalTitle: "SKET Dance",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Sket Dance",
    note: "SKET團三人組永遠的神，其實我是先看這三位才看銀魂，通通給我去看!!!",
    rotate: "rotate-1",
    offset: "md:translate-y-8",
    delay: "400ms",
  },
  {
    title: "鋼之鍊金術師",
    originalTitle: "Fullmetal Alchemist",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Fullmetal Alchemist",
    note: "唯有愛才是打破等價交換法則的唯一解答。",
    rotate: "-rotate-3",
    offset: "md:-translate-y-2",
    delay: "480ms",
  },
  {
    title: "進擊的巨人",
    originalTitle: "Attack on Titan",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Attack on Titan",
    note: "諫山老師，你的伏筆真的太強，但是看完之後，對於戰爭這件事，果然還是沒有標準答案...",
    rotate: "rotate-2",
    offset: "md:translate-y-12",
    delay: "560ms",
  },
  {
    title: "刀劍神域",
    originalTitle: "Sword Art Online",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Sword Art Online",
    note: "把我拉進二次元的入坑作，聽說要出新劇場版了? C8763!!!",
    rotate: "-rotate-1",
    offset: "md:-translate-y-6",
    delay: "640ms",
  },
  {
    title: "ドラえもん",
    originalTitle: "Doraemon",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Doraemon",
    note: "小哆啦最可愛了。嗚嗚...哆啦A夢，能不能幫我找工作跟女友啦~~~",
    rotate: "rotate-3",
    offset: "md:translate-y-4",
    delay: "720ms",
  },

  {
    title: "咒術迴戰",
    originalTitle: "Jujutsu Kaisen",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Jujutsu Kaisen",
    note: "這坨石經過MAPPA聖手一揮做成動漫後居然變香了，他果然是另類的神作...",
    rotate: "rotate-2",
    offset: "md:-translate-y-4",
    delay: "0ms",
  },
  {
    title: "JoJo",
    originalTitle: "JoJo's Bizarre Adventure",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "JoJo's Bizarre Adventure",
    note: "裁くのは、俺のスタンドだッー！オラオラオラオラ...",
    rotate: "-rotate-3",
    offset: "md:translate-y-10",
    delay: "80ms",
  },
  {
    title: "鬼滅之刃",
    originalTitle: "Demon Slayer",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Demon Slayer: Kimetsu no Yaiba",
    note: "偉災ufotable電銲工，希望無限城篇可以趕快出完!!!",
    rotate: "rotate-1",
    offset: "md:translate-y-2",
    delay: "160ms",
  },
  {
    title: "Re:0",
    originalTitle: "Re:Zero",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Re:Zero − Starting Life in Another World",
    note: "愛486TV...說真的這部的伏筆跟劇情無愧為異世界三幻神。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-8",
    delay: "240ms",
  },
  {
    title: "無職轉生",
    originalTitle: "Mushoku Tensei",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Mushoku Tensei",
    note: "異世界三幻神之認真講自傳給你聽，然後我單推艾莉絲呵呵。",
    rotate: "rotate-3",
    offset: "md:translate-y-14",
    delay: "320ms",
  },
  {
    title: "このすば",
    originalTitle: "KonoSuba",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "KonoSuba",
    note: "異世界三幻神之搞笑之神，不知道為什麼? 近年來從推惠惠跟達克尼絲變成推水之女神了...XD",
    rotate: "-rotate-1",
    offset: "md:translate-y-0",
    delay: "400ms",
  },
  {
    title: "碧藍之海",
    originalTitle: "Grand Blue",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Grand Blue",
    note: "顏藝番之神，是說他的搞笑劇本是真的貼近我們熟知的日常，挺深植人心的。",
    rotate: "rotate-2",
    offset: "md:-translate-y-5",
    delay: "480ms",
  },
  {
    title: "孤獨搖滾",
    originalTitle: "Bocchi the Rock!",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Bocchi the Rock!",
    note: "吉他英雄小波奇與大天使、欠錢學姐、陽光歸去來兮女士的搖滾之路。神!",
    rotate: "-rotate-3",
    offset: "md:translate-y-10",
    delay: "560ms",
  },
  {
    title: "輝夜姬想讓人告白",
    originalTitle: "Kaguya-sama",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Kaguya-sama: Love Is War",
    note: "學園救援團之後，近年來在我心中封神的校園戀愛搞笑神作!!!",
    rotate: "rotate-1",
    offset: "md:-translate-y-2",
    delay: "640ms",
  },
  {
    title: "敗犬女主太多了",
    originalTitle: "Makeine",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Too Many Losing Heroines!",
    note: "近年來最有青春故事感的戀愛搞笑校園番，老八是藍毛的神~!",
    rotate: "-rotate-2",
    offset: "md:translate-y-8",
    delay: "720ms",
  },

  {
    title: "月薪嬌妻",
    originalTitle: "The Full-Time Wife Escapist",
    type: "Drama",
    category: "drama",
    wikiTitle: "The Full-Time Wife Escapist",
    note: "Gakki的森山小姐跟星野桑的津崎先生太甜了，逃恥小夫妻要幸福一輩子啊啊啊。",
    rotate: "-rotate-2",
    offset: "md:translate-y-8",
    delay: "0ms",
  },
  {
    title: "信用詐欺師 JP",
    originalTitle: "The Confidence Man JP",
    type: "Drama",
    category: "drama",
    wikiTitle: "The Confidence Man JP",
    note: "麻醬的喜劇功力真的太強了，附贈百變麻醬變裝秀。",
    rotate: "rotate-2",
    offset: "md:-translate-y-3",
    delay: "120ms",
  },
  {
    title: "怪奇物語",
    originalTitle: "Stranger Things",
    type: "Drama",
    category: "drama",
    wikiTitle: "Stranger Things",
    note: "目前看到第二季還在看，劇情復古且引人入勝。",
    rotate: "-rotate-3",
    offset: "md:translate-y-12",
    delay: "240ms",
  },
  {
    title: "請回答 1988",
    originalTitle: "Reply 1988",
    type: "Drama",
    category: "drama",
    wikiTitle: "Reply 1988",
    note: "住在雙門洞的大家從小到大的成長物語，個人喜歡寶拉姐XDDD。",
    rotate: "rotate-1",
    offset: "md:-translate-y-6",
    delay: "360ms",
  },

  {
    title: "漫威英雄片",
    originalTitle: "Marvel Superhero Movies",
    type: "Movie Type",
    category: "movies",
    wikiTitle: "Marvel Cinematic Universe",
    note: "最近石蠻多的，希望《蜘蛛人嶄新日》跟《復仇者聯盟5 : 毀滅日》別再餵石給我了，雖然我還是照赤，誰叫它是我的青春...",
    rotate: "rotate-2",
    offset: "md:translate-y-5",
    delay: "0ms",
  },
  {
    title: "動作片",
    originalTitle: "Action Movies",
    type: "Movie Type",
    category: "movies",
    wikiTitle: "Action film",
    note: "TOP GUN、F1之類的近年神作，還是挺不錯的。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-4",
    delay: "120ms",
  },
  {
    title: "勵志片",
    originalTitle: "Inspirational Movies",
    type: "Movie Type",
    category: "movies",
    wikiTitle: "Drama film",
    note: "低潮時很適合補一點人生燃料。",
    rotate: "rotate-1",
    offset: "md:translate-y-10",
    delay: "240ms",
  },
  {
    title: "愛情片",
    originalTitle: "Romance Movies",
    type: "Movie Type",
    category: "movies",
    wikiTitle: "Romance film",
    note: "偶爾也需要一點浪漫與情緒價值。",
    rotate: "-rotate-3",
    offset: "md:-translate-y-1",
    delay: "360ms",
  },
];

const categorySections: {
  key: DramaCategory;
  label: string;
  title: string;
  description: string;
}[] = [
  {
    key: "classicAnime",
    label: "Classic Anime",
    title: "爺的童年與青春們...",
    description: "算是長年連載，伴我童年跟青少年動漫入坑時期的一些神作。數字並非排名喔~",
  },
  {
    key: "recentAnime",
    label: "Recent Favorites",
    title: "近年喜歡的動畫",
    description: "近幾年比較常看的作品，戰鬥、異世界、戀愛喜劇、樂團青春都有。",
  },
  {
    key: "drama",
    label: "Drama",
    title: "喜歡的劇",
    description: "日劇、韓劇、美劇都有一點，證明我不是只看動漫...XD。",
  },
  {
    key: "movies",
    label: "Movies",
    title: "喜歡的電影類型",
    description: "不限定單一片單，主要是我平常比較容易被吸引的電影類型。",
  },
];

type WikiSummary = {
  thumbnail?: {
    source?: string;
  };
  originalimage?: {
    source?: string;
  };
};

function DramaCover({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className="aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-stone-200">
      <img
        src={imageUrl}
        alt={`${title} cover`}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}

function DramaCard({
  item,
  imageUrl,
  index,
}: {
  item: DramaItem;
  imageUrl?: string;
  index: number;
}) {
  return (
    <article
      className={`group animate-fade-up ${item.rotate} ${item.offset}`}
      style={{
        animationDelay: item.delay,
      }}
    >
      <div className="relative">
        <div className="absolute -inset-2 rounded-[1.75rem] bg-white/35 blur-xl transition duration-500 group-hover:bg-white/55" />

        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/60 p-2 shadow-2xl backdrop-blur-xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:bg-white/80">
          <DramaCover imageUrl={imageUrl} title={item.title} />

          <div className="px-2 pb-3 pt-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
              {String(index + 1).padStart(2, "0")} / {item.type}
            </p>

            <h2 className="mt-2 text-lg font-black leading-tight tracking-[-0.04em] text-stone-900">
              {item.title}
            </h2>

            {item.originalTitle && (
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                {item.originalTitle}
              </p>
            )}

            <p className="mt-3 text-sm leading-6 text-stone-600">
              {item.note}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Drama() {
  const [imageMap, setImageMap] = useState<Record<string, string>>({});

  const wikiTitles = useMemo(() => {
    return dramaItems
      .map((item) => item.wikiTitle)
      .filter((title): title is string => Boolean(title));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWikiImages() {
      const results = await Promise.allSettled(
        wikiTitles.map(async (wikiTitle) => {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
              wikiTitle
            )}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch Wikipedia summary: ${wikiTitle}`);
          }

          const data = (await response.json()) as WikiSummary;

          return {
            wikiTitle,
            imageUrl: data.thumbnail?.source ?? data.originalimage?.source ?? "",
          };
        })
      );

      if (cancelled) return;

      const nextImageMap: Record<string, string> = {};

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value.imageUrl) {
          nextImageMap[result.value.wikiTitle] = result.value.imageUrl;
        }
      });

      setImageMap(nextImageMap);
    }

    loadWikiImages();

    return () => {
      cancelled = true;
    };
  }, [wikiTitles]);

  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />

      <section className="relative z-10 min-h-screen overflow-hidden px-4 py-5 sm:px-6 md:px-10 md:py-8">
        <Header />

        <section className="mx-auto mt-16 max-w-7xl md:mt-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-xs uppercase tracking-[0.45em] text-stone-500">
              Drama / Anime / Movies
            </p>

            <h1 className="animate-fade-up delay-100 mt-6 text-5xl font-black leading-none tracking-[-0.08em] text-stone-900 md:text-7xl">
              最近與從前喜歡的作品
            </h1>

            <p className="animate-fade-up delay-200 mt-7 max-w-2xl text-base leading-8 tracking-wide text-stone-600 md:text-lg">
              這裡先整理一些動畫、劇集與電影類型。圖片會優先從 Wikipedia
              自動抓縮圖，抓不到就保留文字卡，不硬放。
            </p>
          </div>

          <div className="mt-16 space-y-24 md:mt-20">
            {categorySections.map((section) => {
              const sectionItems = dramaItems.filter(
                (item) => item.category === section.key
              );

              return (
                <section key={section.key}>
                  <div className="mb-10 max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                      {section.label}
                    </p>

                    <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-stone-900 md:text-5xl">
                      {section.title}
                    </h2>

                    <p className="mt-5 text-sm leading-7 tracking-wide text-stone-600 md:text-base md:leading-8">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-7 md:gap-y-16 lg:grid-cols-5">
                    {sectionItems.map((item, index) => (
                      <DramaCard
                        key={item.title}
                        item={item}
                        index={index}
                        imageUrl={
                          item.wikiTitle ? imageMap[item.wikiTitle] : undefined
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}