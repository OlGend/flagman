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
          <h1 className="text-white">{t("Rising Star in iGaming: BGaming's Rapid Ascent Through Innovation and Quality")}</h1>
          <p className="text-white mt-5">{t("Though a relative novice in the iGaming realm, BGaming has rapidly ascended as a premier provider of online casino entertainment, owing to its superior quality and inventive strategies. Specializing in slots, casual diversions, and classic table games, BGaming constantly refreshes its game lineup with compelling storylines, unforgettable personas, and engaging promotional campaigns. Noteworthy titles such as Fruit Million, Elvis Frog in Vegas, Lucky Lady Moon, and Aloha King Elvis populate their standout collection. Delve into the thrilling and engaging world presented by BGaming's exceptional range of gaming options.")}</p>
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
