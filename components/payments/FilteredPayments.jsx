// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AllPayments from "./AllPayments";
import Image from "next/image";
import Visa from "@/public/visa.png";
import Bitcoin from "@/public/bitcoin.png";
import Ecopayz from "@/public/ecopayz.png";
import Mastercard from "@/public/master.png";
import Muchbetter from "@/public/muchbetter.png";
import Neosurf from "@/public/neosurf.png";
import Neteller from "@/public/neteller.png";
import Paysafecard from "@/public/paysafecard.png";
import Skrill from "@/public/skrill.png";
import Trustly from "@/public/trustly.png";
import Applepay from "@/public/applepay.png";
import Maestro from "@/public/Maestro.png";
import Paypal from "@/public/PayPal.png";
import Pix from "@/public/Pix.png";
import Revolut from "@/public/Revolut.png";
import Mobile from "@/public/mobilepayments.png";
import AllPaymentsImg from "@/public/allpaymentmethods.png";
import i18n from "@/components/i18n";

const FilteredPayments = () => {
  const { t } = useTranslation();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);
  const navigateBrands = [
    {
      currentTab: 1,
      currentCategories: 85,
      currentText: "All Payments",
      icon: (
        <Image
          className="mr-1"
          src={AllPaymentsImg}
          alt="payments"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "payments",
    },
    {
      currentTab: 2,
      currentCategories: 207,
      currentText: "Apple pay",
      icon: (
        <Image
          className="mr-1"
          src={Applepay}
          alt="apple-pay"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "apple-pay",
    },
    {
      currentTab: 3,
      currentCategories: 88,
      currentText: "Bitcoin",
      icon: (
        <Image
          className="mr-1"
          src={Bitcoin}
          alt="bitcoin"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "bitcoin-casino",
    },
    {
      currentTab: 4,
      currentCategories: 151,
      currentText: "Ecopayz",
      icon: (
        <Image
          className="mr-1"
          src={Ecopayz}
          alt="ecopayz"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "ecopayz",
    },
    {
      currentTab: 5,
      currentCategories: 208,
      currentText: "Maestro",
      icon: (
        <Image
          className="mr-1"
          src={Maestro}
          alt="maestro"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "maestro",
    },
    {
      currentTab: 6,
      currentCategories: 135,
      currentText: "Mastercard",
      icon: (
        <Image
          className="mr-1"
          src={Mastercard}
          alt="mastercard"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "mastercard",
    },
    {
      currentTab: 7,
      currentCategories: 209,
      currentText: "Mobile",
      icon: (
        <Image
          className="mr-1"
          src={Mobile}
          alt="mobile"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "mobile-payments",
    },
    {
      currentTab: 8,
      currentCategories: 181,
      currentText: "Muchbetter",
      icon: (
        <Image
          className="mr-1"
          src={Muchbetter}
          alt="muchbetter"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "muchbetter",
    },
    {
      currentTab: 9,
      currentCategories: 158,
      currentText: "Neosurf",
      icon: (
        <Image
          className="mr-1"
          src={Neosurf}
          alt="neosurf"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "neosurf",
    },
    {
      currentTab: 10,
      currentCategories: 89,
      currentText: "Neteller",
      icon: (
        <Image
          className="mr-1"
          src={Neteller}
          alt="neteller"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "neteller-casino",
    },
    {
      currentTab: 11,
      currentCategories: 90,
      currentText: "PayPal",
      icon: (
        <Image
          className="mr-1"
          src={Paypal}
          alt="paypal"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "paypal-casino",
    },
    {
      currentTab: 12,
      currentCategories: 92,
      currentText: "Paysafecard",
      icon: (
        <Image
          className="mr-1"
          src={Paysafecard}
          alt="paysafecard"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "paysafecard-casino",
    },
    {
      currentTab: 13,
      currentCategories: 136,
      currentText: "Pix",
      icon: (
        <Image
          className="mr-1"
          src={Pix}
          alt="pix"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "pix",
    },

    {
      currentTab: 14,
      currentCategories: 91,
      currentText: "Skrill",
      icon: (
        <Image
          className="mr-1"
          src={Skrill}
          alt="skrill"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "skrill-casino",
    },
    {
      currentTab: 15,
      currentCategories: 171,
      currentText: "Trustly",
      icon: (
        <Image
          className="mr-1"
          src={Trustly}
          alt="trustly"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "trustly",
    },
    {
      currentTab: 16,
      currentCategories: 134,
      currentText: "Visa",
      icon: (
        <Image
          className="mr-1"
          src={Visa}
          alt="visa"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      slug: "visa",
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
    <div className="main pt-10 pb-10 custom-bonuses filtered-payments">
      <div className="main__container filter-brands">
        <div className="content flex flex-wrap">
          <div className="left flex flex-col justify-center basis-[60%]">
            <h2 className="">
              Catalog of all offered Online Casinos by Payment Methods in 2024
            </h2>
            <p className="mt-3 pb-4">
              Looking for online casinos with specific payment methods? Explore
              our current database of numerous casino offers for you to choose
              from.
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

export default FilteredPayments;
