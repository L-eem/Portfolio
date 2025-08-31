'use client';

export default function NeoButton({ children, href, className: extra }: { children: React.ReactNode; href?: string; className?: string }) {
  const base =
    "relative inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium " +
    "bg-gradient-to-r from-[--color-iris-500] via-[--color-plasma-500] to-[--color-aqua-400] text-white " +
    "shadow-[0_0_24px_rgba(167,139,250,0.35)] transition " +
    "hover:shadow-[0_0_40px_rgba(167,139,250,0.55)] focus:outline-none " +
    "animate-gradient-x";
  const className = extra ? base + " " + extra : base;
  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return <button className={className}>{children}</button>;
}




