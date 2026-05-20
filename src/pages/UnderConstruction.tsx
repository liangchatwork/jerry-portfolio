import Header from "../components/Header";
import PageBackground from "../components/PageBackground";

type UnderConstructionProps = {
  title: string;
  subtitle: string;
};

export default function UnderConstruction({
  title,
  subtitle,
}: UnderConstructionProps) {
  return (
    <main className="relative min-h-screen bg-transparent text-stone-900">
      <PageBackground />

      <section className="relative min-h-screen overflow-hidden px-4 py-5 sm:px-6 md:px-10 md:py-8">
        {/* Top Bar */}
        <Header />

        {/* Construction Content */}
        <section className="flex min-h-[calc(100vh-7rem)] items-center justify-center">
          <div className="px-4 text-center">
            <p className="animate-fade-up text-xs uppercase tracking-[0.5em] text-stone-500">
              {title} / {subtitle}
            </p>

            <h1 className="animate-fade-up delay-100 mt-8 text-5xl font-black tracking-[-0.08em] text-stone-900 sm:text-6xl md:text-8xl">
              施工中...
            </h1>

            <p className="animate-fade-up delay-300 mt-8 text-sm uppercase tracking-[0.35em] text-stone-500">
              Coming Soon
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}