import Button from "@/components/Button";
import Framed from "@/components/Framed";
import styles from "./page.module.css";

const VALUES = [
  { title: "Sur mesure", text: "Rien n’est standard. Chaque réalisation est dessinée autour de vos attentes et de votre exigence." },
  { title: "Discrétion", text: "Un cercle restreint, un interlocuteur unique et une confidentialité absolue à chaque étape." },
  { title: "Excellence", text: "Des matériaux nobles, un savoir-faire rare et une finition irréprochable, sans compromis." },
];

export default function HomePage() {
  return (
    <div className={`container ${styles.page}`}>
      <section className={`${styles.split} ${styles.hero}`}>
        <div className={styles.heroText}>
          <h1>L’élégance, dans sa forme la plus pure.</h1>
          <p>
            Une maison d’exception pour une clientèle qui exige le rare, le précis et le durable. Chaque projet est
            unique, chaque détail est maîtrisé.
          </p>
          <div className={styles.actions}>
            <Button href="/contact">Prendre rendez-vous</Button>
            <Button href="/services" variant="outline">Nos services</Button>
          </div>
        </div>
        <Framed src="/images/mountains.jpg" alt="Lune dorée sur des montagnes" width={604} height={844} priority />
      </section>

      <section className={styles.band} aria-label="Nos valeurs">
        {VALUES.map((v) => (
          <article key={v.title} className={styles.card}>
            <h3>{v.title}</h3>
            <p>{v.text}</p>
          </article>
        ))}
      </section>

      <section className={`${styles.split} ${styles.rev}`}>
        <Framed src="/images/monstera.jpg" alt="Feuille dorée sur fond vert" width={708} height={835} />
        <div>
          <h2>Le luxe du temps long</h2>
          <p>
            Nous croyons aux pièces qui se transmettent. Notre travail repose sur la patience, la précision et le
            respect des matières, pour créer des œuvres qui gagnent en valeur avec les années.
          </p>
          <div className={styles.goldBox}>
            <h3>Notre engagement</h3>
            <p>Un résultat à la hauteur de votre attente, ou nous reprenons le travail jusqu’à ce qu’il le soit.</p>
          </div>
        </div>
      </section>

      <section className={styles.quote}>
        <h2>Le vrai luxe est celui qu’on ne voit pas tout de suite.</h2>
        <p>Notre philosophie tient en une idée : la simplicité, poussée jusqu’à la perfection.</p>
      </section>

      <section className={styles.cta}>
        <h2>Parlons de votre projet</h2>
        <p>Un premier échange, sans engagement, pour comprendre ce que vous imaginez.</p>
        <Button href="/contact">Nous contacter</Button>
      </section>
    </div>
  );
}
