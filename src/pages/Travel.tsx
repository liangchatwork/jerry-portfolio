import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { travelPlaces } from "../data/travelPlaces";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

type TravelPlace = (typeof travelPlaces)[number];

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

  const showFooter = !selectedPlace && mapZoom <= 2.2;

  return (
    <main className="min-h-screen overflow-hidden bg-[#dcecf3] text-stone-900">
      <section className="relative min-h-screen overflow-hidden px-5 py-6 md:px-10 md:py-8">
        <Header map/>

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