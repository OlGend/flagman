"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/allpaymentsrobot.png";
import Subscribe from "@/components/subscribe/Subscribe";

const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">
          Top-Rated Online Casinos Accepting Maestro Payments for 2023
          </h1>
          <p className="text-white mt-5">
          Interested in gaming at online casinos that welcome Maestro transactions? Let Casino Guru steer you to the ideal Maestro-friendly casino for you.
          </p>
          <Subscribe />
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={327} height={540} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
