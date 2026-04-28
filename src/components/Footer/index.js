"use client";

import React, { useEffect, useState } from "react";
import Socials from "../Socials";
import Button from "../Button";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "next-themes";

const getGradient = (theme) =>
  theme === "dark"
    ? "linear-gradient(to top, transparent 60%, #080810 100%), linear-gradient(to right, #080810 0%, #0f0a18 30%, #1a0d28 50%, #0f0a18 70%, #080810 100%)"
    : "linear-gradient(to top, transparent 60%, #fef2f5 100%), linear-gradient(to right, #fef2f5 0%, #f9d0de 30%, #f5b8cc 50%, #f9d0de 70%, #fef2f5 100%)";

const Footer = () => {
  const { t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "dark";
  const gradient = getGradient(currentTheme);

  return (
    <footer className="w-full flex justify-center mt-20">
      
      {/* CONTAINER CENTRÉ (comme un header classique) */}
      <div className="w-full max-w-6xl px-6 flex flex-col items-center text-center">
        
        {/* SECTION CONTACT */}
        <div className="flex flex-col items-center">
          
          <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
            {t.sections.collaborate1}
          </h2>

          <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
            {t.sections.collaborate2}
          </h2>

          <div className="mt-6">
            <Button type="primary">
              {t.footer.scheduleSession}
            </Button>
          </div>

          <div className="mt-6">
            <Socials />
          </div>
        </div>

        {/* FOOTER BAS */}
        <div className="w-full mt-16">
          <h3
            style={{ background: gradient }}
            className="text-sm font-bold p-8 text-center rounded-lg"
          >
            {t.footer.madeWith}{" "}
            <span className="underline underline-offset-2">
              Eloĩse
            </span>
          </h3>
        </div>

      </div>
    </footer>
  );
};

export default Footer;