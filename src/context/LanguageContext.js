"use client";
import { createContext, useContext, useState } from "react";

const fr = {
  nav: {
    passions: "Passions",
    about: "À propos",
    contact: "Contact",
    blog: "Blog",
    resume: "CV",
    home: "Accueil",
    portfolio: "Portfolio" 
  },
  sections: {
    passions: "Passions.",
    about: "À propos.",
    contact: "Contact.",
    collaborate1: "COLLABORONS",
    collaborate2: "ENSEMBLE",
  },
  footer: {
    scheduleSession: "Planifier une session",
    madeWith: "Fait avec ❤ par",
  },
};

const en = {
  nav: {
    passions: "Passions",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    resume: "Resume",
    home: "Home",
    portfolio: "Portfolio" 
  },
  sections: {
    passions: "Passions.",
    about: "About.",
    contact: "Contact.",
    collaborate1: "LET'S COLLABORATE",
    collaborate2: "TOGETHER",
  },
  footer: {
    scheduleSession: "Schedule a session",
    madeWith: "Made with ❤ by",
  },
};

const translations = { fr, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("fr");
  const t = translations[lang];
  const toggle = () => setLang((l) => (l === "fr" ? "en" : "fr"));

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
