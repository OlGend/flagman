"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/cryptoCasinos.png";


const CryptoCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          
          <h1 className="text-white">{t("Top Cryptocurrency Betting Platforms & Bitcoin Casino Sites in 2024")}</h1>
          <p className="text-white mt-5">{t("Explore our compilation of premier online casinos for Bitcoin along with betting platforms that embrace BTC and alternative cryptocurrencies as viable payment methods. Delve into impartial assessments, and pinpoint the ultimate Bitcoin casino destination tailored to your preferences.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default CryptoCasinos;
