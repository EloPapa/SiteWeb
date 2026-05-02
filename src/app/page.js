"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Socials from "../components/Socials";

// 🔁 Remplace l'ancien CanvaEmbed par le nouveau composant React Portfolio
const Portfolio = dynamic(() => import("../components/Portfolio/index"), { ssr: false });

import data from "../data/portfolio.json";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const workRef = useRef();
  const aboutRef = useRef();

  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  const { lang, t } = useLanguage();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? theme || resolvedTheme : "light";

  const getHeaderOffset = () => {
    if (window.innerWidth < 640) return 40;   // mobile
    if (window.innerWidth < 1024) return 70;  // tablet
    return 275;                                // desktop
  };

  const handleWorkScroll = () => {
    if (workRef.current) {
      window.scrollTo({ top: workRef.current.offsetTop, behavior: "smooth" });
    }
  };

  const handlePortfolioScroll = () => {
    if (workRef.current) {
      window.scrollTo({ top: workRef.current.offsetTop - getHeaderOffset(), behavior: "smooth" });
    }
  };

  const handleAboutScroll = () => {
    if (aboutRef.current) {
      window.scrollTo({ top: aboutRef.current.offsetTop - getHeaderOffset(), behavior: "smooth" });
    }
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  const taglines =
    lang === "fr"
      ? [
          data.headerTaglineOne_fr || data.headerTaglineOne,
          data.headerTaglineTwo_fr || data.headerTaglineTwo,
          data.headerTaglineThree_fr || data.headerTaglineThree,
          data.headerTaglineFour_fr || data.headerTaglineFour,
        ]
      : [
          data.headerTaglineOne,
          data.headerTaglineTwo,
          data.headerTaglineThree,
          data.headerTaglineFour,
        ];

  const aboutParagraphs =
    lang === "fr" ? data.aboutYou_fr || data.aboutYou : data.aboutYou;

  return (
    <div className="relative">
      <Head>
        <title>{data.name}</title>
      </Head>

      {/* 🐶 MÉDAILLON CHIEN */}
      <div
        className="absolute right-[5%] top-[10%] z-10
                  w-[120px] h-[120px]
                  sm:w-[180px] sm:h-[180px]
                  md:w-[320px] md:h-[320px]
                  lg:w-[420px] lg:h-[420px]
                  xl:w-[480px] xl:h-[480px]
                  rounded-full overflow-hidden"
      >
        <img
          src="/images/elo/labradorPetite.png"
          alt="chien"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: "center 15%" }}
        />
      </div>

      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
        handlePortfolioScroll={handlePortfolioScroll}
      />

      <div className="container mx-auto">
        {/* SECTION ACCUEIL/PRÉSENTATION */}
        <div className="mt-0">
          <h1 ref={textOne} className="text-3xl laptop:text-6xl p-2 py-1.5 w-4/5">
            {taglines[0]}
          </h1>
          <h1 ref={textTwo} className="text-3xl laptop:text-6xl p-2 py-1.5">
            {taglines[1]}
          </h1>
          <h1 ref={textThree} className="text-3xl laptop:text-6xl p-2 py-1.5">
            {taglines[2]}
          </h1>
          <h1 ref={textFour} className="text-3xl laptop:text-6xl p-2 py-1.5">
            {taglines[3]}
          </h1>

          <Socials className="mt-5" />
        </div>

        {/* 🎯 PORTFOLIO (remplace l'embed Canva) */}
        <div className="mt-10 p-2" ref={workRef}>
          <h1 className="sr-only">{t.nav.portfolio}</h1>
          <Portfolio lang={lang} />
        </div>

        {/* ABOUT */}
        <div className="mt-15 p-2" ref={aboutRef}>
          <h1 className="text-3xl mb-10" style={{ fontFamily: "'Amsterdam', cursive", textDecoration: "underline" }}>
            {t.sections.about}
          </h1>

          <div className="text-xl max-w-2xl leading-relaxed">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}