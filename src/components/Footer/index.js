"use client";

import React, { useEffect, useState } from "react";
import Socials from "../Socials";
import Button from "../Button";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "next-themes";

const getGradient = (theme) =>
  theme === "dark"
    ? "linear-gradient(to top, transparent 60%, #080810 100%), linear-gradient(to right, #080810 0%, #200b38 30%, #3d1060 50%, #200b38 70%, #080810 100%)"
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
  const textColor = currentTheme === "dark" ? "#e8e0f0" : "#2a1020";

  return (
    <footer
      className="w-full flex flex-col items-center mt-20"
      style={{ background: gradient, color: textColor }}
    >
      {/* SECTION CONTACT */}
      <div className="w-full flex flex-col items-center text-center px-6 py-16">
        <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
          {t.sections.collaborate1}
        </h2>
        <h2 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl font-bold">
          {t.sections.collaborate2}
        </h2>
        <div className="mt-6">
          <Button type="primary">{t.footer.scheduleSession}</Button>
        </div>
        <div className="mt-6">
          <Socials />
        </div>
      </div>

      {/* FOOTER BAS */}
      <div className="w-full px-8 py-4 flex items-center justify-center"
        style={{
          borderTop: currentTheme === "dark"
            ? "1px solid rgba(180,120,220,0.2)"
            : "1px solid rgba(220,120,150,0.25)",
        }}
      >
        <h3 className="text-sm font-bold">
          {t.footer.madeWith}{" "}
          <span className="underline underline-offset-2">Eloĩse</span>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;