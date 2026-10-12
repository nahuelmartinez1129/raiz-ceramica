import Link from "next/link";

interface LogoProps {
  className?: string;
  /** Variante clara para fondos oscuros. */
  inverted?: boolean;
  onNavigate?: () => void;
}

export function Logo({ className = "", inverted = false, onNavigate }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Raíz Cerámica, ir al inicio"
      className={`group inline-flex flex-col items-start leading-none ${className}`}
    >
      <span
        className={`font-serif text-[2.1rem] font-medium tracking-tight transition-colors duration-300 ${
          inverted ? "text-warm-white" : "text-earth group-hover:text-terracotta-deep"
        }`}
      >
        ra<span className={inverted ? "text-sand" : "text-terracotta"}>í</span>z
      </span>
      <span
        className={`mt-0.5 text-[0.55rem] font-semibold tracking-[0.32em] ${
          inverted ? "text-sand" : "text-earth-soft"
        }`}
      >
        CERÁMICA ARTESANAL
      </span>
    </Link>
  );
}
