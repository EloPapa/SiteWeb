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
      {/* lg: xl(2.1rem) * 0.70 = 1.47rem | xl: inchangé */}
      <img
        className="h-6 lg:h-[1.47rem] xl:h-[2.1rem] cursor-default"
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
    paddingLeft: "0.0rem",
  };

  // lg = 15"–22" : xl(1.87rem) * 0.70 = 1.309rem
  const nameStyleLG = {
    color: textColor,
    fontFamily: "'Amsterdam', cursive",
    fontSize: "1.309rem",
    paddingLeft: "0.0rem",
  };

  // xl = 22"+ : inchangé
  const nameStyleXL = {
    color: textColor,
    fontFamily: "'Amsterdam', cursive",
    fontSize: "1.87rem",
    paddingLeft: "0.0rem",
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const getNameStyle = () => {
    if (!mounted) return nameStyleDesktop;
    if (windowWidth >= 1280) return nameStyleXL;
    if (windowWidth >= 1024) return nameStyleLG;
    return nameStyleDesktop;
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
                  <MenuIcon open={open} mounted={mounted} currentTheme={currentTheme} />
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
                <Button onClick={handlePortfolioScroll}>{t.nav.portfolio}</Button>
                <Button onClick={handleAboutScroll}>{t.nav.about}</Button>
                <Button onClick={() => window.open("mailto:ericbergeron2000@gmail.com")}>
                  {t.nav.contact}
                </Button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* 💻 DESKTOP
          
      */}
      <div
        className="hidden tablet:flex justify-between items-center sticky top-0 z-10 w-full
                    px-6 h-[75px]"
        style={{
          background: gradient,
          color: textColor,
        }}
      >
        {/* LEFT — nom + singe
            lg : xl(1.17rem) * 0.70 = 0.819rem | xl(75px) * 0.70 = 53px
            xl : inchangé gap-[1.17rem], singe 75px
            2xl: inchangé singe 106px
        */}
        <div className="flex items-center gap-3 lg:gap-[0.819rem] xl:gap-[1.17rem]">
          <h1
            onClick={() => router.push("/")}
            className="font-medium cursor-default name"
            style={getNameStyle()}
          >
            {name}.
          </h1>
          <div className="w-14 h-14 lg:w-[53px] lg:h-[53px] xl:w-[75px] xl:h-[75px] 2xl:w-[106px] 2xl:h-[106px] rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/images/elo/singe.png"
              alt="singe"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* RIGHT — boutons
            lg : xl(1.17rem) * 0.70 = 0.819rem | xl(1.4rem) * 0.70 = 0.98rem
            xl : inchangé text-[1.17rem], gap-[1.4rem]
            2xl: inchangé
        */}
        <div className="flex items-center gap-3 lg:gap-[0.98rem] xl:gap-[1.4rem] 2xl:gap-[2.2rem]">
          {!isBlog ? (
            <>
              <Button onClick={handlePortfolioScroll}>
                <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{t.nav.portfolio}</span>
              </Button>
              <Button onClick={handleAboutScroll}>
                <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{t.nav.about}</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/")}>
              <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{t.nav.home}</span>
            </Button>
          )}

          {showResume && (
            <Button onClick={() => router.push("/resume")}>
              <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{t.nav.resume}</span>
            </Button>
          )}

          <Button onClick={() => window.open("mailto:ericbergeron2000@gmail.com")}>
            <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{t.nav.contact}</span>
          </Button>

          <Button onClick={toggle}>
            <span className="lg:text-[0.819rem] xl:text-[1.17rem] 2xl:text-[1.65rem]">{lang === "fr" ? "EN" : "FR"}</span>
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