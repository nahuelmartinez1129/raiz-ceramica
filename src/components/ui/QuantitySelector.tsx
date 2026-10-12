"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  /** Nombre del producto, para etiquetas accesibles. */
  label: string;
  size?: "sm" | "md";
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  label,
  size = "md",
}: QuantitySelectorProps) {
  const button =
    size === "sm"
      ? "flex h-9 w-9 items-center justify-center"
      : "flex h-12 w-12 items-center justify-center";

  return (
    <div
      role="group"
      aria-label={`Cantidad de ${label}`}
      className="inline-flex items-center rounded-full border border-sand-deep bg-warm-white"
    >
      <button
        type="button"
        className={`${button} rounded-full text-earth transition-colors hover:bg-sand disabled:opacity-35 disabled:hover:bg-transparent`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Restar una unidad de ${label}`}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        aria-label={`${value} ${value === 1 ? "unidad" : "unidades"}`}
        className={`min-w-8 text-center font-semibold tabular-nums ${size === "sm" ? "text-sm" : "text-base"}`}
      >
        {value}
      </output>
      <button
        type="button"
        className={`${button} rounded-full text-earth transition-colors hover:bg-sand disabled:opacity-35 disabled:hover:bg-transparent`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Sumar una unidad de ${label}`}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
