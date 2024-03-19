"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/nowager.png";



const NoWageringBonuses = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
        <h1 className="text-white">No Wagering Casino Bonuses 2024</h1>
          <p className="text-white mt-5">Searching for no wagering bonuses? Explore our exclusive compilation of wager-free bonuses, available only at Casino.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default NoWageringBonuses;
