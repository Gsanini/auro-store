"use client";

import { ChevronDown, Menu, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./header.module.css";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/#shop", expandable: true },
  { label: "Feature", href: "/#feature" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const desktopMediaQuery = window.matchMedia("(min-width: 900px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    desktopMediaQuery.addEventListener("change", handleDesktopChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <Link
          href="/"
          aria-label="Auro - página inicial"
          className={styles.brand}
          onClick={closeMenu}
        >
          <Image
            src="/auroLogoWhite.png"
            alt="Auro"
            width={100}
            height={38}
            priority
            className={styles.logo}
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className={styles.desktopNavigation}
        >
          <NavigationLinks />
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            aria-label="Buscar"
            className={styles.iconButton}
          >
            <Search size={17} strokeWidth={1.8} />
          </button>
          <Link
            href="/cart"
            aria-label="Carrinho"
            className={styles.iconButton}
          >
            <ShoppingCart size={17} strokeWidth={1.8} />
          </Link>
          {/* <Link href="/#shop" className={styles.signup}>
            Sign Up
          </Link> */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={styles.menuButton}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Navegação mobile"
        aria-hidden={!isMenuOpen}
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <NavigationLinks
          isMobile
          isMenuOpen={isMenuOpen}
          onNavigate={closeMenu}
        />
        {/* <Link
          href="/#shop"
          tabIndex={isMenuOpen ? 0 : -1}
          className={styles.mobileSignup}
          onClick={closeMenu}
        >
          Sign Up
        </Link> */}
      </nav>
    </header>
  );
}

function NavigationLinks({
  isMobile = false,
  isMenuOpen = false,
  onNavigate,
}: {
  isMobile?: boolean;
  isMenuOpen?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <ul className={styles.navigationList}>
      {navigation.map((item, index) => (
        <li key={item.label}>
          <Link
            href={item.href}
            tabIndex={isMobile ? (isMenuOpen ? 0 : -1) : undefined}
            onClick={onNavigate}
          >
            {isMobile && (
              <span className={styles.mobileIndex}>0{index + 1}</span>
            )}
            <span className={styles.linkLabel}>
              {item.label}
              {item.expandable && (
                <ChevronDown size={10} strokeWidth={1.8} aria-hidden="true" />
              )}
            </span>
            {isMobile && (
              <span className={styles.mobileLinkLine} aria-hidden="true" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
