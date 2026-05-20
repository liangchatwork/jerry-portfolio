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
  imageUrl?: string;
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
    imageUrl: `${import.meta.env.BASE_URL}drama/gintama.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/one-piece.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/detective-conan.jpg`,
    note: "73老賊到底是打算什麼時候完結?",
    rotate: "-rotate-1",
    offset: "md:translate-y-14",
    delay: "160ms",
  },
  {
    title: "學園救援團",
    originalTitle: "SKET Dance",
    type: "Anime",
    category: "classicAnime",
    wikiTitle: "Sket Dance",
    imageUrl: `${import.meta.env.BASE_URL}drama/sket-dance.jpg`,
    note: "SKET團三人組永遠的神，其實我是先看這三位才看銀魂，通通給我去看!!!",
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
    imageUrl: `${import.meta.env.BASE_URL}drama/haikyuu.jpg`,
    note: "運動番第一，不接受反駁!!!飛吧~!!!",
    rotate: "-rotate-2",
    offset: "md:-translate-y-8",
    delay: "320ms",
  },
  {
    title: "JoJo Steel Ball Run",
    originalTitle: "Steel Ball Run",
    type: "Manga",
    category: "classicAnime",
    wikiTitle: "Steel Ball Run",
    imageUrl: `${import.meta.env.BASE_URL}drama/jojosbr.jpg`,
    note: "SBR真的是荒木老師的巔峰之作，完全なる黄金の回転エネルギー。",
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
    imageUrl: `${import.meta.env.BASE_URL}drama/fullmetal-alchamist.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/attack-on-titan.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/sao.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/doraemon.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/jjk.jpg`,
    note: "這坨石經過MAPPA聖手一揮做成動漫後居然變香了，他果然是另類的神作...",
    rotate: "rotate-2",
    offset: "md:-translate-y-4",
    delay: "0ms",
  },
  {
    title: "WITCH WATCH",
    originalTitle: "Witch Watch",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Witch Watch",
    imageUrl: `${import.meta.env.BASE_URL}drama/witchwatch.jpg`,
    note: "篠原老師的搞笑節奏還是熟悉的味道，魔女、使魔與校園日常的快樂組合。",
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
    imageUrl: `${import.meta.env.BASE_URL}drama/demonslayer.jpg`,
    note: "偉災ufotable電銲工，希望無限城篇可以趕快出完!!!",
    rotate: "rotate-1",
    offset: "md:translate-y-2",
    delay: "160ms",
  },
  {
    title: "Re:從零開始的異世界生活",
    originalTitle: "Re:Zero",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Re:Zero − Starting Life in Another World",
    imageUrl: `${import.meta.env.BASE_URL}drama/re0.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/mushoku.jpg`,
    note: "異世界三幻神之認真講自傳給你聽，然後我單推艾莉絲呵呵。",
    rotate: "rotate-3",
    offset: "md:translate-y-14",
    delay: "320ms",
  },
  {
    title: "為美好的世界獻上祝福",
    originalTitle: "KonoSuba",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "KonoSuba",
    imageUrl: `${import.meta.env.BASE_URL}drama/konosuba.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/grandblue.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/btr.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/kaguya.jpg`,
    note: "學園救援團之後，近年來在我心中封神的校園戀愛搞笑神作!!!",
    rotate: "rotate-1",
    offset: "md:-translate-y-2",
    delay: "640ms",
  },
  {
    title: "葬送的芙莉蓮",
    originalTitle: "Frieren: Beyond Journey's End",
    type: "Anime",
    category: "recentAnime",
    wikiTitle: "Frieren: Beyond Journey's End",
    imageUrl: `${import.meta.env.BASE_URL}drama/frieren.jpg`,
    note: "勇者故事結束之後才開始的旅程，溫柔、孤獨又後勁很強。",
    rotate: "-rotate-2",
    offset: "md:translate-y-8",
    delay: "720ms",
  },

  {
    title: "逃避雖然可恥但有用",
    originalTitle: "The Full-Time Wife Escapist",
    type: "Drama",
    category: "drama",
    wikiTitle: "Nigeru wa Haji da ga Yaku ni Tatsu",
    imageUrl: `${import.meta.env.BASE_URL}drama/nigeru.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/confidenceman.jpg`,
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
    imageUrl: `${import.meta.env.BASE_URL}drama/strangerthing.jpg`,
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
    title: "美國隊長：酷寒戰士",
    originalTitle: "Captain America: The Winter Soldier",
    type: "Movie",
    category: "movies",
    wikiTitle: "Captain America: The Winter Soldier",
    note: "以前覺得漫威地球線很普通，現在覺得這部是漫威顛峰。拳拳到肉太爽啦~!",
    rotate: "rotate-2",
    offset: "md:translate-y-5",
    delay: "0ms",
  },
  {
    title: "美國隊長：英雄內戰",
    originalTitle: "Captain America: Civil War",
    type: "Movie",
    category: "movies",
    wikiTitle: "Captain America: Civil War",
    note: "很後悔當初沒去電影院看，這部比前一年上映的復聯2強很多。不愧是羅素導演。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-4",
    delay: "80ms",
  },
  {
    title: "復仇者聯盟：無限戰爭",
    originalTitle: "Avengers: Infinity War",
    type: "Movie",
    category: "movies",
    wikiTitle: "Avengers: Infinity War",
    note: "這部根本薩諾斯傳，超前及創新的超英打戲跟劇情，至今無人能及。",
    rotate: "rotate-1",
    offset: "md:translate-y-10",
    delay: "160ms",
  },
  {
    title: "復仇者聯盟：終局之戰",
    originalTitle: "Avengers: Endgame",
    type: "Movie",
    category: "movies",
    wikiTitle: "Avengers: Endgame",
    note: "終局之後無漫威，這部就是漫威最後的榮光。",
    rotate: "-rotate-3",
    offset: "md:-translate-y-1",
    delay: "240ms",
  },
  {
    title: "蜘蛛人",
    originalTitle: "Spider-Man",
    type: "Movie / 2002",
    category: "movies",
    wikiTitle: "Spider-Man (2002 film)",
    note: "陶比版蜘蛛人的起點，The Great Power come with Great Responsibility。",
    rotate: "rotate-2",
    offset: "md:translate-y-8",
    delay: "320ms",
  },
  {
    title: "蜘蛛人2",
    originalTitle: "Spider-Man 2",
    type: "Movie / 2004",
    category: "movies",
    wikiTitle: "Spider-Man 2",
    imageUrl: `${import.meta.env.BASE_URL}drama/spiderman2.jpg`,
    note: "個人認為這部是初代蜘蛛人電影最佳，章魚博士的刻畫跟Peter的內心掙扎刻畫得很好。",
    rotate: "-rotate-1",
    offset: "md:-translate-y-6",
    delay: "400ms",
  },
  {
    title: "蜘蛛人：驚奇再起",
    originalTitle: "The Amazing Spider-Man",
    type: "Movie / 2012",
    category: "movies",
    wikiTitle: "The Amazing Spider-Man (film)",
    note: "加菲版Peter Parker，經過馬克導演充滿青春感的詮釋更像一部愛情片。",
    rotate: "rotate-3",
    offset: "md:translate-y-4",
    delay: "480ms",
  },
  {
    title: "X戰警：未來昔日",
    originalTitle: "X-Men: Days of Future Past",
    type: "Movie / 2014",
    category: "movies",
    wikiTitle: "X-Men: Days of Future Past",
    note: "最好的X戰警電影，麥艾維的X教授跟麥可的萬磁王情愫拉滿XD。劇本也是無敵。",
    rotate: "-rotate-2",
    offset: "md:translate-y-12",
    delay: "560ms",
  },
  {
    title: "羅根",
    originalTitle: "Logan",
    type: "Movie / 2017",
    category: "movies",
    wikiTitle: "Logan (film)",
    note: "休叔金鋼狼最後一舞? 最沉重且最有深度的金鋼狼電影。",
    rotate: "rotate-1",
    offset: "md:-translate-y-3",
    delay: "640ms",
  },
  {
    title: "蜘蛛人：無家日",
    originalTitle: "Spider-Man: No Way Home",
    type: "Movie / 2021",
    category: "movies",
    wikiTitle: "Spider-Man: No Way Home",
    note: "劇情滿是漏洞但是又神到爆炸，三代同堂讓整部電影瑕不掩瑜了，爆米花就是好看。",
    rotate: "-rotate-3",
    offset: "md:translate-y-7",
    delay: "720ms",
  },
  {
    title: "星際異攻隊3",
    originalTitle: "Guardians of the Galaxy Vol. 3",
    type: "Movie / 2023",
    category: "movies",
    wikiTitle: "Guardians of the Galaxy Vol. 3",
    note: "星際異攻隊最後的一戰，火箭的故事終於得到補完，漫威最神三部曲無可厚非。",
    rotate: "rotate-2",
    offset: "md:-translate-y-5",
    delay: "800ms",
  },
  {
    title: "死侍",
    originalTitle: "Deadpool",
    type: "Movie / 2016",
    category: "movies",
    wikiTitle: "Deadpool (film)",
    note: "6000萬美金拍出來的超屌R級超英，只能說Ryan對死只能說Ryan對死侍這角色是真愛了。",
    rotate: "-rotate-1",
    offset: "md:translate-y-11",
    delay: "880ms",
  },
  {
    title: "死侍與金鋼狼",
    originalTitle: "Deadpool & Wolverine",
    type: "Movie / 2024",
    category: "movies",
    wikiTitle: "Deadpool & Wolverine",
    note: "雖然也是劇情漏洞百出，但是把休叔找回來演老狼真的誠意拉滿，爆米花就是爽!!",
    rotate: "rotate-3",
    offset: "md:-translate-y-2",
    delay: "960ms",
  },
  {
    title: "捍衛戰士：獨行俠",
    originalTitle: "Top Gun: Maverick",
    type: "Movie / 2022",
    category: "movies",
    wikiTitle: "Top Gun: Maverick",
    note: "與前作的緊密連結，懷舊但不老土，感動人心的劇本加上阿湯哥的演繹，真的好看!!。",
    rotate: "-rotate-2",
    offset: "md:translate-y-6",
    delay: "1040ms",
  },
  {
    title: "哈利波特：混血王子的背叛",
    originalTitle: "Harry Potter and the Half-Blood Prince",
    type: "Movie",
    category: "movies",
    wikiTitle: "Harry Potter and the Half-Blood Prince (film)",
    note: "大家說這部最爛但我覺得還不錯啊，一方面是演員都對自己角色理解足夠了，而且故事也很有離別的青春感。",
    rotate: "rotate-1",
    offset: "md:-translate-y-4",
    delay: "1120ms",
  },
  {
    title: "哈利波特：死神的聖物2",
    originalTitle: "Harry Potter and the Deathly Hallows – Part 2",
    type: "Movie",
    category: "movies",
    wikiTitle: "Harry Potter and the Deathly Hallows – Part 2",
    note: "十年魔法旅程的終章，石內卜教授QQ。",
    rotate: "-rotate-3",
    offset: "md:translate-y-10",
    delay: "1200ms",
  },
  {
    title: "全面啟動",
    originalTitle: "Inception",
    type: "Movie",
    category: "movies",
    wikiTitle: "Inception",
    note: "夢中夢的概念、配樂、結尾陀螺，所有經典元素在當年很超前。",
    rotate: "rotate-2",
    offset: "md:-translate-y-1",
    delay: "1280ms",
  },
  {
    title: "星際效應",
    originalTitle: "Interstellar",
    type: "Movie",
    category: "movies",
    wikiTitle: "Interstellar (film)",
    note: "充滿科學論據的電影，搭配氣勢磅礡的音樂與賺人熱淚的情節演繹，諾蘭導演超神!!。",
    rotate: "-rotate-1",
    offset: "md:translate-y-8",
    delay: "1360ms",
  },
  {
    title: "星際過客",
    originalTitle: "Passengers",
    type: "Movie",
    category: "movies",
    wikiTitle: "Passengers (2016 film)",
    note: "太空孤獨感與道德選擇，設定其實很有記憶點。加上大表姐的巔峰顏質可以給佳作。",
    rotate: "rotate-3",
    offset: "md:-translate-y-5",
    delay: "1440ms",
  },
  {
    title: "淑女鳥",
    originalTitle: "Lady Bird",
    type: "Movie",
    category: "movies",
    wikiTitle: "Lady Bird (film)",
    note: "有情、夢想、家庭、充分詮釋那種青春期特有的叛逆與對生活的彆扭感。",
    rotate: "-rotate-2",
    offset: "md:translate-y-4",
    delay: "1520ms",
  },
  {
    title: "綠皮書",
    originalTitle: "Green Book",
    type: "Movie",
    category: "movies",
    wikiTitle: "Green Book (film)",
    note: "黑白成行的公路片，雖然是政治正確的電影，但是刻劃、立意都很值得討論跟發人深省，真正的種族議題詮釋佳作",
    rotate: "rotate-1",
    offset: "md:translate-y-12",
    delay: "1600ms",
  },
  {
    title: "天才的禮物",
    originalTitle: "Gifted",
    type: "Movie",
    category: "movies",
    wikiTitle: "Gifted (2017 film)",
    note: "天才小孩、親情與選擇，簡單但很打動人。麥麥超可愛!!!",
    rotate: "-rotate-3",
    offset: "md:-translate-y-2",
    delay: "1680ms",
  },
  {
    title: "白日夢冒險王",
    originalTitle: "The Secret Life of Walter Mitty",
    type: "Movie",
    category: "movies",
    wikiTitle: "The Secret Life of Walter Mitty",
    imageUrl: `${import.meta.env.BASE_URL}drama/waltermitty.jpg`,
    note: "有時候真正的冒險不是幻想，而是踏出去的那一步。風景、音樂跟人生感都很舒服。",
    rotate: "rotate-2",
    offset: "md:translate-y-7",
    delay: "1720ms",
  },
  {
    title: "墊底辣妹",
    originalTitle: "Flying Colors",
    type: "Movie",
    category: "movies",
    wikiTitle: "Flying Colors (2015 film)",
    note: "真人真事改編，從墊底到逆轉人生。有村架純可愛，故事也很熱血。",
    rotate: "-rotate-1",
    offset: "md:-translate-y-4",
    delay: "1740ms",
  },
  {
    title: "少年Pi的奇幻漂流",
    originalTitle: "Life of Pi",
    type: "Movie",
    category: "movies",
    wikiTitle: "Life of Pi (film)",
    note: "以前覺得是劇本很神的科幻片，後來發現其實劇情背後另有劇情，我們看到的其實並非真正故事，超神!!!",
    rotate: "rotate-2",
    offset: "md:translate-y-7",
    delay: "1760ms",
  },
  {
    title: "當幸福來敲門",
    originalTitle: "The Pursuit of Happyness",
    type: "Movie",
    category: "movies",
    wikiTitle: "The Pursuit of Happyness",
    note: "堅持與努力是邁向成功的唯一鐵則，低潮來的時候看一下這部就對了!!",
    rotate: "-rotate-1",
    offset: "md:-translate-y-6",
    delay: "1840ms",
  },
  {
    title: "遇見你之前",
    originalTitle: "Me Before You",
    type: "Movie",
    category: "movies",
    wikiTitle: "Me Before You (film)",
    note: "浪漫、選擇與告別，不現實但是實為淒美動人的愛情佳作。",
    rotate: "rotate-3",
    offset: "md:translate-y-5",
    delay: "1920ms",
  },
  {
    title: "心中的小星星",
    originalTitle: "Taare Zameen Par",
    type: "Movie",
    category: "movies",
    wikiTitle: "Taare Zameen Par",
    note: "每個孩子都有自己的光，只是需要有人願意慢慢看見。溫柔又很有力量的佳作。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-3",
    delay: "2000ms",
  },
  {
    title: "三個傻瓜",
    originalTitle: "3 Idiots",
    type: "Movie",
    category: "movies",
    wikiTitle: "3 Idiots",
    note: "All is well. 主導突破陳舊教育體制，學習、人生與追求夢想的神作。",
    rotate: "rotate-1",
    offset: "md:translate-y-9",
    delay: "2080ms",
  },
  {
    title: "遺願清單",
    originalTitle: "The Bucket List",
    type: "Movie",
    category: "movies",
    wikiTitle: "The Bucket List",
    note: "人生最後想完成什麼？陳年的老劇情搭配兩位老戲骨的動人演繹，暖心佳作。",
    rotate: "-rotate-3",
    offset: "md:-translate-y-1",
    delay: "2160ms",
  },
  {
    title: "心靈捕手",
    originalTitle: "Good Will Hunting",
    type: "Movie",
    category: "movies",
    wikiTitle: "Good Will Hunting",
    note: "不要浪費自己的人生，但也不必別人要你幹嘛就幹嘛。麥特戴蒙與羅賓威廉斯的動人演繹，神作!!",
    rotate: "rotate-2",
    offset: "md:translate-y-6",
    delay: "2240ms",
  },
  {
    title: "美麗境界",
    originalTitle: "A Beautiful Mind",
    type: "Movie",
    category: "movies",
    wikiTitle: "A Beautiful Mind (film)",
    note: "天才、疾病、陪伴與人生，沉穩但很有力量。",
    rotate: "-rotate-1",
    offset: "md:-translate-y-5",
    delay: "2320ms",
  },
  {
    title: "肖申克的救贖",
    originalTitle: "The Shawshank Redemption",
    type: "Movie",
    category: "movies",
    wikiTitle: "The Shawshank Redemption",
    note: "即使身在絕境中，絕對不可以放棄希望。因為Hope is a good thing.",
    rotate: "rotate-3",
    offset: "md:translate-y-10",
    delay: "2400ms",
  },
  {
    title: "海蒂與爺爺",
    originalTitle: "Heidi",
    type: "Movie",
    category: "movies",
    wikiTitle: "Heidi (2015 film)",
    note: "乾淨、溫柔、治癒，阿爾卑斯山的風景也太美。",
    rotate: "-rotate-2",
    offset: "md:-translate-y-2",
    delay: "2480ms",
  },
  {
    title: "真善美",
    originalTitle: "The Sound of Music",
    type: "Movie",
    category: "movies",
    wikiTitle: "The Sound of Music (film)",
    note: "經典60年代歌舞劇神作，清新脫俗的經典老電影。",
    rotate: "rotate-1",
    offset: "md:translate-y-4",
    delay: "2560ms",
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
    description:
      "算是長年連載，伴我童年跟青少年動漫入坑時期的一些神作。數字並非排名喔~",
  },
  {
    key: "recentAnime",
    label: "Recent Favorites",
    title: "近年喜歡的動畫",
    description:
      "近幾年比較常看的作品，戰鬥、異世界、戀愛喜劇、樂團青春都有。",
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
    title: "喜歡的電影",
    description:
      "爆米花、人生勵志佳片都有。失落的時候，看電影就對了...",
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

function getImageUrl(item: DramaItem, imageMap: Record<string, string>) {
  if (item.imageUrl) return item.imageUrl;
  if (item.wikiTitle) return imageMap[item.wikiTitle];
  return undefined;
}

function DramaCover({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) {
  if (!imageUrl) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-[1.15rem] bg-stone-200/80 px-5 text-center">
        <p className="text-[11px] uppercase leading-6 tracking-[0.32em] text-stone-500">
          Image
          <br />
          Pending
        </p>
      </div>
    );
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
    return Array.from(
      new Set(
        dramaItems
          .map((item) => item.wikiTitle)
          .filter((title): title is string => Boolean(title))
      )
    );
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
            imageUrl:
              data.thumbnail?.source ?? data.originalimage?.source ?? "",
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
                        key={`${item.category}-${item.title}`}
                        item={item}
                        index={index}
                        imageUrl={getImageUrl(item, imageMap)}
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