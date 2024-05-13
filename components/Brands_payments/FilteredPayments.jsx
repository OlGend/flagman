"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigateBrands from "./Navigate";
import AllPayments from "./AllPayments";
import { useLanguage } from "@/components/switcher/LanguageContext";

const FilteredPayments = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);

  const navigateBrands = useNavigateBrands();


  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  };
  return (
    <div className="main pt-10 pb-10 custom-bonuses filtered-payments">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2 className="">
              {t("Catalog of all offered Online Casinos by Payment Methods in 2024")}
            </h2>
            <p className="mt-3 pb-4">
              {t("Looking for online casinos with specific payment methods? Explore our current database of numerous casino offers for you to choose from.")}
            </p>
          </div>
        </div>
        <div className="flex navigate-filter flex-wrap">
          {navigateBrands.map((item) => (
            <button
              key={item.currentTab}
              className={`flex justify-center flex-col basis-[10%] items-center p-2 border text-lg button-tab ${
                currentTab === item.currentTab ? "active" : ""
              }`}
              onClick={() => handleTabChange(item.currentTab)}
            >
              <div className="flex items-center">
                {item.icon}
                {/* {t(item.currentText)} */}
              </div>
            </button>
          ))}
        </div>

        <div className="overlay-filter">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllPayments
                key={`${item.currentTab}-${language}`}
                creative={item.currentText}
                isLoader={isLoader}
                segment={item.segment}
                value={item.value}
                target={item.target}
                currentText={item.currentText}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilteredPayments;
