"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTheme } from "next-themes";

import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const { name, showBlog, showResume, darkMode } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme || resolvedTheme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

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
                {darkMode && (
                  <Button onClick={toggleTheme}>
                    <img
                      className="h-6"
                      src={`/images/${
                        currentTheme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                      alt="theme icon"
                    />
                  </Button>
                )}

                <PopoverButton>
                  <img
                    className="h-5"
                    alt="menu icon"
                    src={`/images/${
                      !open
                        ? currentTheme === "light"
                          ? "menu-white.svg"
                          : "menu-dark.svg"
                        : currentTheme === "dark"
                        ? "cancel-white.svg"
                        : "cancel.svg"
                    }`}
                  />
                </PopoverButton>
              </div>
            </div>

            <PopoverPanel
              className={`absolute right-2 z-10 w-40 p-4 rounded-md shadow-md ${
                currentTheme === "dark"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex flex-col gap-2">
                {!isBlog ? (
                  <>
                    <Button onClick={handleWorkScroll}>Work</Button>
                    <Button onClick={handleAboutScroll}>About</Button>
                    {showBlog && (
                      <Button onClick={() => router.push("/blog")}>
                        Blog
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={() => router.push("/")}>Home</Button>
                )}

                {showResume && (
                  <Button
                    onClick={() =>
                      window.open("mailto:ericbergeron2000@gmail.com")
                    }
                  >
                    Resume
                  </Button>
                )}

                <Button
                  onClick={() =>
                    window.open("mailto:ericbergeron2000@gmail.com")
                  }
                >
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

          <Button
            onClick={() =>
              window.open("mailto:ericbergeron2000@gmail.com")
            }
          >
            Contact
          </Button>

          {darkMode && (
            <Button onClick={toggleTheme}>
              <img
                className="h-6"
                src={`/images/${
                  currentTheme === "dark" ? "moon.svg" : "sun.svg"
                }`}
                alt="theme icon"
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;