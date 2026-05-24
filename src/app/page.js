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
    if (window.innerWidth < 640) return 40;
    if (window.innerWidth < 1024) return 70;
    return 275;
  };

  const handleWorkScroll = () => {
    if (workRef.current) {
      window.scrollTo({ top: workRef.current.offsetTop, behavior: "smooth" });
    }
  };

  const handlePortfolioScroll = () => {
    if (workRef.current) {
      window.scrollTo({
        top: workRef.current.offsetTop - getHeaderOffset(),
        behavior: "smooth",
      });
    }
  };

  const handleAboutScroll = () => {
    if (aboutRef.current) {
      window.scrollTo({
        top: aboutRef.current.offsetTop - getHeaderOffset(),
        behavior: "smooth",
      });
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
        className="
          absolute z-10
          right-[5%] top-[9%]
          w-[120px] h-[120px]
          sm:w-[180px] sm:h-[180px]
          md:w-[280px] md:h-[280px]
          lg:w-[280px] lg:h-[280px]
          xl:right-[10%] xl:top-[3%] xl:w-[480px] xl:h-[480px]
          2xl:right-[20%] 2xl:top-[3%] 2xl:w-[560px] 2xl:h-[560px]
          rounded-full overflow-hidden
        "
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

      {/* SECTION TAGLINES */}
      <div className="mt-4 px-4 xl:px-16 2xl:px-24">
        <h1
          ref={textOne}
          className="text-3xl laptop:text-4xl xl:text-7xl 2xl:text-8xl 2xl:ml-160"
        >
          {taglines[0]}
        </h1>
        <h1
          ref={textTwo}
          className="text-3xl laptop:text-4xl xl:text-7xl 2xl:text-8xl 2xl:ml-160"
        >
          {taglines[1]}
        </h1>
        <h1
          ref={textThree}
          className="text-3xl laptop:text-4xl xl:text-7xl 2xl:text-8xl 2xl:ml-160"
        >
          {taglines[2]}
        </h1>
        <h1
          ref={textFour}
          className="text-3xl laptop:text-4xl xl:text-7xl 2xl:text-8xl 2xl:ml-160"
        >
          {taglines[3]}
        </h1>

        <Socials className="mt-5 xl:mt-8 xl:scale-125 xl:origin-left 2xl:ml-160" />
      </div>

      {/* RESTE DE LA PAGE */}
      <div className="container mx-auto xl:max-w-7xl 2xl:max-w-screen-2xl px-2 xl:px-16 2xl:px-24">

        {/* PORTFOLIO */}
        <div className="mt-10 xl:mt-20 p-2" ref={workRef}>
          <h1 className="sr-only">{t.nav.portfolio}</h1>
          <Portfolio lang={lang} />
        </div>

        {/* ABOUT */}
        <div className="mt-10 xl:mt-20 pt-2 px-2 xl:px-4" ref={aboutRef}>
          <h1
            className="text-3xl xl:text-6xl 2xl:text-7xl mb-10 xl:mb-16 px-2"
            style={{
              fontFamily: "'Amsterdam', cursive",
              textDecoration: "underline",
            }}
          >
            {t.sections.about}
          </h1>

          <div className="text-xl xl:text-3xl 2xl:text-4xl max-w-2xl xl:max-w-5xl 2xl:max-w-6xl leading-relaxed xl:leading-loose 2xl:leading-loose">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-3 xl:mb-8 2xl:mb-10">
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