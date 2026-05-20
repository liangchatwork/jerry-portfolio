export type TravelContentBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "image";
      src: string;
      alt?: string;
      caption?: string;
    }
  | {
      type: "imageGrid";
      images: {
        src: string;
        alt?: string;
        caption?: string;
      }[];
    };

export type TravelPlace = {
  id: string;
  name: string;
  country: string;
  zhName: string;
  title?: string;
  coordinates: [number, number];
  youtubeId?: string;
  description: string;
  contentBlocks: TravelContentBlock[];
};

export const travelPlaces: TravelPlace[] = [
    {
      id: "shirakawago",
      name: "Shirakawa-go",
      country: "Japan",
      zhName: "白川鄉合掌村",
      title: "白川鄉合掌村 一 靜謐樸實的世界文化遺產",
      coordinates: [136.9063, 36.2574],
      youtubeId: "C7s7dkDpo0k",
      description:
        "位於日本岐阜縣的白川鄉合掌村，是我很喜歡的日本旅行記憶之一。合掌造聚落、雪景、山村氛圍都很有童話感，也很適合作為旅行紀錄頁的第一個測試地點。",
      contentBlocks: [
        {
          type: "image",
          src: "travel/shirakawago.jpg",
          alt: "Shirakawa-go",
        },
      ],
    },
    {
        id: "munich",
        name: "Munich",
        country: "Germany",
        zhName: "慕尼黑",
        title: "慕尼黑 一 好男人的「醉」過，與酒空人的誕辰～",
        coordinates: [11.582, 48.1351],
        youtubeId: "kaHl_X7-oms",
        description:
          "慕尼黑，一場從好男人到微醺冒險者的轉變。從初抵德國時飯店附贈的第一杯啤酒，到瑪利亞廣場與朋友們的暢飲，再到 Oktoberfest 的熱鬧氛圍，這座城市讓我第一次真正理解歐洲的酒精文化與社交魅力。",
        contentBlocks: [
          {
            type: "text",
            content:
              "「你不要到歐洲就每天狂喝酒內～」，在出發前老爸老媽這樣的提醒著，「拜託，怎麼可能～那東西喝起來一股藥味欸。」，我不屑且笑著回答道。確實，啤酒這東西在我的印象中，是進了碩士班後，實驗室每年出遊晚上大家一起玩桌遊時會被灌酒的可怕回憶。話說酒精的浸潤下，確實會讓人與人在腦袋幾近斷路的狀態下，使其邊界與隔閡漸漸消弭，在友善的社交局之下，這確實是一種促進友情跟愛情的催化劑，難怪自古以來這種飲料便存在至今。但像我這種對酒精比較敬謝不敏的人，常常就在這種局子下顯得很格格不入。簡單來說，在到歐洲之前，我算是那種感受不到酒精甘甜與特殊芬芳的人類。不過我也常安慰自己道：「反正這種東西也傷身嘛～」啊，沒錯～我就是那種只在酒吧裡點牛奶的健康牛仔。但是如今，我有機會踏上這個充滿豐沛酒精文化的國度，這種寬慰，是否顯得我有點太過保守了呢？這麼想著，我降落到了慕尼黑。"
          },
          {
            type: "text",
            content:
              "9月30日，我們四個成大男子因為還沒有住處，因此我們落腳在慕尼黑老城區的一間飯店。適逢啤酒節，因此我們在入住時迎來的第一個驚喜就是飯店附贈一人一杯 500 cc 的免費啤酒。意外的是，我們四個男人都不是酒空人，啊～原來都是新時代不喝酒的好男人啊～，不過除了我以外其他三人倒是完全不抗拒這突如其來的歐洲風洗禮。我內心一震，這麼快就要脫離好男人的行列了嗎？但如果要因此自居為好男人，而放棄這能瞬間融入當地的「洗禮」，那也太有失冒險精神了對吧？「我到底來歐洲是為了什麼？」沒錯，虎軀一震，馬上與三位紳士到了飯店一樓櫃台區，從櫃檯手邊接過了那一大杯啤酒，色澤意外的不怎麼深沉，而是淡雅的玻璃黃，酒杯裡有些許氣泡浮出，隨著氣泡浮至杯口的是淡淡的麥香氣。我隨即就是一口淺嘗，意外的，沒有當年苦似喝藥的感覺，清澈的麥香口感底下沉澱著淡淡的酒香，實是順口。那一刻，我悟了⋯原來，國外的月亮真的比較圓啊～"
          },
          {
            type: "image",
            src: "travel/munich-1.jpg",
            alt: "Munich old town",
            caption: "OKTOBERFEST / MUNICH / GERMANY"
          },
          {
            type: "text",
            content:
              "10月02日，與成大的三位女士會合，七個人浩浩蕩蕩的到了瑪利亞廣場（Marienplatz）散街，啤酒節的熱潮布滿了老城區的邊邊角角，路上都可以看到德國居民坐在露天棚下悠哉的暢飲啤酒並享受著歡愉的午後時光。我們也入境隨俗找了間小店坐下來暢飲，慣例的大家互相認識並暢談了一番，那天也是第一次品味了黑麥啤酒，黑麥啤酒比一般啤酒更散發著厚實的黑麥香氣，酒感也在入口後因為其黑麥香顯得比較深沉，但不失歐洲啤酒特有的甘醇爽口。來到歐洲的第三天，我也意識到，看來我已經不是滴酒不沾的「好男人」了…但也確實，在酒精的加持下，我也以 5.5 歐元的價格等價交換認識了一群有趣的夥伴們～"
          },
          {
            type: "text",
            content:
              "10月03日，眾人去參加了 Oktoberfest，在那裡我們反而沒喝半杯啤酒，只能說慕尼黑真是「醉」過啊～光是在會場外暢飲一杯就要 5.5 歐元，在會場內價格更是恐怖。不過我們也因此領教到德國當地居民的熱情。不過據後來與德國朋友以及歐洲認識的留學生朋友聊過之後，我才理解其實歐洲人的邊界感其實是很重的，因此或許對他們來說，暢飲才是打開他們社交閥門的一個方式，也只有在每年的此時此刻，他們才能嶄露他們一直以來隱藏起來的奔放與歡愉，或許這就是歐洲酒精文化的真諦吧～"
          },
          {
            type: "text",
            content:
              "那麼你問我短短三天，我從好男人蛻變為酒空人了嗎？實則不然，在歐洲吃飯，服務生都會問：「要喝什麼？」，而不是「需不需要飲料」，對他們來說，吃飯兌酒那是常態，因此不點酒的吝嗇亞洲人常常被認為很不接地氣。不過對經費有限的交換生來說，那我們是寧可稍微不接地氣的，但常常換來的感覺都是服務生對我們的困惑。久而久之，飲酒對我來說關鍵還是氣氛要對才行，悠哉的氣氛下，吃肉對美酒才是最棒的享受方式，但十月的秋天，啤酒充其量也不過是打開了我對酒精世界的認知而已，況且，雖然認知到歐洲的啤酒確實與台灣啤酒不同，但若是一杯果汁跟啤酒擺在眼前，那時的我還是會毫不猶豫選擇喝果汁。所以這條酒空人之路，或許對我來說還甚是遙遠吧～，看來是可以再當一陣子不怎麼喝酒的好男人了。"
          },
          {
            type: "image",
            src: "travel/munich-2.jpg",
            alt: "Munich Oktoberfest memory",
            caption: "OKTOBERFEST / MUNICH  / GERMANY"
          }
        ]
    },
    {
      id: "guipu-chiayi",
      name: "Guipu Glamping",
      country: "Taiwan",
      zhName: "嘉義歸樸森活露營區",
      title: "跟著三傻到嘉義露(營)一下",
      coordinates: [120.5665, 23.4548],
      youtubeId: "RL9Lg5v-DB0",
      description:
        "嘉義番路鄉的歸樸森活露營區，一次跟著三傻出門露營的旅行紀錄。",
      contentBlocks: [
        {
          type: "text",
          content:
            "",
        },
      ],
    },
    {
      id: "neuschwanstein",
      name: "Neuschwanstein Castle",
      country: "Germany",
      zhName: "新天鵝堡",
      title: "新天鵝堡一日遊，見證迪士尼城堡本人!!",
      coordinates: [10.7498, 47.5576],
      youtubeId: "i0KdaY4g6DQ",
      description: "",
      contentBlocks: [],
    },
    {
      id: "konigssee",
      name: "Königssee",
      country: "Germany",
      zhName: "國王湖",
      title: "國王湖一日遊，看見全德國最美的湖泊~",
      coordinates: [12.9875, 47.5547],
      youtubeId: "i0KdaY4g6DQ",
      description: "",
      contentBlocks: [],
    },
    {
      id: "nagoya-flash-trip",
      name: "Nagoya",
      country: "Japan",
      zhName: "名古屋",
      title: '"名古屋"天兵的24小時快閃之旅',
      coordinates: [136.9, 35.1833],
      youtubeId: "Hm6G2V_j-Ho",
      description: "",
      contentBlocks: [],
    },
    {
      id: "kanazawa-little-kyoto",
      name: "Kanazawa",
      country: "Japan",
      zhName: "金澤",
      title:
        '走訪人稱小京都"金澤"，逃離滿是台灣觀光客的真京都，感受靜謐小城~',
      coordinates: [136.6562, 36.5613],
      youtubeId: "U2odXNrMR6o",
      description: "",
      contentBlocks: [],
    },
    {
      id: "toyama-fujiko-fujio",
      name: "Toyama",
      country: "Japan",
      zhName: "富山",
      title: "走進富山，藤子.F.不二雄老師的故鄉~",
      coordinates: [137.2113, 36.6953],
      youtubeId: "U2odXNrMR6o",
      description: "",
      contentBlocks: [],
    },
    {
      id: "kyoto-tenryuji",
      name: "Kyoto",
      country: "Japan",
      zhName: "京都・天龍寺",
      title: "久違了京都，走訪世界文化遺產天龍寺，但我是來到溪頭嗎?XD",
      coordinates: [135.6736, 35.0154],
      youtubeId: "kuWEjXST4xM",
      description: "",
      contentBlocks: [],
    },
    {
      id: "osaka-revisit",
      name: "Osaka",
      country: "Japan",
      zhName: "大阪",
      title: "再訪大阪，入住日本治安最糟的反觀光客地區...",
      coordinates: [135.4848, 34.6723],
      youtubeId: "kuWEjXST4xM",
      description: "",
      contentBlocks: [],
    },
    {
      id: "hualien-taroko-paragliding",
      name: "Taroko / Hualien",
      country: "Taiwan",
      zhName: "花蓮太魯閣",
      title: "人生就要勇敢一次，來去花蓮太魯閣滑翔傘飛高高啦~!",
      coordinates: [121.621, 24.158],
      youtubeId: "8RYpmp10p8Y",
      description: "",
      contentBlocks: [],
    },
    {
      id: "chiayi-city-food-trip",
      name: "Chiayi City",
      country: "Taiwan",
      zhName: "嘉義市",
      title: "新年帶三傻去嘉義市區狂吃猛嗑美食~!",
      coordinates: [120.45, 23.3334],
      youtubeId: "ss0fXRONMzI",
      description: "",
      contentBlocks: [],
    },
    {
      id: "changhua-streamer-trip",
      name: "Changhua",
      country: "Taiwan",
      zhName: "彰化",
      title: "跟著知名實況主走遍彰化!!",
      coordinates: [120.5416, 24.0809],
      youtubeId: "qcMKoOvSna4",
      description: "",
      contentBlocks: [],
    },
  ];