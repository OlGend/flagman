"use client";
import React, { useState } from "react";
import { Diamond, DiceTwo, PokerChip } from "phosphor-react";
import Link from "next/link";
import Image from "next/image";
import Img from "@/public/tablet.png";
import Img2 from "@/public/mobile.png";


const MenuItem = ({ title, excerpt, icon, excerpt2, link }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleItemClick = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div
      className="p-4 menuItem flex flex-wrap items-center mb-2"
      onClick={handleItemClick}
    >
      <div className="icon">{icon}</div>
      <div className="title ml-2 mt-1">{title}</div>
      {isMenuOpen && (
        <div className="excerpt ml-8 mt-3">
          {excerpt}
          {link}
          {excerpt2}
        </div>
      )}
    </div>
  );
};

const casinosLink = "/casinos"; // Сохраняем только URL ссылки

const ReviewBrands = () => {
  return (
    <div className="tabNavigation">
      <div className="main__container">
        <div className="top-navigate flex justify-between">
          <div className="top-navigate__left basis-3/7">
            <h2 className="mb-3 text-white">All meticulously reviewed online casinos</h2>
            <p className="mb-6 text-white">
              We thoroughly review all existing online casinos, regardless of
              their preference
            </p>
            <div className="">
              <MenuItem
                icon={<Diamond color="#5dd667" size={24} />}
                title="Currently in active pursuit of fresh casino websites"
                excerpt={"Our team is constantly seeking recently "}
                link={
                  <Link href={"/casinos"}>
                    launched casino websites for evaluation
                  </Link>
                }
                excerpt2={", aiming to provide utmost value to our visitors."}
              />
              <MenuItem
                icon={<DiceTwo color="#5dd667" size={24} />}
                title="The most precise details regarding each casino"
                excerpt={
                  "We meticulously assess each casino and gather extensive information to ensure our visitors are well-informed about what to anticipate before playing"
                }
              />
              <MenuItem
                icon={<PokerChip color="#5dd667" size={24} />}
                title="Currently in active pursuit of fresh casino websites"
                excerpt={
                  "Every casino undergoes evaluation by an impartial team, adhering to a comprehensive, data-driven, "
                }
                link={<Link href={"/about"}>and unbiased review approach</Link>}
              />
            </div>
            <Link
              className="w-full flex justify-center items-center text-lg text-white p-3"
              href={casinosLink}
            >
              Discover top-rated casinos
            </Link>
          </div>
          <div className="top-navigate__right basis-4/7 flex justify-end items-start">
            <Image src={Img} alt="img" loading="lazy" width={400} />
          </div>
        </div>
        <div className="top-navigate flex justify-between mt-12">
        <div className="top-navigate__right basis-4/7 flex justify-start items-start">
            <Image src={Img2} alt="img" loading="lazy" width={300} />
          </div>
          <div className="top-navigate__left basis-3/7">
            <h2 className="mb-3 text-white">We are passionate about no deposit bonuses</h2>
            <p className="mb-6 text-white">
            Our relentless efforts go into crafting the ultimate database of no deposit bonuses.
            </p>
            <div className="">
              <MenuItem
                icon={<Diamond color="#5dd667" size={24} />}
                title="Compiling promotional deals from every online casino out there"
                excerpt={"In our quest to provide the widest range of choices, we continually seek  "}
                link={
                  <Link href={"/bonuses"}>
                   fresh no deposit bonuses
                  </Link>
                }
                excerpt2={" to expand our database, sourced from all existing casino websites."}
              />
              
              <MenuItem
                icon={<DiceTwo color="#5dd667" size={24} />}
                title="Creating unique and exclusive bonuses tailored exclusively for our valued visitors"
                excerpt={"In our quest to provide the widest range of choices, we continually seek fresh "}
                link={
                  <Link href={"/bonuses"}>
                   exclusive no deposit bonuses
                  </Link>
                }
                excerpt2={" features deals crafted solely for our esteemed visitors."}
              />
            
              <MenuItem
                icon={<PokerChip color="#5dd667" size={24} />}
                title="Comprehensive and precise details regarding every bonus"
                excerpt={
                  "In our bonus database, you'll find crucial information and terms associated with each bonus, along with clear explanations and illustrative examples."
                }
              />
            </div>
            <Link
              className="w-full flex justify-center items-center text-lg text-white p-3"
              href={"/bonuses"}
            >
              Discover top-rated casinos
            </Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ReviewBrands;
