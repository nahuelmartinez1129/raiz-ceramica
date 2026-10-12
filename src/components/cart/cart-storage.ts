import type { CartLine } from "@/types";

const STORAGE_KEY = "raiz-ceramica:cart:v1";

/**
 * Persistencia opcional del carrito. Solo guarda identificadores y cantidades
 * (nunca datos personales). Si localStorage no está disponible, falla o
 * contiene datos inválidos, el carrito simplemente arranca vacío.
 */
export function readStoredCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
}

export function writeStoredCart(lines: CartLine[]): void {
  try {
    if (lines.length === 0) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }
  } catch {
    // Almacenamiento lleno, deshabilitado o modo privado: el carrito sigue en memoria.
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === "string" &&
    typeof line.quantity === "number" &&
    Number.isInteger(line.quantity) &&
    line.quantity > 0
  );
}
