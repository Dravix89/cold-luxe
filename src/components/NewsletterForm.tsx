"use client";

import { useState, type FormEvent } from "react";
import styles from "./Footer.module.css";

export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) return <p className={styles.thanks}>Merci, votre inscription est enregistrée.</p>;

  return (
    <form className={styles.news} onSubmit={onSubmit}>
      <label className="srOnly" htmlFor="news-email">Adresse e-mail</label>
      <input id="news-email" type="email" required placeholder="Votre e-mail" autoComplete="email" />
      <button type="submit">S’abonner</button>
    </form>
  );
}
