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
    ? "linear-gradient(to bottom, transparent 60%, #080810 100%), linear-gradient(to right, #080810 0%, #0f0a18 30%, #1a0d28 50%, #0f0a18 70%, #080810 100%)"
    : "linear-gradient(to bottom, transparent 60%, #fef2f5 100%), linear-gradient(to right, #fef2f5 0%, #f9d0de 30%, #f5b8cc 50%, #f9d0de 70%, #fef2f5 100%)";

const ThemeButton = ({ darkMode, mounted, currentTheme, onToggle }) => {
  if (!darkMode || !mounted) return null;
  return (
    <Button onClick={onToggle}>
      <img
        className="h-6 cursor-default"
        src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
        alt="theme icon"
      />
    </Button>
  );
};

const MenuIcon = ({ open, mounted, currentTheme }) => {
  if (!mounted) return <span className="h-5 w-5 block" />;
  const src = !open ? "menu-dark.svg" : "cancel-white.svg";
  return (
    <img
      className="h-5 cursor-default"
      alt="menu icon"
      src={`/images/${src}`}
    />
  );
};

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, t, toggle } = useLanguage();

  const { name, showBlog, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "dark";
  const gradient = getGradient(currentTheme);
  const textColor = currentTheme === "dark" ? "#e8e0f0" : "#2a1020";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
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
            <div className="flex items-center justify-between p-2">
              <h1
                onClick={() => router.push("/")}
                className="font-medium cursor-default"
                style={{ color: textColor }}
              >
                {name}.
              </h1>

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
              className="absolute right-2 z-10 w-40 p-4 rounded-md shadow-md"
              style={{
                background: gradient,
                color: textColor,
                border: currentTheme === "dark"
                  ? "1px solid rgba(180,120,220,0.2)"
                  : "1px solid rgba(220,120,150,0.25)",
              }}
            >
              <div className="flex flex-col gap-2">
                <Button onClick={handleWorkScroll}>{t.nav.passions}</Button>
                <Button onClick={handleAboutScroll}>{t.nav.about}</Button>
                <Button onClick={() => window.open("mailto:sharky2000_822@hotmail.com")}>
                  {t.nav.contact}
                </Button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* 💻 DESKTOP */}
      <div
        className="hidden tablet:flex justify-between items-center sticky top-0 z-10 w-full"
        style={{
          background: gradient,
          color: textColor,
          padding: "14px 32px",
        }}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-default"
          style={{ color: textColor }}
        >
          {name}.
        </h1>

        <div className="flex items-center gap-3">
          {!isBlog ? (
            <>
              <Button onClick={handleWorkScroll}>{t.nav.passions}</Button>
              <Button onClick={handleAboutScroll}>{t.nav.about}</Button>
              {showBlog && (
                <Button onClick={() => router.push("/blog")}>{t.nav.blog}</Button>
              )}
            </>
          ) : (
            <Button onClick={() => router.push("/")}>{t.nav.home}</Button>
          )}

          {showResume && (
            <Button onClick={() => router.push("/resume")}>{t.nav.resume}</Button>
          )}

          <Button onClick={() => window.open("mailto:sharky2000_822@hotmail.com")}>
            {t.nav.contact}
          </Button>

          <Button onClick={toggle}>
            {lang === "fr" ? "EN" : "FR"}
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