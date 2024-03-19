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
          <h1 className="text-white">Pragmatic Play: Fusing Quality and Creativity for an Unmatched iGaming Experience</h1>
          <p className="text-white mt-5">A frontrunner in the iGaming industry, Pragmatic Play has made its name through a potent blend of innovative gameplay and top-notch graphics. Renowned for popular titles like &#39;Wolf Gold&#39; and &#39;The Dog House,&#39; the company delivers a versatile range of slots, live casino games, and even bingo offerings. Pragmatic Play&#39;s commitment to quality is manifest in its intuitive interfaces, engaging storylines, and well-executed game mechanics. By consistently rolling out new and captivating games, they manage to stay ahead in the competitive world of online gaming, solidifying their reputation as a reliable and inventive game provider.</p>
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
