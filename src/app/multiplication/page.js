"use client";

import { useState } from "react";
import MultiplicationGame from "@/components/MultiplicationGame";
import Link from "next/link";

export default function MultiplicationPage() {
  const [lang, setLang] = useState("fr");

  const t = {
    fr: { retour: "← Retour au portfolio" },
    en: { retour: "← Return to portfolio" },
  }[lang];

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "#e9e9e7",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Bouton retour dynamique */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "#7a5a2a",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.06em",
            marginBottom: "1.5rem",
          }}
        >
          {t.retour}
        </Link>

        {/* Ligne */}
        <div style={{
          height: "3px",
          background: "#a07a3a",
          marginBottom: "1.5rem",
          borderRadius: "2px"
        }} />

        {/* Jeu */}
        <MultiplicationGame lang={lang} setLang={setLang} />

      </div>
    </main>
  );
}
