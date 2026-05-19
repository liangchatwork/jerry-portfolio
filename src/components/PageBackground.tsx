import { useSlideshow } from "./SlideshowContext";

export default function PageBackground() {
  const base = import.meta.env.BASE_URL;

  const { slides, currentSlide, previousSlide } = useSlideshow();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {previousSlide !== null && (
        <img
          key={`previous-${previousSlide}`}
          src={slides[previousSlide]}
          alt="Previous blurred background"
          className="absolute inset-0 z-10 h-[112%] w-full object-cover object-center blur-md animate-slide-fade-out"
        />
      )}

      <img
        key={`current-${currentSlide}`}
        src={slides[currentSlide]}
        alt="Current blurred background"
        className="absolute inset-0 z-0 h-[112%] w-full object-cover object-center blur-md animate-slide-current"
      />

      <div className="absolute inset-0 z-20 bg-[#eef2f0]/70" />
      <div className="absolute inset-0 z-30 bg-black/10" />
    </div>
  );
}