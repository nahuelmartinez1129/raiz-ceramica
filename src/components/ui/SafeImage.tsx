"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  /** Texto que se muestra en la alternativa visual si la foto no carga. */
  fallbackLabel?: string;
};

/**
 * next/image con una alternativa visual elegante si la fotografía falla
 * (URL rota, dominio caído o sin conexión).
 */
export function SafeImage({ fallbackLabel, alt, className, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
        className={`grain absolute inset-0 flex flex-col items-center justify-center gap-2 bg-sand text-center ${className ?? ""}`}
      >
        <span className="font-serif text-4xl text-terracotta" aria-hidden="true">
          raíz
        </span>
        {fallbackLabel ? (
          <span className="px-4 text-xs font-medium tracking-[0.18em] text-earth-soft uppercase">
            {fallbackLabel}
          </span>
        ) : null}
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} onError={() => setFailed(true)} />;
}
