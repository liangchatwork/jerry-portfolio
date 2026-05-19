export default function PageBackground() {
    const base = import.meta.env.BASE_URL;
  
    return (
      <div className="fixed inset-0 -z-10">
        <img
          src={`${base}profile.jpg`}
          alt="Snow mountain background"
          className="h-full w-full object-cover object-[center_100%]"
        />
  
        <div className="absolute inset-0 bg-[#f4f1ea]/70 backdrop-blur-md" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    );
  }