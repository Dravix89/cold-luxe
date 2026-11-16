import styles from "./DigitalShowcase.module.css";

const Icon = ({ d }: { d: React.ReactNode }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {d}
  </svg>
);

/** Aperçu d'interface luxe, 100 % code (aucune image). */
export default function DigitalShowcase() {
  return (
    <div className={styles.wrap}>
      <div className={styles.mock}>
        <h4>PALETTE PREMIUM</h4>
        <div className={styles.tiles}>
          <div className={styles.tile}>
            <div className={styles.mini}>
              <span>Accueil</span>
              <span>Maison</span>
              <span>Services</span>
              <span>Contact</span>
            </div>
            <div className={styles.t} style={{ fontSize: 34 }}>
              COLD
            </div>
            <span className={styles.pill}>En savoir plus</span>
          </div>
          <div className={`${styles.tile} ${styles.g1}`}>
            <div className={styles.t} style={{ fontSize: 32 }}>
              Titre
            </div>
            <small>Un texte court, sobre et lumineux, posé sur l’or.</small>
          </div>
          <div className={styles.tile}>
            <div className={styles.t} style={{ fontSize: 20 }}>
              Recevez nos actualités
            </div>
            <span className={`${styles.pill} ${styles.pillFill}`}>
              S’abonner
            </span>
          </div>
          <div className={`${styles.tile} ${styles.g2}`}>
            <div className={styles.t} style={{ fontSize: 32 }}>
              À propos
            </div>
            <small>Une maison guidée par la précision et la discrétion.</small>
          </div>
          <div className={styles.tile}>
            <div className={styles.t} style={{ fontSize: 20 }}>
              Nos services
            </div>
            <div className={styles.ic}>
              <i>
                <Icon
                  d={<rect x="3" y="3" width="14" height="14" rx="2.5" />}
                />
              </i>
              <i>
                <Icon d={<circle cx="10" cy="10" r="7" />} />
              </i>
              <i>
                <Icon d={<path d="M10 2l8 8-8 8-8-8z" />} />
              </i>
            </div>
          </div>
          <div className={styles.tile}>
            <div className={styles.t} style={{ fontSize: 24 }}>
              Simple. Élégant. Moderne.
            </div>
            <span className={`${styles.pill} ${styles.pillFill}`}>
              Commencer
            </span>
          </div>
        </div>
      </div>

      <div className={styles.dash}>
        <div className={styles.glass}>
          <div className={styles.l}>Budget mensuel</div>
          <div className={styles.n}>7 500 €</div>
          <div className={styles.s}>
            <b>4 236 €</b> dépensés
          </div>
          <div className={styles.bar}>
            <i />
          </div>
          <div className={styles.s}>3 264 € restants</div>
        </div>
        <div className={styles.glass}>
          <div className={styles.l}>Investissements</div>
          <div className={styles.n}>22 470 €</div>
          <div className={styles.up}>+1 850 € ▲</div>
          <svg
            className={styles.sp}
            viewBox="0 0 200 70"
            preserveAspectRatio="none"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d="M0 62L22 44L42 52L65 30L88 38L112 22L135 40L160 18L200 4"
              stroke="#e6c786"
              strokeWidth="2"
            />
            <path
              d="M0 66L30 54L60 58L95 44L130 50L165 30L200 22"
              stroke="#997d2d"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className={`${styles.glass} ${styles.wide}`}>
          <div className={styles.l}>Comptes</div>
          <div className={styles.row}>
            <span className={styles.w}>
              <Icon
                d={<path d="M2 8l8-5 8 5M4 9v6M8 9v6M12 9v6M16 9v6M2 17h16" />}
              />
              Compte courant
            </span>
            <span>1 325,50 €</span>
          </div>
          <div className={styles.row}>
            <span className={styles.w}>
              <Icon
                d={
                  <>
                    <rect x="3" y="6" width="14" height="10" rx="2" />
                    <path d="M7 6V4h6v2" />
                  </>
                }
              />
              Épargne
            </span>
            <span>5 423,75 €</span>
          </div>
          <div className={styles.row}>
            <span className={styles.w}>
              <Icon
                d={
                  <>
                    <rect x="2" y="5" width="16" height="11" rx="2" />
                    <path d="M2 9h16" />
                  </>
                }
              />
              Carte de crédit
            </span>
            <span className={styles.neg}>-840,20 €</span>
          </div>
          <span className={styles.pill}>Tout voir</span>
        </div>
      </div>
    </div>
  );
}
