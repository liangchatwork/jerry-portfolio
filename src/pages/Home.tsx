import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {

    const base = import.meta.env.BASE_URL;
  
    return (
        <main className="min-h-screen bg-[#eef2f0] text-stone-900">
        <section className="relative min-h-[100svh] overflow-hidden px-4 py-5 sm:px-6 md:px-10 md:py-8">
          {/* Top Bar */}
          <Header light />
  
          {/* Main Visual */}
          <div className="absolute inset-0 animate-image-reveal delay-100">
            <img
              src={`${base}profile.jpg`}
              alt="Jerry in the mountains"
              className="h-full w-full object-cover object-[center_100%]"
            />

            <div className="absolute inset-0 bg-black/20" />
          </div>
  
          {/* Big Title */}
          <div className="relative z-10 flex min-h-[calc(100svh-6rem)] items-end pb-28 pl-5 animate-fade-up delay-300 sm:pl-8 md:pb-24 md:pl-12 lg:pb-28 lg:pl-16">
            <div>
              <h1 className="text-[18vw] font-black uppercase leading-[0.96] tracking-[-0.025em] text-white sm:text-[14vw] md:text-[8vw] lg:text-[6.6vw]">
                阿昏
                <br />
                Jerry
              </h1>
  
              <p className="mt-5 text-sm uppercase tracking-[0.45em] text-white/85 md:text-base animate-fade-up delay-500">
                A-Hsun Jerry
              </p>
            </div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 z-20 block md:block">
            <Footer light />
          </div>
        </section>
        
      </main>
    );
  }