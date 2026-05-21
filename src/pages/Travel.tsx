import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type WheelEvent,
} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  travelPlaces,
  type TravelMapPoint,
  type TravelPlace,
} from "../data/travelPlaces";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

type TravelRegion =
  | "taiwan"
  | "eastAsia"
  | "westernEurope"
  | "southernEurope"
  | "easternEurope"
  | "northernEurope";

type TravelMarker = {
  id: string;
  place: TravelPlace;
  point: TravelMapPoint;
};

const travelRegions: {
  key: TravelRegion;
  label: string;
  zhLabel: string;
  center: [number, number];
  zoom: number;
}[] = [
  {
    key: "taiwan",
    label: "Taiwan",
    zhLabel: "台灣",
    center: [23.7, 121],
    zoom: 5,
  },
  {
    key: "eastAsia",
    label: "East Asia",
    zhLabel: "東亞",
    center: [35.5, 136.5],
    zoom: 5,
  },
  {
    key: "westernEurope",
    label: "Western Europe",
    zhLabel: "西歐",
    center: [48.2, 11.5],
    zoom: 5,
  },
  {
    key: "southernEurope",
    label: "Southern Europe",
    zhLabel: "南歐",
    center: [41.9, 12.5],
    zoom: 5,
  },
  {
    key: "easternEurope",
    label: "Eastern Europe",
    zhLabel: "東歐",
    center: [50.1, 19.9],
    zoom: 5,
  },
  {
    key: "northernEurope",
    label: "Northern Europe",
    zhLabel: "北歐",
    center: [64.5, 26],
    zoom: 4,
  },
];

function getTravelRegion(place: TravelPlace): TravelRegion {
  const country = place.country.toLowerCase();

  if (country.includes("taiwan")) {
    return "taiwan";
  }

  if (
    country.includes("japan") ||
    country.includes("korea") ||
    country.includes("china")
  ) {
    return "eastAsia";
  }

  if (
    country.includes("finland") ||
    country.includes("sweden") ||
    country.includes("norway") ||
    country.includes("denmark") ||
    country.includes("iceland")
  ) {
    return "northernEurope";
  }

  if (
    country.includes("italy") ||
    country.includes("spain") ||
    country.includes("portugal") ||
    country.includes("greece") ||
    country.includes("malta") ||
    country.includes("croatia")
  ) {
    return "southernEurope";
  }

  if (
    country.includes("poland") ||
    country.includes("czech") ||
    country.includes("hungary") ||
    country.includes("slovakia") ||
    country.includes("slovenia") ||
    country.includes("romania") ||
    country.includes("bulgaria") ||
    country.includes("estonia") ||
    country.includes("latvia") ||
    country.includes("lithuania")
  ) {
    return "easternEurope";
  }

  return "westernEurope";
}

function getCountryCode(country: string) {
  const normalized = country.toLowerCase();

  if (normalized.includes("taiwan")) return "tw";
  if (normalized.includes("japan")) return "jp";
  if (normalized.includes("korea")) return "kr";
  if (normalized.includes("china")) return "cn";

  if (normalized.includes("germany")) return "de";
  if (normalized.includes("france")) return "fr";
  if (normalized.includes("italy")) return "it";
  if (normalized.includes("switzerland")) return "ch";
  if (normalized.includes("austria")) return "at";
  if (normalized.includes("netherlands")) return "nl";
  if (normalized.includes("belgium")) return "be";
  if (normalized.includes("spain")) return "es";
  if (normalized.includes("portugal")) return "pt";
  if (normalized.includes("greece")) return "gr";
  if (normalized.includes("croatia")) return "hr";

  if (normalized.includes("finland")) return "fi";
  if (normalized.includes("sweden")) return "se";
  if (normalized.includes("norway")) return "no";
  if (normalized.includes("denmark")) return "dk";
  if (normalized.includes("iceland")) return "is";

  if (normalized.includes("poland")) return "pl";
  if (normalized.includes("czech")) return "cz";
  if (normalized.includes("hungary")) return "hu";
  if (normalized.includes("slovakia")) return "sk";
  if (normalized.includes("slovenia")) return "si";
  if (normalized.includes("romania")) return "ro";
  if (normalized.includes("bulgaria")) return "bg";
  if (normalized.includes("estonia")) return "ee";
  if (normalized.includes("latvia")) return "lv";
  if (normalized.includes("lithuania")) return "lt";

  return "";
}

function CountryFlag({ country }: { country: string }) {
  const code = getCountryCode(country);

  if (!code) {
    return <span className="text-[12px] tracking-normal">🌍</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={`${country} flag`}
      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover shadow-sm"
      loading="lazy"
    />
  );
}

function getMarkersFromPlace(place: TravelPlace): TravelMarker[] {
  const points =
    place.mapPoints && place.mapPoints.length > 0
      ? place.mapPoints
      : [
          {
            id: `${place.id}-main`,
            name: place.name,
            zhName: place.zhName,
            coordinates: place.coordinates,
          },
        ];

  return points.map((point) => ({
    id: `${place.id}-${point.id}`,
    place,
    point,
  }));
}

function MapController({
  selectedPlace,
  selectedPoint,
  activeRegion,
  onZoomChange,
}: {
  selectedPlace: TravelPlace | null;
  selectedPoint: TravelMapPoint | null;
  activeRegion: TravelRegion;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMap();

  useMapEvents({
    zoomend() {
      onZoomChange(map.getZoom());
    },
    moveend() {
      onZoomChange(map.getZoom());
    },
  });

  useEffect(() => {
    if (!selectedPlace || !selectedPoint) {
      const region =
        travelRegions.find((item) => item.key === activeRegion) ??
        travelRegions[0];

      map.flyTo(region.center, region.zoom, {
        duration: 1.1,
      });

      return;
    }

    const [lng, lat] = selectedPoint.coordinates;

    map.flyTo([lat, lng], 12, {
      duration: 1.1,
    });

    const timer = window.setTimeout(() => {
      const point = map.latLngToContainerPoint([lat, lng]);
      const targetX = map.getSize().x * 0.18;
      const dx = point.x - targetX;

      map.panBy([dx, 0], {
        animate: true,
        duration: 0.5,
      });
    }, 1150);

    return () => window.clearTimeout(timer);
  }, [map, selectedPlace, selectedPoint, activeRegion]);

  return null;
}

export default function Travel() {
  const base = import.meta.env.BASE_URL;
  const regionScrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<TravelMapPoint | null>(
    null
  );
  const [mapZoom, setMapZoom] = useState(2);
  const [activeRegion, setActiveRegion] = useState<TravelRegion>("taiwan");
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [isRegionDragging, setIsRegionDragging] = useState(false);

  const travelMarkers = useMemo(() => {
    return travelPlaces.flatMap((place) => getMarkersFromPlace(place));
  }, []);

  const groupedTravelMarkers = useMemo(() => {
    return travelRegions.map((region) => ({
      ...region,
      markers: travelMarkers.filter(
        (marker) => getTravelRegion(marker.place) === region.key
      ),
    }));
  }, [travelMarkers]);

  const activeRegionData =
    groupedTravelMarkers.find((region) => region.key === activeRegion) ??
    groupedTravelMarkers[0];

  const pinIcon = useMemo(() => {
    const outerSize = mapZoom >= 8 ? 22 : 34;
    const innerSize = mapZoom >= 8 ? 12 : 18;

    return L.divIcon({
      className: "",
      html: `
        <div style="
          width: ${outerSize}px;
          height: ${outerSize}px;
          border-radius: 9999px;
          background: rgba(239, 68, 68, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: ${innerSize}px;
            height: ${innerSize}px;
            border-radius: 9999px;
            background: #ef4444;
            border: 4px solid white;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.45);
          "></div>
        </div>
      `,
      iconSize: [outerSize, outerSize],
      iconAnchor: [outerSize / 2, outerSize / 2],
    });
  }, [mapZoom]);

  const showFooter = !selectedPlace && mapZoom <= 4.2;

  function openMarker(marker: TravelMarker) {
    setSelectedPlace(marker.place);
    setSelectedPoint(marker.point);
    setIsMobileListOpen(false);
  }

  function closePlace() {
    setSelectedPlace(null);
    setSelectedPoint(null);
  }

  function switchRegion(region: TravelRegion) {
    if (hasDraggedRef.current) return;

    setActiveRegion(region);
    setSelectedPlace(null);
    setSelectedPoint(null);
  }

  function handleRegionMouseDown(event: MouseEvent<HTMLDivElement>) {
    const container = regionScrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = event.pageX - container.offsetLeft;
    scrollStartRef.current = container.scrollLeft;
    setIsRegionDragging(true);
  }

  function handleRegionMouseMove(event: MouseEvent<HTMLDivElement>) {
    const container = regionScrollRef.current;
    if (!container || !isDraggingRef.current) return;

    event.preventDefault();

    const currentX = event.pageX - container.offsetLeft;
    const distance = currentX - dragStartXRef.current;

    if (Math.abs(distance) > 5) {
      hasDraggedRef.current = true;
    }

    container.scrollLeft = scrollStartRef.current - distance;
  }

  function stopRegionDrag() {
    isDraggingRef.current = false;
    setIsRegionDragging(false);

    window.setTimeout(() => {
      hasDraggedRef.current = false;
    }, 0);
  }

  function handleRegionWheel(event: WheelEvent<HTMLDivElement>) {
    const container = regionScrollRef.current;
    if (!container) return;

    const canScrollHorizontally =
      container.scrollWidth > container.clientWidth;

    if (!canScrollHorizontally) return;

    event.preventDefault();

    const scrollAmount =
      Math.abs(event.deltaY) > Math.abs(event.deltaX)
        ? event.deltaY
        : event.deltaX;

    container.scrollLeft += scrollAmount;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#dcecf3] text-stone-900">
      <section className="relative min-h-screen overflow-hidden px-5 py-6 md:px-10 md:py-8">
        <Header map />

        {/* Fullscreen Map */}
        <div className="absolute inset-x-0 bottom-0 top-22 z-0 bg-[#dcecf3] md:top-24">
          <MapContainer
            center={[23.7, 121]}
            zoom={4}
            minZoom={4}
            maxZoom={18}
            scrollWheelZoom
            zoomControl={false}
            attributionControl={false}
            maxBounds={[
              [-85, -180],
              [85, 180],
            ]}
            maxBoundsViscosity={1.0}
            className="h-full w-full bg-[#dcecf3]"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              subdomains={["a", "b", "c", "d"]}
              opacity={0.58}
              noWrap
            />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
              subdomains={["a", "b", "c", "d"]}
              opacity={0.28}
              noWrap
            />

            <MapController
              selectedPlace={selectedPlace}
              selectedPoint={selectedPoint}
              activeRegion={activeRegion}
              onZoomChange={setMapZoom}
            />

            {travelMarkers.map((marker) => {
              const [lng, lat] = marker.point.coordinates;

              return (
                <Marker
                  key={marker.id}
                  position={[lat, lng]}
                  icon={pinIcon}
                  eventHandlers={{
                    click: () => openMarker(marker),
                  }}
                />
              );
            })}
          </MapContainer>
        </div>

        {/* Mobile Floating Toggle */}
        {!selectedPlace && (
          <button
            onClick={() => setIsMobileListOpen((prev) => !prev)}
            className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/80 bg-white/90 px-5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-800 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_0_7px_rgba(239,68,68,0.16)]" />
            Travel Points
            <span className="text-stone-500">{travelMarkers.length}</span>
          </button>
        )}

        {/* Floating Travel List */}
        {!selectedPlace && (
          <aside
            className={`absolute left-4 right-4 z-10 rounded-[1.5rem] border border-white/70 bg-white/85 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 md:left-10 md:right-auto md:top-32 md:w-[380px] md:rounded-[2rem] md:p-5 ${
              isMobileListOpen
                ? "bottom-20 translate-y-0 opacity-100"
                : "pointer-events-none bottom-20 translate-y-8 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
            }`}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500 md:text-[11px]">
                  Travel Points
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.05em] text-stone-900 md:text-2xl">
                  目前紀錄
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 md:text-xs">
                  {travelMarkers.length} pins
                </p>

                <button
                  onClick={() => setIsMobileListOpen(false)}
                  className="rounded-full border border-stone-300 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-stone-600 md:hidden"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Region Tabs */}
            <div className="relative mt-5">
              <div
                ref={regionScrollRef}
                onWheel={handleRegionWheel}
                onMouseDown={handleRegionMouseDown}
                onMouseMove={handleRegionMouseMove}
                onMouseUp={stopRegionDrag}
                onMouseLeave={stopRegionDrag}
                className={`scrollbar-hide w-full select-none overflow-x-auto overscroll-x-contain pb-1 touch-pan-x ${
                  isRegionDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                <div className="flex w-max min-w-full snap-x snap-mandatory gap-2 whitespace-nowrap pr-10">
                  {groupedTravelMarkers.map((region) => {
                    const active = activeRegion === region.key;

                    return (
                      <button
                        key={region.key}
                        onClick={() => switchRegion(region.key)}
                        className={`shrink-0 snap-start rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition md:text-xs ${
                          active
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-300 bg-white/60 text-stone-600 hover:border-stone-600 hover:bg-white"
                        }`}
                      >
                        {region.zhLabel}
                        <span className="ml-2 opacity-60">
                          {region.markers.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-12 bg-gradient-to-l from-white/85 via-white/55 to-transparent" />
            </div>

            {/* Active Region Marker List */}
            <div className="scrollbar-hide mt-5 max-h-[36vh] space-y-2 overflow-y-auto pr-1 md:max-h-[48vh]">
              {activeRegionData.markers.length > 0 ? (
                activeRegionData.markers.map((marker) => (
                  <button
                    key={marker.id}
                    onClick={() => openMarker(marker)}
                    className="group w-full rounded-2xl border border-stone-200/70 bg-white/60 p-3 text-left transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white/90 hover:shadow-lg md:p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-stone-500">
                          <CountryFlag country={marker.place.country} />
                          <span>{marker.place.country}</span>
                        </p>

                        <h3 className="mt-2 text-[14px] font-bold leading-6 tracking-[-0.02em] text-stone-900 md:text-[15px]">
                          {marker.point.zhName ?? marker.place.zhName}
                        </h3>

                        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-500 md:text-xs">
                          {marker.point.name}
                        </p>

                        {marker.place.title && (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
                            {marker.place.title}
                          </p>
                        )}
                      </div>

                      <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-red-500 shadow-[0_0_0_8px_rgba(239,68,68,0.16)] transition group-hover:shadow-[0_0_0_10px_rgba(239,68,68,0.22)]" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-stone-200/70 bg-white/60 p-5 text-sm leading-7 text-stone-500">
                  這個區域目前還沒有旅行紀錄。
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Info Panel */}
        {selectedPlace && (
          <aside className="absolute inset-x-4 bottom-4 top-40 z-20 overflow-y-auto rounded-[1.5rem] border border-white/70 bg-white/90 p-5 shadow-2xl backdrop-blur-xl md:inset-x-auto md:bottom-auto md:right-10 md:top-28 md:h-[calc(100vh-9rem)] md:w-[65vw] md:rounded-[2rem] md:p-8">
            <article className="animate-fade-up">
              {/* Title */}
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
                <div>
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-stone-500">
                    <CountryFlag country={selectedPlace.country} />
                    <span>{selectedPlace.country}</span>
                  </p>

                  <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-stone-900 md:mt-5 md:text-5xl">
                    {selectedPlace.title ?? selectedPlace.zhName}
                  </h1>

                  <p className="mt-4 text-sm uppercase tracking-[0.3em] text-stone-500">
                    {selectedPoint?.zhName ?? selectedPlace.name}
                  </p>
                </div>

                <button
                  onClick={closePlace}
                  className="shrink-0 rounded-full border border-stone-400 px-5 py-2 text-xs uppercase tracking-[0.2em] text-stone-700 transition hover:bg-stone-900 hover:text-white"
                >
                  Back
                </button>
              </div>

              {/* YouTube Embed */}
              <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-stone-900 shadow-xl">
                {selectedPlace.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedPlace.youtubeId}`}
                    title={`${selectedPlace.name} YouTube video`}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video w-full items-center justify-center bg-stone-900 text-white">
                    <div className="text-center">
                      <p className="text-xs uppercase tracking-[0.35em]">
                        YouTube VLOG
                      </p>
                      <p className="mt-3 text-xs tracking-[0.2em] text-white/60">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Flexible Article Blocks */}
              <div className="mt-12 space-y-10">
                {selectedPlace.contentBlocks?.map((block, index) => {
                  if (block.type === "text") {
                    return (
                      <p
                        key={index}
                        className="max-w-4xl text-[17px] leading-9 tracking-wide text-stone-700"
                      >
                        {block.content}
                      </p>
                    );
                  }

                  if (block.type === "image") {
                    return (
                      <figure key={index}>
                        <div className="overflow-hidden rounded-[1.5rem] bg-stone-200 shadow-sm">
                          <img
                            src={`${base}${block.src}`}
                            alt={block.alt ?? selectedPlace.name}
                            className="w-full object-cover"
                          />
                        </div>

                        {block.caption && (
                          <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-stone-500">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }

                  if (block.type === "imageGrid") {
                    return (
                      <div key={index} className="grid gap-5 md:grid-cols-2">
                        {block.images.map((image, imageIndex) => (
                          <figure key={imageIndex}>
                            <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-stone-200 shadow-sm">
                              <img
                                src={`${base}${image.src}`}
                                alt={image.alt ?? selectedPlace.name}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            {image.caption && (
                              <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-stone-500">
                                {image.caption}
                              </figcaption>
                            )}
                          </figure>
                        ))}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </article>
          </aside>
        )}

        {showFooter && (
          <div className="absolute bottom-4 left-0 right-0 z-10 hidden md:block">
            <Footer />
          </div>
        )}
      </section>
    </main>
  );
}