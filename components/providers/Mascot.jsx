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
          <h1 className="text-white">Mascot Gaming: An Emerging Powerhouse in Tailored iGaming Solutions</h1>
          <p className="text-white mt-5">Quickly rising through the ranks of the iGaming industry, Mascot Gaming is garnering attention for its custom gaming solutions. With a balanced portfolio of slots, table games, and interactive experiences, the company is making its mark through a blend of creativity and technology. Known for titles like &#39;Reel Monsters&#39; and &#39;Fruit Vegas,&#39; Mascot Gaming combines captivating visuals with intriguing gameplay features. Their unique approach to gaming has made them a go-to for operators seeking versatile and engaging content, setting the stage for what promises to be a bright future in the sector.</p>
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
