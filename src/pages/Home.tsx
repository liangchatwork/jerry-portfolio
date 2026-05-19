import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {

    const base = import.meta.env.BASE_URL;
  
    return (
        <main className="min-h-screen bg-[#f4f1ea] text-stone-900">
        <section className="relative min-h-[100svh] overflow-hidden px-4 py-5 sm:px-6 md:px-10 md:py-8">
          {/* Top Bar */}
          <Header />
  
          {/* Main Visual */}
          <div className="absolute inset-x-4 bottom-6 top-40 overflow-hidden rounded-[1.5rem] animate-image-reveal delay-100 sm:top-36 md:inset-x-10 md:bottom-10 md:top-28 md:rounded-[2rem]">
            <img
              src={`${base}profile.jpg`}
              alt="Jerry in the mountains"
              className="h-full w-full object-cover object-[center_100%]"
            />
  
            <div className="absolute inset-0 bg-black/10" />
          </div>
  
          {/* Big Title */}
          <div className="relative z-10 flex min-h-[calc(100svh-6rem)] items-end pb-10 pl-5 animate-fade-up delay-300 sm:pl-8 md:pb-14 md:pl-12 lg:pb-16 lg:pl-16">
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
        </section>
        
        <Footer />
        
      </main>
    );
  }