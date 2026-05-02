import MultiplicationGame from "@/components/MultiplicationGame/index.js";
import Link from "next/link";

export const metadata = {
  title: "Tables de multiplication",
};

export default function MultiplicationPage() {
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

        {/* Bouton retour */}
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
          ← Portfolio
        </Link>

        {/* Ligne dorée */}
        <div style={{ height: "3px", background: "#a07a3a", marginBottom: "1.5rem", borderRadius: "2px" }} />

        <MultiplicationGame />

      </div>
    </main>
  );
}
