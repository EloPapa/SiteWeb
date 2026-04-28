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

const CanvaEmbed = dynamic(() => import("../components/CanvaEmbed"), { ssr: false });

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

  const handleWorkScroll = () => {
    window.scrollTo({ top: workRef.current.offsetTop, behavior: "smooth" });
  };

  const handleAboutScroll = () => {
    window.scrollTo({ top: aboutRef.current.offsetTop, behavior: "smooth" });
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

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

{/* 🐶 MÉDAILLON CHIEN (RESPONSIVE) */}
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

{/* 🐵 MÉDAILLON SINGE (HAUT DE PAGE) */}
<div
  className="absolute z-40
            left-[40%] top-[1%]
            w-[35px] h-[35px]
            sm:w-[120px] sm:h-[120px]
            md:left-[210px] md:top-[5px] md:w-[65px] md:h-[65px]
            lg:left-[230px] lg:top-[5px] lg:w-[75px] lg:h-[75px]
            xl:left-[600px] xl:top-[100px] xl:w-[120px] xl:h-[120px]
            rounded-full overflow-hidden"
>
  <img
    src="/images/elo/singe.png"
    alt="singe"
    className="w-full h-full object-cover object-center"
  />
</div>

      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
      />

      <div className="container mx-auto">
        <div className="mt-0">
          <h1 ref={textOne} className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-2 w-4/5">
            {taglines[0]}
          </h1>
          <h1 ref={textTwo} className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-2">
            {taglines[1]}
          </h1>
          <h1 ref={textThree} className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-2">
            {taglines[2]}
          </h1>
          <h1 ref={textFour} className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-2">
            {taglines[3]}
          </h1>

          <Socials className="mt-5" />
        </div>

        {/* CANVA */}
        <div className="mt-2 p-2">
          <h1 className="text-2xl mb-5">{t.sections.design || ""}</h1>
          <CanvaEmbed />
        </div>

        {/* ABOUT */}
        <div className="mt-5 p-2" ref={aboutRef}>
          
          <h1 className="text-4xl mb-5" style={{ fontFamily: "'Amsterdam One', cursive" }}>
            {t.sections.about}
          </h1>

          <div className="text-xl max-w-2xl leading-relaxed">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-6">
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