import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { travelPlaces, type TravelPlace } from "../data/travelPlaces";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

type TravelRegion = "taiwan" | "asia" | "westernEurope";

const travelRegions: {
  key: TravelRegion;
  label: string;
  zhLabel: string;
}[] = [
  {
    key: "taiwan",
    label: "Taiwan",
    zhLabel: "台灣",
  },
  {
    key: "asia",
    label: "Asia",
    zhLabel: "亞洲",
  },
  {
    key: "westernEurope",
    label: "Western Europe",
    zhLabel: "西歐",
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
    country.includes("china") ||
    country.includes("thailand") ||
    country.includes("vietnam") ||
    country.includes("singapore") ||
    country.includes("malaysia")
  ) {
    return "asia";
  }

  return "westernEurope";
}

function MapController({
  selectedPlace,
  onZoomChange,
}: {
  selectedPlace: TravelPlace | null;
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
    if (!selectedPlace) {
      map.flyTo([23.7, 121], 5, {
        duration: 1.1,
      });
      return;
    }

    const [lng, lat] = selectedPlace.coordinates;

    map.flyTo([lat, lng], 10, {
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
  }, [map, selectedPlace]);

  return null;
}

export default function Travel() {
  const base = import.meta.env.BASE_URL;
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(null);
  const [mapZoom, setMapZoom] = useState(2);
  const [activeRegion, setActiveRegion] = useState<TravelRegion>("taiwan");

  const groupedTravelPlaces = useMemo(() => {
    return travelRegions.map((region) => ({
      ...region,
      places: travelPlaces.filter(
        (place) => getTravelRegion(place) === region.key
      ),
    }));
  }, []);

  const activeRegionData =
    groupedTravelPlaces.find((region) => region.key === activeRegion) ??
    groupedTravelPlaces[0];

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

  return (
    <main className="min-h-screen overflow-hidden bg-[#dcecf3] text-stone-900">
      <section className="relative min-h-screen overflow-hidden px-5 py-6 md:px-10 md:py-8">
        <Header map />

        {/* Fullscreen Map */}
        <div className="absolute inset-x-0 bottom-0 top-36 z-0 bg-[#dcecf3] md:top-24">
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
              onZoomChange={setMapZoom}
            />

            {travelPlaces.map((place) => {
              const [lng, lat] = place.coordinates;

              return (
                <Marker
                  key={place.id}
                  position={[lat, lng]}
                  icon={pinIcon}
                  eventHandlers={{
                    click: () => setSelectedPlace(place),
                  }}
                />
              );
            })}
          </MapContainer>
        </div>

        {/* Floating Travel List */}
        {!selectedPlace && (
          <aside className="absolute bottom-5 left-4 right-4 z-10 rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-2xl backdrop-blur-xl md:bottom-auto md:left-10 md:right-auto md:top-32 md:w-[380px] md:rounded-[2rem] md:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500 md:text-[11px]">
                  Travel Points
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.05em] text-stone-900 md:text-2xl">
                  目前紀錄
                </h2>
              </div>

              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500 md:text-xs">
                {travelPlaces.length} pins
              </p>
            </div>

            {/* Region Tabs */}
            <div className="scrollbar-hide mt-5 overflow-x-auto">
              <div className="flex min-w-max gap-2">
                {groupedTravelPlaces.map((region) => {
                  const active = activeRegion === region.key;

                  return (
                    <button
                      key={region.key}
                      onClick={() => setActiveRegion(region.key)}
                      className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition md:text-xs ${
                        active
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-stone-300 bg-white/60 text-stone-600 hover:border-stone-600 hover:bg-white"
                      }`}
                    >
                      {region.zhLabel}
                      <span className="ml-2 opacity-60">
                        {region.places.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Region List */}
            <div className="scrollbar-hide mt-5 max-h-[34vh] space-y-2 overflow-y-auto pr-1 md:max-h-[48vh]">
              {activeRegionData.places.length > 0 ? (
                activeRegionData.places.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => setSelectedPlace(place)}
                    className="group w-full rounded-2xl border border-stone-200/70 bg-white/60 p-3 text-left transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white/90 hover:shadow-lg md:p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-stone-500">
                          {place.country}
                        </p>

                        <h3 className="mt-2 text-[14px] font-bold leading-6 tracking-[-0.02em] text-stone-900 md:text-[15px]">
                          {place.zhName}
                        </h3>

                        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-500 md:text-xs">
                          {place.name}
                        </p>

                        {place.title && (
                          <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">
                            {place.title}
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
                  <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                    {selectedPlace.country}
                  </p>

                  <h1 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-stone-900 md:mt-5 md:text-5xl">
                    {selectedPlace.title ?? selectedPlace.zhName}
                  </h1>

                  <p className="mt-4 text-sm uppercase tracking-[0.3em] text-stone-500">
                    {selectedPlace.name}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPlace(null)}
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