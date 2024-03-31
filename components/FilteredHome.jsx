// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AllBrands from "./AllBrands";
import {
  Medal,
  Crown,
  DribbbleLogo,
  CurrencyBtc,
  SquareLogo,
} from "phosphor-react";
import i18n from "@/components/i18n";

const FilteredHome = () => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);

  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 25,
      currentText: "All Brands",
      icon: <SquareLogo className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 2,
      currentCategories: 26,
      currentText: "Recommended Brands",
      icon: <Medal className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 3,
      currentCategories: 24,
      currentText: "Newly Brands",
      icon: <Crown className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 4,
      currentCategories: 19,
      currentText: "Crypto Brands",
      icon: <CurrencyBtc className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 5,
      currentCategories: 187,
      currentText: "Top Sports Brands",
      icon: <DribbbleLogo className="mr-2 pb-1" size={32} />,
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
    <div className="main pt-10 pb-10 other-custom-bonuses">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2 className="">
              Catalog of all 2024 Online Casino Bonuses Offered
            </h2>
            <p className="mt-3 pb-4">
              Seeking online casino bonuses and promotions? Explore our current
              database featuring numerous casino bonus offers for your
              selection.
            </p>
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
              {item.currentText}
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllBrands
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

export default FilteredHome;
