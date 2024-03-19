"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/welcomebonus.png";


const WelcomeBonuses = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
        <h1 className="text-white">Welcome Bonuses 2024</h1>
          <p className="text-white mt-5">If you&#39;re in search of a quality casino experience coupled with enticing bonuses, we have the perfect solution tailored for you! The welcoming bonus stands as a gesture from casinos to their fresh players, usually presented as free spins or cashback rewards. Explore our compilation of introductory bonuses from renowned online casinos, ensuring an ideal match for your preferences.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBonuses;
