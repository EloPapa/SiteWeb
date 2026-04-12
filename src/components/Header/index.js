"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTheme } from "next-themes";

import Button from "../Button";
import data from "../../data/portfolio.json";

// ✅ Définis HORS de Header pour éviter le re-mount et l'erreur d'hydration
const ThemeButton = ({ darkMode, mounted, currentTheme, onToggle }) => {
  if (!darkMode || !mounted) return null;
  return (
    <Button onClick={onToggle}>
      <img
        className="h-6"
        src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
        alt="theme icon"
      />
    </Button>
  );
};

const MenuIcon = ({ open, mounted, currentTheme }) => {
  // Placeholder de même taille pendant le SSR pour éviter la mismatch DOM
  if (!mounted) return <span className="h-5 w-5 block" />;
  const src = !open
    ? currentTheme === "light" ? "menu-white.svg" : "menu-dark.svg"
    : currentTheme === "dark" ? "cancel-white.svg" : "cancel.svg";
  return <img className="h-5" alt="menu icon" src={`/images/${src}`} />;
};

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  // "dark" côté serveur pour correspondre au defaultTheme de providers.js
  const currentTheme = mounted ? (theme || resolvedTheme) : "dark";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* 📱 MOBILE */}
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2">
              <h1
                onClick={() => router.push("/")}
                className="font-medium cursor-pointer"
              >
                {name}.
              </h1>

              <div className="flex items-center gap-2">
                <ThemeButton
                  darkMode={darkMode}
                  mounted={mounted}
                  currentTheme={currentTheme}
                  onToggle={toggleTheme}
                />
                <PopoverButton>
                  <MenuIcon open={open} mounted={mounted} currentTheme={currentTheme} />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              className="absolute right-2 z-10 w-40 p-4 rounded-md shadow-md"
              style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
            >
              <div className="flex flex-col gap-2">
                {!isBlog ? (
                  <>
                    <Button onClick={handleWorkScroll}>Work</Button>
                    <Button onClick={handleAboutScroll}>About</Button>
                    {showBlog && (
                      <Button onClick={() => router.push("/blog")}>Blog</Button>
                    )}
                  </>
                ) : (
                  <Button onClick={() => router.push("/")}>Home</Button>
                )}

                {showResume && (
                  <Button onClick={() => window.open("mailto:ericbergeron2000@gmail.com")}>
                    Resume
                  </Button>
                )}

                <Button onClick={() => window.open("mailto:ericbergeron2000@gmail.com")}>
                  Contact
                </Button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* 💻 DESKTOP */}
      <div
        className="hidden tablet:flex justify-between items-center mt-10 sticky top-0 z-10"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer"
        >
          {name}.
        </h1>

        <div className="flex items-center gap-3">
          {!isBlog ? (
            <>
              <Button onClick={handleWorkScroll}>Work</Button>
              <Button onClick={handleAboutScroll}>About</Button>
              {showBlog && (
                <Button onClick={() => router.push("/blog")}>Blog</Button>
              )}
            </>
          ) : (
            <Button onClick={() => router.push("/")}>Home</Button>
          )}

          {showResume && (
            <Button onClick={() => router.push("/resume")}>Resume</Button>
          )}

          <Button onClick={() => window.open("mailto:ericbergeron2000@gmail.com")}>
            Contact
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

