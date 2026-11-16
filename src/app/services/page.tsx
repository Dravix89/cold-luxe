import type { Metadata } from "next";
import Button from "@/components/Button";
import DigitalShowcase from "@/components/DigitalShowcase";
import Framed from "@/components/Framed";
import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Conception sur mesure, conseil privé, conciergerie et univers digital.",
};

const SERVICES = [
  {
    title: "Conception sur mesure",
    text: "Un projet dessiné autour de vous, de l’idée au dernier détail, avec des matériaux d’exception.",
  },
  {
    title: "Conseil privé",
    text: "Un expert dédié qui vous guide, structure vos choix et protège vos intérêts.",
  },
  {
    title: "Conciergerie",
    text: "Un suivi continu, disponible à tout moment, avec une discrétion totale.",
  },
  {
    title: "Architecture d’intérieur",
    text: "Mise en scène des volumes, lumière sur mesure et sélection de pièces rares.",
  },
  {
    title: "Direction artistique",
    text: "Cohérence esthétique globale, identité visuelle et scénographie de vos espaces.",
  },
  {
    title: "Acquisition & sourcing",
    text: "Recherche confidentielle d’objets d’art, de mobilier exclusif et de savoir-faire.",
  },
];

const STEPS = [
  { b: "Écoute.", t: "Un entretien privé pour comprendre vos attentes." },
  {
    b: "Conception.",
    t: "Esquisses, choix des matières et validation avec vous.",
  },
  {
    b: "Réalisation.",
    t: "Fabrication soignée, avec points d’étape réguliers.",
  },
  { b: "Livraison.", t: "Remise en main propre et suivi après livraison." },
];

export default function ServicesPage() {
  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.head}>
        <h1>Nos services</h1>
        <p>
          Six expertises complémentaires, pensées pour une clientèle exigeante.
        </p>
      </header>

      <section className={styles.band}>
        {SERVICES.map((s) => (
          <article key={s.title} className={styles.card}>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </article>
        ))}
      </section>

      <section className={styles.split}>
        <Framed
          src="/images/monstera.jpg"
          alt="Feuille dorée"
          width={708}
          height={835}
        />
        <div>
          <h2>Comment nous travaillons</h2>
          <ol className={styles.steps}>
            {STEPS.map((s) => (
              <li key={s.b}>
                <b>{s.b}</b> {s.t}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.digital}>
        <h2>Notre univers digital</h2>
        <p>
          Nous créons aussi des interfaces et des identités numériques dans le
          même esprit : sobres, lumineuses et précises.
        </p>
        <DigitalShowcase />
      </section>

      <section className={styles.cta}>
        <h2>Envie d’en savoir plus ?</h2>
        <p>Parlez-nous de votre projet, nous vous répondons sous 24 heures.</p>
        <Button href="/contact">Prendre rendez-vous</Button>
      </section>
    </div>
  );
}
