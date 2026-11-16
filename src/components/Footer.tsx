import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import { NAV_LINKS, SITE } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo size={46} />
            <p>
              Une maison guidée par la précision, la discrétion et le goût du
              détail.
            </p>
          </div>

          <nav className={styles.col} aria-label="Pied de page">
            <h4>Navigation</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                  {SITE.phone}
                </a>
              </li>
              <li>{SITE.address}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Recevez nos actualités</h4>
            <NewsletterForm />
          </div>
        </div>

        <div className={styles.word} aria-hidden="true">
          COLD
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} COLD. Tous Droits Réservés.</span>
          <div>
            <a href="#top" className={styles.up} aria-label="Retour en haut">
              <span>Haut</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M12 19V5M5 12l7-7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
