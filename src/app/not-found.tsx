export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#090807] text-[#eee9df]">
      <h2 className="text-2xl font-light tracking-widest font-serif mb-4">404 — NOT FOUND</h2>
      <p className="text-sm text-[#aaa094] mb-8">The requested creation could not be found.</p>
      <a
        href="/"
        className="px-6 py-2 border border-white/20 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
      >
        Return to Atelier
      </a>
    </div>
  );
}
