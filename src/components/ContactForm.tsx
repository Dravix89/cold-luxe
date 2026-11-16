"use client";

import { useState, type FormEvent } from "react";
import Button from "./Button";
import styles from "@/app/contact/contact.module.css";

type Status = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Branchez ici votre API (Resend, Formspree, route Next.js, etc.)
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
    e.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <label htmlFor="name">Nom</label>
        <input id="name" name="name" type="text" required autoComplete="name" placeholder="Votre nom" />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" placeholder="vous@exemple.com" />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required placeholder="Décrivez votre projet" />
      </div>
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours" : "Envoyer le message"}
      </Button>
      <p className={styles.status} role="status" aria-live="polite">
        {status === "sent" ? "Message envoyé. Nous vous répondons sous 24 heures." : ""}
      </p>
    </form>
  );
}
