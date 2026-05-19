import { createContext, useContext, useEffect, useState } from "react";

type SlideshowContextType = {
  slides: string[];
  currentSlide: number;
  previousSlide: number | null;
};

const SlideshowContext = createContext<SlideshowContextType | null>(null);

export function SlideshowProvider({ children }: { children: React.ReactNode }) {
  const base = import.meta.env.BASE_URL;

  const slides = Array.from(
    { length: 30 },
    (_, i) => `${base}profile-${i + 1}.jpg`
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        setPreviousSlide(prev);
        return (prev + 1) % slides.length;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (previousSlide === null) return;

    const cleanup = setTimeout(() => {
      setPreviousSlide(null);
    }, 1600);

    return () => clearTimeout(cleanup);
  }, [previousSlide]);

  return (
    <SlideshowContext.Provider
      value={{
        slides,
        currentSlide,
        previousSlide,
      }}
    >
      {children}
    </SlideshowContext.Provider>
  );
}

export function useSlideshow() {
  const context = useContext(SlideshowContext);

  if (!context) {
    throw new Error("useSlideshow must be used inside SlideshowProvider");
  }

  return context;
}