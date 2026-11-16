"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS } from "@/lib/site";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const update = () => {
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY.current;
      setScrolled(y > 24);
      if (!openRef.current) {
        if (y < 90) setHidden(false);
        else if (delta > 6) setHidden(true); // le contenu passe derrière : la navbar s'efface
        else if (delta < -6) setHidden(false); // on remonte : elle revient
      }
      if (Math.abs(delta) > 6 || y < 90) lastY.current = y;
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`${styles.header} ${hidden && !open ? styles.hidden : ""} ${scrolled ? styles.scrolled : ""}`}
      >
        <nav className={styles.bar} aria-label="Navigation principale">
          <Link href="/" className={styles.logo} onClick={close} aria-label="COLD, accueil">
            <Logo size={40} />
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${isActive(l.href) ? styles.active : ""}`}
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/contact" className={styles.cta}>
            Rendez-vous
          </Link>

          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        <span className={styles.line} aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`} aria-hidden={!open}>
        <ul className={styles.mobileLinks}>
          {NAV_LINKS.map((l, i) => (
            <li key={l.href} style={{ ["--i" as string]: i }}>
              <Link
                href={l.href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className={`${styles.mobileLink} ${isActive(l.href) ? styles.mobileActive : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileFoot} style={{ ["--i" as string]: NAV_LINKS.length }}>
          <Link href="/contact" onClick={close} tabIndex={open ? 0 : -1} className={styles.mobileCta}>
            Prendre rendez-vous
          </Link>
          <p>Du lundi au samedi, 10h à 19h</p>
        </div>
      </div>
    </>
  );
}
