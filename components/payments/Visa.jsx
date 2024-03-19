"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/allpaymentsrobot.png";


const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">Top-Rated Online Casinos Welcoming Visa Transactions in 2024</h1>
          <p className="text-white mt-5">Interested in gaming at a Visa-friendly casino? Casino Guru is here to guide you to the most reliable casinos that welcome Visa for secure gambling.</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={327} height={540} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
