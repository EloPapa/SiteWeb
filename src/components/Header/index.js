"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTheme } from "next-themes";

import Button from "../Button";
import data from "../../data/portfolio.json";
import { useLanguage } from "../../context/LanguageContext";

const Header = ({ handleWorkScroll, handleAboutScroll, handlePortfolioScroll }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const { name, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "dark";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* MOBILE */}
      <Popover className="block tablet:hidden w-full">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between px-2 h-[60px]">
              <h1 onClick={() => router.push("/")} className="cursor-pointer">
                {name}.
              </h1>

              <div className="flex items-center gap-2">
                <Button onClick={toggle}>
                  {lang === "fr" ? "EN" : "FR"}
                </Button>

                {darkMode && (
                  <Button onClick={toggleTheme}>
                    {currentTheme === "dark" ? "🌙" : "☀️"}
                  </Button>
                )}

                <PopoverButton>☰</PopoverButton>
              </div>
            </div>

            <PopoverPanel className="absolute right-2 z-10 p-4 bg-white rounded shadow">
              <div className="flex flex-col gap-2">
                <Button onClick={handlePortfolioScroll}>
                  {t.nav.portfolio}
                </Button>

                <Button onClick={handleAboutScroll}>
                  {t.nav.about}
                </Button>

                <Button
                  onClick={() =>
                    window.open("mailto:ericbergeron2000@gmail.com")
                  }
                >
                  {t.nav.contact}
                </Button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* DESKTOP */}
      <div className="hidden tablet:flex justify-between items-center p-6 sticky top-0 z-10 bg-white">
        <h1 onClick={() => router.push("/")} className="cursor-pointer">
          {name}.
        </h1>

        <div className="flex gap-3 items-center">
          <Button onClick={handlePortfolioScroll}>
            {t.nav.portfolio}
          </Button>

          <Button onClick={handleAboutScroll}>
            {t.nav.about}
          </Button>

          <Button
            onClick={() =>
              window.open("mailto:ericbergeron2000@gmail.com")
            }
          >
            {t.nav.contact}
          </Button>

          <Button onClick={toggle}>
            {lang === "fr" ? "EN" : "FR"}
          </Button>

          {darkMode && (
            <Button onClick={toggleTheme}>
              {currentTheme === "dark" ? "🌙" : "☀️"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;