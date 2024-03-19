"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/providersRobot.png";


const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">Easily Find Your Ideal Online Casino: Sorted by Game Developers for Tailored Gaming Experiences</h1>
          <p className="text-white mt-5">To make your hunt easier, we&#39;ve sorted our casino offerings by game developer. This enables you to effortlessly locate a gaming site that provides the exact games you wish to play. From state-of-the-art video slots and electrifying live casino experiences to traditional table games, we&#39;ve got all your preferences accounted for. Browse our detailed list of game providers to find casinos backed by premier software developers, guaranteeing high-quality visuals, captivating gameplay, and engaging features.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={327} height={540} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
