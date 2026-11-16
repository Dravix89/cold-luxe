import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Framed from "@/components/Framed";
import { SITE } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parlez-nous de votre projet. Réponse sous 24 heures.",
};

export default function ContactPage() {
  return (
    <div className={`container ${styles.page}`}>
      <section className={styles.split}>
        <Framed src="/images/mountains.jpg" alt="Lune dorée" width={604} height={844} priority />
        <div>
          <h1 className={styles.title}>Nous contacter</h1>
          <p>Décrivez votre projet. Nous vous répondons sous 24 heures.</p>
          <ContactForm />
          <ul className={styles.info}>
            <li><b>E-mail</b><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><b>Téléphone</b><a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a></li>
            <li><b>Horaires</b><span>{SITE.hours}</span></li>
            <li><b>Rendez-vous</b><span>Uniquement sur demande</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
