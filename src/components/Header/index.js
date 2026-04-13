"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTheme } from "next-themes";

import Button from "../Button";
import data from "../../data/portfolio.json";

const GRADIENT =
  "linear-gradient(to right, #0d0d1a 0%, #1a0d2e 30%, #2d0a3a 50%, #1a0d2e 70%, #0d0d1a 100%)";

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
  const src = !open
    ? currentTheme === "light"
      ? "menu-dark.svg"
      : "menu-dark.svg"
    : currentTheme === "dark"
    ? "cancel-white.svg"
    : "cancel-white.svg"
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

  const { name, showBlog, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "dark";

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* 📱 MOBILE — full width */}
      <Popover
        className="block tablet:hidden w-full"
        style={{ background: GRADIENT }}
      >
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2">
              <h1
                onClick={() => router.push("/")}
                className="font-medium cursor-default"
                style={{ color: "#e8e0f0" }}
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
                background: GRADIENT,
                color: "#e8e0f0",
                border: "1px solid rgba(180,120,220,0.2)",
              }}
            >
              <div className="flex flex-col gap-2">
                <Button onClick={handleWorkScroll}>Passions</Button>
                <Button onClick={handleAboutScroll}>About</Button>
                <Button
                  onClick={() =>
                    window.open("mailto:sharky2000_822@hotmail.com")
                  }
                >
                  Contact
                </Button>
              </div>
            </PopoverPanel>
          </>
        )}
      </Popover>

      {/* 💻 DESKTOP — full width, sticky */}
      <div
        className="hidden tablet:flex justify-between items-center sticky top-0 z-10 w-full"
        style={{
          background: GRADIENT,
          color: "#e8e0f0",
          padding: "14px 32px",
        }}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-default"
          style={{ color: "#e8e0f0" }}
        >
          {name}.
        </h1>

        <div className="flex items-center gap-3">
          {!isBlog ? (
            <>
              <Button onClick={handleWorkScroll}>Passions</Button>
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

          <Button
            onClick={() =>
              window.open("mailto:sharky2000_822@hotmail.com")
            }
          >
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


