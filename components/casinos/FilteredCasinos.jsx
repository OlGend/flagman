// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllCasinos from "./AllCasinos";
import {
  CurrencyBtc,
  UsersThree,
  Cardholder,
  CalendarCheck,
  Scroll,
} from "phosphor-react";
import i18n from "@/components/i18n";

const FilteredCasinos = () => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);
  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 19,
      currentText: "Crypto Casinos",
      icon: <CurrencyBtc className="mr-2 pb-1" size={32} />,
      slug: "crypto-casinos",
    },
    {
      currentTab: 2,
      currentCategories: 20,
      currentText: "Fast Withdrawal Casinos",
      icon: <Cardholder className="mr-2 pb-1" size={32} />,
      slug: "fast-withdrawal-casinos",
    },
    {
      currentTab: 3,
      currentCategories: 22,
      currentText: "Live Casinos",
      icon: <UsersThree className="mr-2 pb-1" size={32} />,
      slug: "live-casinos",
    },
    {
      currentTab: 4,
      currentCategories: 24,
      currentText: "Newest Casinos",
      icon: <CalendarCheck className="mr-2 pb-1" size={32} />,
      slug: "newest-casinos",
    },
    {
      currentTab: 5,
      currentCategories: 26,
      currentText: "Top Certified Casinos",
      icon: <Scroll className="mr-2 pb-1" size={32} />,
      slug: "top-certified-casinos",
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
            <h2 className="">
              Comprehensive Compilation of 2024 Online Casino Selection
            </h2>
            <p className="mt-3 pb-4">
              In Search of an Online Casino? Navigate through our up-to-date
              repository housing a myriad of casinos awaiting your
              consideration.
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
              {t(item.currentText)}
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllCasinos
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

export default FilteredCasinos;
