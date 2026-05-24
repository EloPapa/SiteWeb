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

      {/* 🐶 MÉDAILLON CHIEN
          lg  = 15"–22" : xl(347px) * 0.70 = 243px
          xl  = 22"+ : inchangé 347px
          2xl : inchangé 476px
      */}
      <div
        className="
          absolute z-10
          right-[5%] top-[9%]
          w-[120px] h-[120px]
          sm:w-[180px] sm:h-[180px]
          md:w-[280px] md:h-[280px]
          lg:right-[8%] lg:top-[3%] lg:w-[243px] lg:h-[243px]
          xl:right-[10%] xl:top-[5%] xl:w-[347px] xl:h-[347px]
          2xl:right-[20%] 2xl:top-[5%] 2xl:w-[476px] 2xl:h-[476px]
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

      {/* SECTION TAGLINES
          lg  = 15"–22" : xl(3.25rem) * 0.70 = 2.275rem | xl(2.89rem) * 0.70 = 2.02rem
          xl  = 22"+ : inchangé
          2xl : inchangé
      */}
      <div className="mt-4 px-4 lg:px-[2.02rem] xl:px-[2.89rem] 2xl:px-[5.1rem]">
        <h1
          ref={textOne}
          className="text-3xl laptop:text-4xl lg:text-[2.275rem] xl:text-[3.25rem] 2xl:text-[5.1rem] 2xl:ml-160"
        >
          {taglines[0]}
        </h1>
        <h1
          ref={textTwo}
          className="text-3xl laptop:text-4xl lg:text-[2.275rem] xl:text-[3.25rem] 2xl:text-[5.1rem] 2xl:ml-160"
        >
          {taglines[1]}
        </h1>
        <h1
          ref={textThree}
          className="text-3xl laptop:text-4xl lg:text-[2.275rem] xl:text-[3.25rem] 2xl:text-[5.1rem] 2xl:ml-160"
        >
          {taglines[2]}
        </h1>
        <h1
          ref={textFour}
          className="text-3xl laptop:text-4xl lg:text-[2.275rem] xl:text-[3.25rem] 2xl:text-[5.1rem] 2xl:ml-160"
        >
          {taglines[3]}
        </h1>

        {/* lg: pas de scale (trop petit), mt xl(1.5rem) * 0.70 = 1.05rem */}
        <Socials className="mt-5 lg:mt-[1.05rem] lg:origin-left xl:mt-[1.5rem] xl:scale-[0.935] xl:origin-left 2xl:ml-160" />
      </div>

      {/* RESTE DE LA PAGE
          lg : max-w-3xl | xl(2.89rem) * 0.70 = 2.02rem
          xl : inchangé
      */}
      <div className="container mx-auto lg:max-w-3xl xl:max-w-5xl 2xl:max-w-screen-xl px-2 lg:px-[2.02rem] xl:px-[2.89rem] 2xl:px-[5.1rem]">

        {/* PORTFOLIO
            lg : xl(3.25rem) * 0.70 = 2.275rem
            xl : inchangé
        */}
        <div className="mt-10 lg:mt-[2.275rem] xl:mt-[3.25rem] p-2" ref={workRef}>
          <h1 className="sr-only">{t.nav.portfolio}</h1>
          <Portfolio lang={lang} />
        </div>

        {/* ABOUT
            lg titre : xl(2.72rem) * 0.70 = 1.904rem | xl(2.975rem) * 0.70 = 2.08rem
            lg texte : xl(1.36rem) * 0.70 = 0.952rem → plancher 1rem
            lg mb    : xl(1.5rem)  * 0.70 = 1.05rem
            lg max-w : max-w-2xl
            xl : inchangé
        */}
        <div className="mt-10 lg:mt-[2.275rem] xl:mt-[3.25rem] pt-2 px-2 xl:px-4" ref={aboutRef}>
          <h1
            className="text-3xl lg:text-[1.904rem] xl:text-[2.72rem] 2xl:text-[3.825rem] mb-10 lg:mb-[2.08rem] xl:mb-[2.975rem] px-2"
            style={{
              fontFamily: "'Amsterdam', cursive",
              textDecoration: "underline",
            }}
          >
            {t.sections.about}
          </h1>

          <div className="text-xl lg:text-[1rem] xl:text-[1.36rem] 2xl:text-[1.9rem] max-w-2xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl leading-relaxed xl:leading-loose 2xl:leading-loose">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-3 lg:mb-[1.05rem] xl:mb-[1.5rem] 2xl:mb-8">
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