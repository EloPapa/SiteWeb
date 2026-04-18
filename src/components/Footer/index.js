"use client";
import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";



const GRADIENT =
  "linear-gradient(to top, transparent 60%, #080810 100%), linear-gradient(to right, #080810 0%, #0f0a18 30%, #1a0d28 50%, #0f0a18 70%, #080810 100%)";


const Footer = ({}) => {
  
  return (
    <>
    
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        
        <div>
          <h1 className="text-2xl text-bold">Contact.</h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              LET&apos;S COLLABORATE
            </h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              TOGETHER
            </h1>
            <Button type="primary">Schedule a session</Button>
            <div className="mt-10">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <h1 
      
      style={{ background: GRADIENT }}
      className="text-sm text-bold mt-2 laptop:mt-10 p-2 laptop:p-0">
        Made With ❤ by{" "}
        <Link href="http://www.eloise-bergeron.vercel.app">
          <h1 className="underline underline-offset-1">Eloĩse</h1>
        </Link>
      </h1>
    </>
  );
};

export default Footer;