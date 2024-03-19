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
          <h1 className="text-white">No Limit City Gaming: Nieograniczona innowacja w sferze iGaming</h1>
          <p className="text-white mt-5">Emerging as a force to be reckoned with in the iGaming industry, No Limit City Gaming is synonymous with creative freedom and technological prowess. Known for unique slots like &#39;Deadwood&#39; and &#39;Punk Rocker,&#39; the company goes beyond the norm to offer riveting themes and game mechanics. Their dedication to innovation is evident, providing a refreshing and unpredictable gaming experience. By continually pushing the boundaries of what’s possible, No Limit City Gaming has carved a niche for itself as an avant-garde game provider in a highly competitive market.</p>
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
