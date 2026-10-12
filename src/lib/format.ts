/**
 * Formatea un precio en pesos argentinos: 39000 -> "$39.000".
 * Se implementa sin Intl para que el resultado sea idéntico en servidor
 * y navegador (evita diferencias de hidratación por la configuración regional).
 */
export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}$${digits}`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`;
}
