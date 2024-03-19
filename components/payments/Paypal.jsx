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
          <h1 className="text-white">Leading Online Casinos Accepting PayPal Payments in 2024</h1>
          <p className="text-white mt-5">Check out our comprehensive list of top-rated casinos that accept PayPal—a quick and secure option for both deposits and withdrawals. This payment method is a popular choice among global online players, offering advantages like bypassing traditional banking constraints and geographical limitations. If you don&&#39;t already have a PayPal account, it&#39;s simple to set one up and start your journey to big wins!</p>
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
