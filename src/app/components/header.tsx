"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./header.module.css";

const leftNavigation = [
  { label: "Início", href: "/" },
  { label: "Relógios", href: "/#shop" },
  { label: "Coleções", href: "/#collections" },
];

const rightNavigation = [
  { label: "Sobre", href: "/#about" },
  { label: "Contato", href: "/#contact" },
];

const mobileNavigation = [...leftNavigation, ...rightNavigation];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    const desktopMediaQuery = window.matchMedia("(min-width: 1100px)");
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
        <div className={styles.minuteTrack} aria-hidden='true' />

        <div className={styles.leftMeta} aria-hidden='true'>
          <span>AU-01</span>
          <span>PRECISION TIME</span>
        </div>

        <nav aria-label='Navegação principal' className={styles.desktopLeft}>
          <NavigationList items={leftNavigation} />
        </nav>

        <Link
          href='/'
          aria-label='Auro - página inicial'
          className={styles.logoDock}
          onClick={closeMenu}
        >
          <svg
            className={styles.logoPlate}
            viewBox='0 0 300 80'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <path
              fill='#e9e8e4'
              d='M 0 0 H 300 C 296 0 293 3 290 8 L 255 68 C 252 75 247 79 238 79 H 62 C 53 79 48 75 45 68 L 10 8 C 7 3 4 0 0 0 Z'
            />
          </svg>
          <span className={styles.logoHalo} aria-hidden='true' />
          <Image
            src='/auroLogoGreen.png'
            alt='Auro'
            width={100}
            height={38}
            priority
            className={styles.logo}
          />
          <span className={styles.logoIndex} aria-hidden='true'>
            12
          </span>
        </Link>

        <div className={styles.desktopRight}>
          <nav aria-label='Navegação secundária'>
            <NavigationList items={rightNavigation} />
          </nav>

          <div className={styles.actions}>
            <HeaderAction label='Buscar'>
              <Search size={17} strokeWidth={1.6} />
            </HeaderAction>
            <HeaderAction label='Carrinho'>
              <ShoppingBag size={17} strokeWidth={1.6} />
            </HeaderAction>
          </div>
        </div>

        <div className={styles.mobileActions}>
          <HeaderAction label='Buscar'>
            <Search size={17} strokeWidth={1.6} />
          </HeaderAction>

          <button
            type='button'
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setIsMenuOpen((open) => !open)}
            className={styles.menuButton}
          >
            <Menu
              size={19}
              className={isMenuOpen ? styles.iconHidden : styles.iconVisible}
            />
            <X
              size={19}
              className={isMenuOpen ? styles.iconVisible : styles.iconHidden}
            />
          </button>
        </div>

        <span className={styles.crown} aria-hidden='true'>
          <span />
          <span />
          <span />
        </span>
      </div>

      <nav
        id='mobile-navigation'
        aria-label='Navegação mobile'
        aria-hidden={!isMenuOpen}
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuDial} aria-hidden='true' />
        <p className={styles.mobileMenuEyebrow}>Auro / seleção</p>
        <ul>
          {mobileNavigation.map((item, index) => (
            <li
              key={item.label}
              className={isMenuOpen ? styles.mobileItemOpen : ""}
              style={{
                transitionDelay: isMenuOpen ? `${index * 65 + 180}ms` : "0ms",
              }}
            >
              <Link
                href={item.href}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
                <span className={styles.mobileLinkLine} aria-hidden='true' />
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter} aria-hidden='true'>
          <span>BR / 2026</span>
          <span>DESIGNED FOR YOUR TIME</span>
        </div>
      </nav>
    </header>
  );
}

function NavigationList({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <ul className={styles.navigationList}>
      {items.map((item, index) => (
        <li key={item.label}>
          <Link href={item.href}>
            <span>0{index + 1}</span>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HeaderAction({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button type='button' aria-label={label} className={styles.actionButton}>
      {children}
      <span>{label}</span>
    </button>
  );
}
