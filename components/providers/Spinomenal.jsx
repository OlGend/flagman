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
          <h1 className="text-white">{t("Spinomenal: A New Age Innovator in the iGaming Ecosystem")}</h1>
          <p className="text-white mt-5">{t("Earning its place as an agile and forward-thinking player in the iGaming scene, Spinomenal is recognized for its inventive approach to game development. Specializing in highly engaging slots like 'Book of Guardians' and 'Demi Gods II,' the company combines vibrant graphics with enticing gameplay mechanics. Spinomenal's commitment to user experience is evident, offering games that are optimized for both desktop and mobile play. Their innovative features, such as bonus games and progressive jackpots, make them a standout provider in an ever-growing market, appealing to a wide range of players seeking fresh and exciting gaming experiences.")}</p>
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
