"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/cryptoCasinos.png";

const TopSports = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">
            {t("Top Sports Betting Sites & Platforms in 2024")}
          </h1>
          <p className="text-white mt-5">
            {t(
              "Explore our compilation of premier sports betting sites, featuring platforms that offer comprehensive coverage of sporting events and competitive odds. Delve into impartial assessments, and pinpoint the ultimate sports betting destination tailored to your preferences."
            )}
          </p>

          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default TopSports;
