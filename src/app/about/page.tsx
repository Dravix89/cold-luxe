import type { Metadata } from "next";
import Button from "@/components/Button";
import Framed from "@/components/Framed";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez la maison COLD : notre histoire, notre vision et nos valeurs.",
};

const STATS = [
  { n: "25", l: "ans d’expertise" },
  { n: "400", l: "projets signés" },
  { n: "1", l: "interlocuteur dédié" },
];

const PILLARS = [
  {
    title: "Notre vision",
    text: "Allier l’héritage du savoir-faire et la précision contemporaine pour créer des œuvres intemporelles.",
  },
  {
    title: "Nos valeurs",
    text: "Exigence, sincérité et respect du client. Nous préférons faire moins, mais mieux.",
  },
  {
    title: "Notre équipe",
    text: "Une trentaine d’experts réunis autour de chaque projet, coordonnés par un référent unique.",
  },
];

export default function AboutPage() {
  return (
    <div className={`container ${styles.page}`}>
      <section className={`${styles.split} ${styles.rev}`}>
        <Framed
          src="/images/dandelion.jpg"
          alt="Pissenlit doré sur fond vert"
          width={700}
          height={949}
          priority
        />
        <div>
          <h1 className={styles.title}>Notre maison</h1>
          <p>
            Fondée sur le goût de la précision, notre maison conçoit chaque
            projet comme une pièce unique. Depuis plus de vingt ans, nous
            accompagnons une clientèle exigeante avec la même rigueur et la même
            discrétion.
          </p>
          <p className={styles.gap}>
            Notre équipe réunit des artisans, des designers et des conseillers
            qui partagent une conviction : le détail fait la différence.
          </p>
          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.l}>
                <dt>{s.n}</dt>
                <dd>{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.band}>
        {PILLARS.map((p) => (
          <article key={p.title} className={styles.card}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.split}>
        <div>
          <h2>Une promesse simple</h2>
          <p>
            Un service discret, un résultat irréprochable et un accompagnement
            personnel, du premier échange jusqu’à la livraison et au-delà.
          </p>
          <div className={styles.goldBox}>
            <h3>Au-delà de la livraison</h3>
            <p>
              Entretien, suivi et conseil restent à votre disposition aussi
              longtemps que vous le souhaitez.
            </p>
          </div>
          <Button href="/contact" variant="outline">
            Rencontrer l’équipe
          </Button>
        </div>
        <Framed
          src="/images/mountains.jpg"
          alt="Montagnes et lune dorée"
          width={604}
          height={844}
        />
      </section>
    </div>
  );
}
