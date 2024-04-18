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
  Fire
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
      segment: "Segment2",
      value: "",
      currentText2: t("All Brands"),
      icon: <SquareLogo className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 2,
      currentCategories: 26,
      currentText: "All Brands",
      segment: "Segment2",
      value: "Premium",
      currentText2: t("Recommended Brands"),
      icon: <Medal className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 3,
      currentCategories: 24,
      currentText: "All Brands",
      segment: "QuickSignUp",
      value: "1",
      currentText2: t("Quick Sign-Up"),
      icon: <Crown className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 4,
      currentCategories: 19,
      currentText: "All Brands",
      segment: "Hottest",
      value: "1",
      currentText2: t("Hottest Deals"),
      icon: <Fire className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 5,
      currentCategories: 187,
      currentText: "New Arrivals",
      segment: "Segment2",
      value: "Sandbox",
      currentText2: t("New Arrivals"),
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
              {t("Catalog of all 2024 Online Casino Bonuses Offered")}
            </h2>
            <p className="mt-3 pb-4">
              {t("Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.")}
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
              {item.currentText2}
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
                  segment={item.segment}
                  value={item.value}
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
