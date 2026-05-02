"use client";

import React from "react";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-nunito",
  axes: ["wdth"],
});

const YOUTUBE_URL = "https://www.youtube.com/@HappyEloiseB";
const MULTIPLICATION_URL = "/multiplication";

const TRANSLATIONS = {
  fr: {
    title: "PORTFOLIO",
    topQuote: "JE NE PERDS JAMAIS,  SOIT JE GAGNE,",
    bottomQuote: "SOIT J\u2019APPRENDS",
    author: "- Nelson Mandela",
    alt: {
      medal: "Eloïse avec sa médaille des Jeux de Montréal 2025",
      horse: "Eloïse à cheval en saut d'obstacle",
      cat: "Chat en équilibre - agilité",
      tablet: "Jeu des tables de multiplication",
    },
    ariaLink: "Voir la chaîne YouTube HappyEloiseB",
    ariaTablet: "Jouer aux tables de multiplication",
  },
  en: {
    title: "PORTFOLIO",
    topQuote: "I NEVER LOSE,  EITHER I WIN,",
    bottomQuote: "OR I LEARN",
    author: "- Nelson Mandela",
    alt: {
      medal: "Eloïse with her Jeux de Montréal 2025 medal",
      horse: "Eloïse riding - show jumping",
      cat: "Cat balancing - agility",
      tablet: "Multiplication tables game",
    },
    ariaLink: "Watch HappyEloiseB YouTube channel",
    ariaTablet: "Play the multiplication tables game",
  },
};

function YouTubeIcon({ size = 36 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        fill="#FF0000"
        d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.12C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.386.566A2.997 2.997 0 0 0 .502 6.186C0 8.06 0 12 0 12s0 3.94.502 5.814a2.997 2.997 0 0 0 2.112 2.12C4.48 20.5 12 20.5 12 20.5s7.52 0 9.386-.566a2.997 2.997 0 0 0 2.112-2.12C24 15.94 24 12 24 12s0-3.94-.502-5.814z"
      />
      <path fill="#FFFFFF" d="M9.75 15.568V8.432L15.818 12 9.75 15.568z" />
    </svg>
  );
}

function PortfolioCard({
  src,
  alt,
  ariaLabel,
  href,
  external = true,
  cardStyle = {},
  showYoutubeBadge = false,
  badgeSize = 36,
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      style={{
        position: "relative",
        display: "block",
        overflow: "hidden",
        borderRadius: "4px",
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        outline: "none",
        ...cardStyle,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.25)";
        const img = e.currentTarget.querySelector("img");
        if (img) {
          img.style.transform = "scale(1.06)";
          img.style.filter = "brightness(0.85)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        const img = e.currentTarget.querySelector("img");
        if (img) {
          img.style.transform = "scale(1)";
          img.style.filter = "brightness(1)";
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.3s ease, filter 0.3s ease",
        }}
      />
      {showYoutubeBadge && (
        <span
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            width: `${badgeSize}px`,
            height: `${badgeSize}px`,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <YouTubeIcon size={badgeSize} />
        </span>
      )}
    </a>
  );
}

export default function Portfolio({ lang = "fr" }) {
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.fr;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "1rem 0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#e9e9e7",
          borderRadius: "8px",
          padding: "2rem 2rem 1.5rem",
          boxShadow: "0 2px 8px rgba(63,69,81,0.16)",
          fontFamily: nunitoSans.style.fontFamily,
          color: "#2b2b2b",
          boxSizing: "border-box",
        }}
      >
        {/* Barre dorée supérieure */}
        <div style={{ height: "3px", width: "100%", background: "#a07a3a", marginBottom: "1.25rem" }} />

        {/* Titre */}
        <h2
          style={{
            fontFamily: nunitoSans.style.fontFamily,
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            color: "#a07a3a",
            letterSpacing: "0.02em",
            lineHeight: 1,
            margin: "0 0 0.5rem 0",
          }}
        >
          {t.title}
        </h2>

        <p
          style={{
            fontSize: "clamp(0.85rem, 2.2vw, 1.1rem)",
            letterSpacing: "0.08em",
            color: "#7a5a2a",
            margin: "0 0 1.25rem 0",
            fontWeight: 700,
            fontFamily: nunitoSans.style.fontFamily,
            fontStretch: "expanded",
          }}
        >
          {t.topQuote}
        </p>

        {/* Grille 2 colonnes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "16px", alignItems: "start" }}>

          {/* Colonne gauche */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", alignItems: "flex-start" }}>
            <PortfolioCard
              src="/images/portfolio/medal.jpg"
              alt={t.alt.medal}
              ariaLabel={t.ariaLink}
              href={YOUTUBE_URL}
              external={true}
              cardStyle={{ width: "100%", aspectRatio: "3 / 4" }}
            />
            <div style={{ display: "flex", flexDirection: "column", width: "65%" }}>
              <PortfolioCard
                src="/images/portfolio/cat.png"
                alt={t.alt.cat}
                ariaLabel={t.ariaLink}
                href={YOUTUBE_URL}
                external={true}
                cardStyle={{ width: "145%", aspectRatio: "1.4 / 1" }}
              />
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.ariaLink}
                style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: "6px", paddingLeft: "2px" }}
              >
                <YouTubeIcon size={84} />
              </a>
            </div>
          </div>

          {/* Colonne droite */}
          <div style={{ display: "flex", flexDirection: "column", gap: "22px", alignItems: "stretch", paddingTop: "0px" }}>
            <PortfolioCard
              src="/images/portfolio/horse.png"
              alt={t.alt.horse}
              ariaLabel={t.ariaLink}
              href={YOUTUBE_URL}
              external={true}
              cardStyle={{ width: "90%", aspectRatio: "4 / 4", alignSelf: "flex-start" }}
            />

            {/* Tablette → jeu de multiplication */}
            <div style={{ position: "relative", width: "100%" }}>
              <PortfolioCard
                src="/images/portfolio/tablet.png"
                alt={t.alt.tablet}
                ariaLabel={t.ariaTablet}
                href={MULTIPLICATION_URL}
                external={false}
                cardStyle={{ width: "100%", aspectRatio: "2 / 3" }}
              />
              {/* Badge indicateur */}
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#a07a3a",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  pointerEvents: "none",
                  fontFamily: nunitoSans.style.fontFamily,
                }}
              >
                JOUER →
              </span>
            </div>
          </div>
        </div>

        {/* Citation Mandela */}
        <div style={{ marginTop: "1.25rem", paddingTop: "0.25rem" }}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "clamp(0.95rem, 2.2vw, 1.2rem)",
              letterSpacing: "0.08em",
              color: "#7a5a2a",
              fontWeight: 700,
              fontFamily: nunitoSans.style.fontFamily,
              fontStretch: "expanded",
              margin: 0,
            }}
          >
            {t.bottomQuote}
            <span style={{ flex: 1, height: "2px", background: "#a07a3a", display: "inline-block" }} />
          </p>
          <p style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)", color: "#4a4a4a", margin: "0.25rem 0 0 0", fontStyle: "italic" }}>
            {t.author}
          </p>
        </div>
      </div>
    </div>
  );
}