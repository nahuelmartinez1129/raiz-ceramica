"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { navLinks } from "@/config/site";
import { CartButton } from "@/components/cart/CartButton";
import { Logo } from "@/components/ui/Logo";
import { isActiveLink } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled
            ? "border-sand bg-cream/90 shadow-[0_8px_30px_rgb(64_53_46/0.06)] backdrop-blur-md"
            : "border-transparent bg-cream"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 sm:h-20">
          <Logo />

          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => {
                const active = isActiveLink(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="link-underline py-2 text-sm font-medium tracking-wide text-earth"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-earth transition-colors hover:bg-sand md:hidden"
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
