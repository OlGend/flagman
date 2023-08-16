"use client";
import React from "react";
import Image from "next/image";
import Img from "@/public/certified.png";

const TopCertifiedCasinos = () => {
  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">
          Premier Accredited Casinos in 2023
          </h1>
          <p className="text-white mt-5">
          Gaming constitutes a substantial sector, and with the assistance of authorized internet-based casinos, you can relish your preferred pastime with serenity, assured of its oversight by official governmental bodies. Cutting-edge security protocols ensure the confidentiality of all personal data!
          </p>
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default TopCertifiedCasinos;
