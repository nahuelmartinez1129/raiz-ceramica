import type { ProductBadge as Badge } from "@/types";

const styles: Record<Badge, string> = {
  Nuevo: "bg-warm-white text-earth",
  "Más elegido": "bg-terracotta-deep text-warm-white",
  "Edición limitada": "bg-olive-deep text-warm-white",
};

export function ProductBadge({ badge, className = "" }: { badge: Badge; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.12em] uppercase shadow-sm ${styles[badge]} ${className}`}
    >
      {badge}
    </span>
  );
}
