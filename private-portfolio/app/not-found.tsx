export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-[--color-cosmic-950] via-[--color-void-950] to-black text-slate-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-2 text-slate-300">This page drifted into deep space.</p>
        <a href="/" className="mt-4 inline-block rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-white/90 hover:bg-white/15">Return home</a>
      </div>
    </main>
  );
}


