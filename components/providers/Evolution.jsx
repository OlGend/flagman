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
          <h1 className="text-white">Evolution Gaming: Setting the Gold Standard in Live Casino Experiences</h1>
          <p className="text-white mt-5">A recognized leader in the live casino arena, Evolution Gaming has earned its reputation through a commitment to unparalleled quality and innovation. Offering a rich variety of live dealer games, from classics like blackjack and roulette to unique offerings like Lightning Dice, the company consistently delivers engaging and authentic experiences. By utilizing cutting-edge streaming technology and employing professional dealers, Evolution Gaming ensures a seamless and immersive gaming atmosphere that sets them apart in the industry.</p>
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
