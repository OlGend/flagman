"use client";
import React from "react";
import Image from "next/image";
import Img from "@/public/depositbonus.png";

const DepositBonuses = () => {
  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">
          Finest Casino Welcome Bonuses on Your Initial 2023 Deposit
          </h1>
          <p className="text-white mt-5">
          Select from a variety of top-tier introductory casino rewards and receive additional bonus funds incorporated into your initial payment. Exclusive registration incentive deals designed for fresh participants.
          </p>
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default DepositBonuses;
