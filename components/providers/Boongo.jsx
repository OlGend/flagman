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
          <h1 className="text-white">
         
          </h1>
          <p className="text-white mt-5">
         
          </p>
          <h1 className="text-white">Boongo Gaming: Crafting Immersive Digital Experiences through Innovative Game Design</h1>
          <p className="text-white mt-5">Boongo Gaming has quickly distinguished itself in the competitive iGaming sector with visually appealing and feature-rich games. Known for titles like &#39;God&#39;s Temple&#39; and &#39;15 Golden Eggs,&#39; the company excels in both innovation and quality. Their robust backend solutions further enhance the gaming experience. Whether you&#39;re a casual player or a dedicated enthusiast, Boongo Gaming offers a memorable gaming journey.</p>
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
