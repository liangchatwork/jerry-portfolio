export default function Footer({ light = false }: { light?: boolean }) {
  return (
    <footer className="relative z-20 px-10 py-6 text-center">
      <p
        className={`text-[11px] uppercase tracking-[0.35em] ${
          light ? "text-white/75" : "text-stone-500"
        }`}
      >
        © 2026 A-Hsun Jerry Liang. All Rights Reserved.
      </p>
    </footer>
  );
}