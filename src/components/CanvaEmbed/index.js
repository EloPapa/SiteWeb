import React from "react";

const CANVA_URLS = {
  fr: "https://www.canva.com/design/DAHIEVkSkZc/ofmY5fjC9RyOVqU1AepXZg/view", // 🔁 Remplacez par votre URL FR
  en: "https://www.canva.com/design/DAHIR2XINww/-dKDsR_qOfotl3mX082d0g/view", // 🔁 Remplacez par votre URL EN
};

export default function CanvaEmbed({ lang = "en" }) {
  const url = CANVA_URLS[lang] ?? CANVA_URLS.en;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingTop: "135%",
        boxShadow: "0 2px 8px rgba(63,69,81,0.16)",
        marginTop: "0em",
        marginBottom: "0em",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <iframe
        loading="lazy"
        src={url}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          border: "none",
        }}
        allowFullScreen
        title={`Canva portfolio ${lang.toUpperCase()}`}
      />
    </div>
  );
}