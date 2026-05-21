import { createContext, useContext, useEffect, useState } from "react";

type SlideshowContextType = {
  slides: string[];
  currentSlide: number;
  previousSlide: number | null;
};

const SlideshowContext = createContext<SlideshowContextType | null>(null);

function shuffleArray<T>(array: T[]) {
  const nextArray = [...array];

  for (let i = nextArray.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [nextArray[i], nextArray[randomIndex]] = [
      nextArray[randomIndex],
      nextArray[i],
    ];
  }

  return nextArray;
}

export function SlideshowProvider({ children }: { children: React.ReactNode }) {
  const [slides] = useState(() => {
    const base = import.meta.env.BASE_URL;

    const orderedSlides = Array.from(
      { length: 30 },
      (_, i) => `${base}profile-${i + 1}.jpg`
    );

    return shuffleArray(orderedSlides);
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => {
        setPreviousSlide(prev);
        return (prev + 1) % slides.length;
      });
    }, 10000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (previousSlide === null) return;

    const cleanup = window.setTimeout(() => {
      setPreviousSlide(null);
    }, 1600);

    return () => window.clearTimeout(cleanup);
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