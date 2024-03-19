"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/newest.png";


const NewestCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">Fresh Entrants to the Online Casino Scene 2024</h1>
          <p className="text-white mt-5">On the Hunt for Fresh 2024 Online Casino Platforms? Discover Recently Launched Casino Sites Offering Outstanding Incentives and Cutting-Edge Attributes. Constantly Refreshed for Your Exploration.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default NewestCasinos;
