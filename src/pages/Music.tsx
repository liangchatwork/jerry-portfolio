import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageBackground from "../components/PageBackground";

type MusicArtist = {
  name: string;
  displayName?: string;
  spotifyUrl: string;
  note: string;
  rotate: string;
  offset: string;
  delay: string;
};

const artists: MusicArtist[] = [
  {
    name: "五月天",
    displayName: "Mayday",
    spotifyUrl: "https://open.spotify.com/artist/16s0YTFcyjP4kgFwt7ktrY",
    note: "萬年不變的五迷。",
    rotate: "-rotate-3",
    offset: "md:translate-y-8",
    delay: "0ms",
  },
  {
    name: "盧廣仲",
    displayName: "Crowd Lu",
    spotifyUrl: "https://open.spotify.com/artist/2JBUyLiFvpFPWdZGqIGYLD",
    note: "Accoustic吉他的神，但我都搶不到票QQ。",
    rotate: "rotate-2",
    offset: "md:-translate-y-4",
    delay: "120ms",
  },
  {
    name: "周杰倫",
    displayName: "Jay Chou",
    spotifyUrl: "https://open.spotify.com/artist/2elBjNSdBE2Y3f0j1mjrql",
    note: "我青春時代的眼淚。",
    rotate: "-rotate-1",
    offset: "md:translate-y-14",
    delay: "240ms",
  },
  {
    name: "緑黄色社会",
    displayName: "Ryokuoushoku Shakai",
    spotifyUrl: "https://open.spotify.com/artist/4SJ7qRgJYNXB9Yttzs4aSa",
    note: "單推多年的日團，但去年去交換沒跟到亞洲巡迴，可惡...QQ",
    rotate: "rotate-3",
    offset: "md:translate-y-0",
    delay: "360ms",
  },
  {
    name: "Official 髭男 dism",
    displayName: "OFFICIAL HIGE DANDISM",
    spotifyUrl: "https://open.spotify.com/artist/5Vo1hnCRmCM6M4thZCInCj",
    note: "主唱大大高音太強，神曲輩出。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-8",
    delay: "480ms",
  },
  {
    name: "結束バンド",
    displayName: "Kessoku Band",
    spotifyUrl: "https://open.spotify.com/artist/2nvl0N9GwyX69RRBMEZ4OD",
    note: "193姐姐Vocal太讚，更不用說Yoppi，根本快要遍吉他英雄了吧?",
    rotate: "rotate-1",
    offset: "md:translate-y-10",
    delay: "600ms",
  },
  {
    name: "Mrs. GREEN APPLE",
    displayName: "Mrs. GREEN APPLE",
    spotifyUrl: "https://open.spotify.com/artist/4QvgGvpgzgyUOo8Yp8LDm9",
    note: "大森老師牛逼，從Ao to Natsu聽到現在的lulu。",
    rotate: "-rotate-3",
    offset: "md:-translate-y-2",
    delay: "720ms",
  },
];

type SpotifyOEmbedResponse = {
  title?: string;
  thumbnail_url?: string;
};

function SpotifyCover({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  if (!imageUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-stone-900 text-white">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">
            Spotify
          </p>
          <p className="mt-3 text-2xl font-black tracking-[-0.06em]">
            {title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`${title} Spotify cover`}
      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
      loading="lazy"
    />
  );
}

export default function Music() {
  const [coverMap, setCoverMap] = useState<Record<string, string>>({});

  const spotifyQueryUrls = useMemo(() => {
    return artists.map((artist) => artist.spotifyUrl);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSpotifyCovers() {
      const results = await Promise.allSettled(
        spotifyQueryUrls.map(async (spotifyUrl) => {
          const response = await fetch(
            `https://open.spotify.com/oembed?url=${encodeURIComponent(
              spotifyUrl
            )}`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch Spotify oEmbed: ${spotifyUrl}`);
          }

          const data = (await response.json()) as SpotifyOEmbedResponse;

          return {
            spotifyUrl,
            thumbnailUrl: data.thumbnail_url ?? "",
          };
        })
      );

      if (cancelled) return;

      const nextCoverMap: Record<string, string> = {};

      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value.thumbnailUrl) {
          nextCoverMap[result.value.spotifyUrl] = result.value.thumbnailUrl;
        }
      });

      setCoverMap(nextCoverMap);
    }

    loadSpotifyCovers();

    return () => {
      cancelled = true;
    };
  }, [spotifyQueryUrls]);

  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />

      <section className="relative z-10 min-h-screen overflow-hidden px-4 py-5 sm:px-6 md:px-10 md:py-8">
        <Header />

        <section className="mx-auto mt-16 max-w-7xl md:mt-24">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-xs uppercase tracking-[0.45em] text-stone-500">
              Music / 音樂
            </p>

            <h1 className="animate-fade-up delay-100 mt-6 text-5xl font-black leading-none tracking-[-0.08em] text-stone-900 md:text-7xl">
              最近常聽的是他們...
            </h1>

            <p className="animate-fade-up delay-200 mt-7 max-w-2xl text-base leading-8 tracking-wide text-stone-600 md:text-lg">
              這裡會放一些我最近常聽的歌手，封面直接從 Spotify 連結取得。
              把這些好聲音分享給大家~！蛤? 你說歌單太老...XD
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:mt-20 md:grid-cols-4 md:gap-x-7 md:gap-y-16 lg:grid-cols-5">
            {artists.map((artist, index) => (
              <a
                key={artist.name}
                href={artist.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                className={`group animate-fade-up block ${artist.rotate} ${artist.offset}`}
                style={{
                  animationDelay: artist.delay,
                }}
              >
                <article className="relative">
                  <div className="absolute -inset-2 rounded-[1.75rem] bg-white/35 blur-xl transition duration-500 group-hover:bg-white/55" />

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/55 p-2 shadow-2xl backdrop-blur-xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:bg-white/75">
                    <div className="aspect-square overflow-hidden rounded-[1.15rem] bg-stone-200">
                      <SpotifyCover
                        imageUrl={coverMap[artist.spotifyUrl]}
                        title={artist.name}
                      />
                    </div>

                    <div className="px-2 pb-3 pt-4">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">
                        {String(index + 1).padStart(2, "0")} / Spotify
                      </p>

                      <h2 className="mt-2 text-lg font-black leading-tight tracking-[-0.04em] text-stone-900">
                        {artist.name}
                      </h2>

                      {artist.displayName && (
                        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                          {artist.displayName}
                        </p>
                      )}

                      <p className="mt-3 text-sm leading-6 text-stone-600">
                        {artist.note}
                      </p>
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </section>
    </main>
  );
}