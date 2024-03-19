"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/providersRobot.png";


const Amatic = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">Push Gaming: Revolutionizing iGaming with Cutting-Edge Concepts</h1>
          <p className="text-white mt-5">In the ever-competitive realm of iGaming, Push Gaming stands out for groundbreaking slots like &#39;Jammin&#39; Jars&#39; and &#39;Wild Swarm,&#39; the company excels in delivering games with exceptional visuals and intricate gameplay features. Push Gaming&#39;s focus on mobile-optimized, HTML5-based games ensures a seamless experience across devices. Their capacity to marry traditional gaming elements with novel twists makes them a sought-after provider, continually pushing the envelope in terms of what is possible in the iGaming world.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={327} height={540} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Amatic;
