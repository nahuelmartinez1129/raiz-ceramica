/** Indica si un enlace de navegación corresponde a la página actual. */
export function isActiveLink(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
