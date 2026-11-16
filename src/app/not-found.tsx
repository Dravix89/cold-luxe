import Button from "@/components/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <p className={styles.code}>404</p>
      <h1>Page introuvable</h1>
      <p className={styles.text}>La page que vous cherchez n’existe pas ou a été déplacée.</p>
      <Button href="/">Retour à l’accueil</Button>
    </div>
  );
}
