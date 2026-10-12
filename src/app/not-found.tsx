import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="grain container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl leading-tight text-earth sm:text-6xl">
        Esta pieza no está en el taller
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-earth-soft">
        Puede que el enlace haya cambiado o que el producto ya no forme parte de la colección.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/catalogo" className="btn btn-primary">
          Ir al catálogo
        </Link>
        <Link href="/" className="btn btn-outline">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
