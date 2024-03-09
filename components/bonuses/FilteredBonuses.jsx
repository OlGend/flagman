// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllBonuses from "./AllBonuses";
import { Gift, Coins, Crown, Handshake, RadioButton } from "phosphor-react";
import i18n from "@/components/i18n";

const FilteredBonuses = () => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(2);
  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 36,
      currentText: "No Deposit Bonuses",
      icon: <Gift className="mr-2 pb-1" size={32} />,
      slug: "no-deposit-bonuses",
    },
    {
      currentTab: 2,
      currentCategories: 39,
      currentText: "Exclusive Bonuses",
      icon: <Crown className="mr-2 pb-1" size={32} />,
      slug: "exclusive-bonuses",
    },
    {
      currentTab: 3,
      currentCategories: 150,
      currentText: "Deposit Bonuses",
      icon: <Coins className="mr-2 pb-1" size={32} />,
      slug: "deposit-bonuses",
    },
    {
      currentTab: 4,
      currentCategories: 35,
      currentText: "Welcome Bonuses",
      icon: <Handshake className="mr-2 pb-1" size={32} />,
      slug: "welcome-bonuses",
    },
    {
      currentTab: 5,
      currentCategories: 37,
      currentText: "No Wagering Bonuses",
      icon: <RadioButton className="mr-2 pb-1" size={32} />,
      slug: "no-wagering-bonuses",
    },
  ];



  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  };


  return (
    <div className="main pt-10 pb-10 custom-bonuses">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2 className="">Catalog of all 2024 Online Casino Bonuses Offered</h2>
            <p className="mt-3 pb-4">Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.</p>
          </div>
        </div>
        <div className="flex navigate-filter">
          {navigateBrands.map((item) => (
            <button
              key={item.currentTab}
              className={`flex justify-center flex-col basis-[20%] items-center p-2 border text-lg button-tab ${
                currentTab === item.currentTab ? "active" : ""
              }`}
              onClick={() => handleTabChange(item.currentTab)}
            >
              {item.icon}
              {t(item.currentText)}
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllBonuses
                key={`${item.currentTab}-${i18n.language}`}
                filtered={item.currentText}
                isLoader={isLoader}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilteredBonuses;
