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
          <h1 className="text-white">Digital Casino Financial Transactions & Payment Selections</h1>
          <p className="text-white mt-5">Currently, there exist numerous methods for funding a gaming account. Listed below are internet casinos categorized by widely utilized payment options. Some casinos accommodate MasterCard, Visa, and digital currency, while others endorse less conventional avenues like Neteller and Skrill. The choice of your preferred payment mechanism lies in your hands.</p>
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
