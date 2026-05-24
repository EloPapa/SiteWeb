"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTheme } from "next-themes";

import Button from "../Button";
import data from "../../data/portfolio.json";
import { useLanguage } from "../../context/LanguageContext";

const getGradient = (theme) =>
  theme === "dark"
    ? "linear-gradient(to bottom, transparent 60%, #080810 100%), linear-gradient(to right, #080810 0%, #1a0a2e 30%, #2d0f45 50%, #1a0a2e 70%, #080810 100%)"
    : "linear-gradient(to bottom, transparent 60%, #fef2f5 100%), linear-gradient(to right, #fef2f5 0%, #f9d0de 30%, #f5b8cc 50%, #f9d0de 70%, #fef2f5 100%)";

const ThemeButton = ({ darkMode, mounted, currentTheme, onToggle }) => {
  if (!darkMode || !mounted) return null;
  return (
    <Button onClick={onToggle}>
      {/* h-6 → xl: h-6*1.25 ≈ h-8  (7.5→ use h-8) */}
      <img
        className="h-6 xl:h-[2.8rem] cursor-default"
        src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
        alt="theme icon"
      />
    </Button>
  );
};

const MenuIcon = ({ open, mounted, currentTheme }) => {
  if (!mounted) return <span className="h-5 w-5 block" />;
  const src = !open
    ? currentTheme === "dark"
      ? "menu-dark.svg"
      : "menu-white.svg"
    : "cancel-white.svg";

  return (
    <img
      className="h-5 cursor-default"
      alt="menu icon"
      src={`/images/${src}`}
    />
  );
};

const Header = ({ handleWorkScroll, handleAboutScroll, handlePortfolioScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const { name, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "dark";
  const gradient = getGradient(currentTheme);
  const textColor = currentTheme === "dark" ? "#e8e0f0" : "#2a1020";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const nameStyleMobile = {
    color: textColor,
    fontFamily: "'Amsterdam', cursive",
    fontSize: "1rem",
    paddingLeft: "0.5rem",
  };

  const nameStyleDesktop = {
    color: textColor,
    fontFamily: "'Amsterdam', cursive",
    fontSize: "1.25rem",
    paddingLeft: "0.5rem",
  };

  // 2rem * 1.25 = 2.5rem
  const nameStyleXL = {
    color: textColor,
    fontFamily: "'Amsterdam', cursive",
    fontSize: "2.5rem",
    paddingLeft: "0.9rem",
  };

  return (
    <>
      {/* 📱 MOBILE */}
      <Popover
        className="block tablet:hidden w-full"
        style={{ background: gradient }}
      >
        {({ open }) => (
          <>
            <div
              className="flex items-center justify-between px-1"
              style={{ height: "60px" }}
            >
              <div className="flex items-center gap-2">
                <h1
                  onClick={() => router.push("/")}
                  className="font-medium cursor-default name"
                  style={nameStyleMobile}
                >
                  {name}.
                </h1>
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/images/elo/singe.png"
                    alt="singe"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={toggle}>
                  {lang === "fr" ? "EN" : "FR"}
                </Button>

                <ThemeButton
                  darkMode={darkMode}
                  mounted={mounted}
                  currentTheme={currentTheme}
                  onToggle={toggleTheme}
                />

                <PopoverButton className="cursor-default">
                  <MenuIcon
                    open={open}
                    mounted={mounted}
                    currentTheme={currentTheme}
                  />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              className="absolute right-2 z-10 w-30 p-4 rounded-md shadow-md"
              style={{
                background: gradient,
                color: textColor,
                border:
                  currentTheme === "dark"
                    ? "1px solid rgba(180,120,220,0.2)"
                    : "1px solid rgba(220,120,150,0.25)",
              }}
            >
              <div className="flex flex-col items-center">
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

      {/* 💻 DESKTOP */}
      {/*
        Valeurs précédentes XL → ×1.25 :
        h-[110px] → h-[138px]
        h-[130px] → h-[163px]
        px-16     → px-20
        px-24     → px-[7.5rem]
      */}
      <div
        className="hidden tablet:flex justify-between items-center sticky top-0 z-10 w-full
                    px-6 xl:px-20 2xl:px-[7.5rem]
                    h-[75px] xl:h-[138px] 2xl:h-[163px]"
        style={{
          background: gradient,
          color: textColor,
        }}
      >
        {/* LEFT — nom + singe */}
        {/*
          gap-5 → gap-[1.5625rem]
          w-20/h-20 (80px) → w-[100px] h-[100px]
          w-24/h-24 (96px) → w-[120px] h-[120px]
        */}
        <div className="flex items-center gap-3 xl:gap-[1.5rem]">
          <h1
            onClick={() => router.push("/")}
            className="font-medium cursor-default name"
            style={
              mounted && typeof window !== "undefined" && window.innerWidth >= 1280
                ? nameStyleXL
                : nameStyleDesktop
            }
          >
            {name}.
          </h1>
          <div className="w-14 h-14 xl:w-[100px] xl:h-[100px] 2xl:w-[120px] 2xl:h-[120px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/images/elo/singe.png"
              alt="singe"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* RIGHT — boutons de navigation */}
        {/*
          gap-6 → gap-[1.875rem]
          gap-8 → gap-10
          text-xl  (1.25rem) → text-[1.5625rem]
          text-2xl (1.5rem)  → text-[1.875rem]
        */}
        <div className="flex items-center gap-3 xl:gap-[1.875rem] 2xl:gap-10">
          {!isBlog ? (
            <>
              <Button onClick={handlePortfolioScroll}>
                <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{t.nav.portfolio}</span>
              </Button>

              <Button onClick={handleAboutScroll}>
                <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{t.nav.about}</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/")}>
              <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{t.nav.home}</span>
            </Button>
          )}

          {showResume && (
            <Button onClick={() => router.push("/resume")}>
              <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{t.nav.resume}</span>
            </Button>
          )}

          <Button
            onClick={() =>
              window.open("mailto:ericbergeron2000@gmail.com")
            }
          >
            <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{t.nav.contact}</span>
          </Button>

          <Button onClick={toggle}>
            <span className="xl:text-[1.5625rem] 2xl:text-[1.875rem]">{lang === "fr" ? "EN" : "FR"}</span>
          </Button>

          <ThemeButton
            darkMode={darkMode}
            mounted={mounted}
            currentTheme={currentTheme}
            onToggle={toggleTheme}
          />
        </div>
      </div>
    </>
  );
};

export default Header;