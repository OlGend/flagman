"use client";
import { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/components/i18n";
import { Navigation } from "./Navigation";

import Image from "next/image";
import Img from "@/public/logo3.png";
// import SearchComponent from "@/components/SearchComponent";
import LanguageSwitcher from "@/components/switcher/LanguageSwitcher";
import BrandsSwitcher from "@/components/switcher/BrandsSwitcher";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import MenuPages from "@/components/header/MenuPages";
import { getUserData } from "@/components/getUser/getUser";
import { navItems } from "@/components/header/NavItems";
import MenuLanguages from "@/components/header/MenuLanguages";

import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import { updateGeo } from "@/components/getUser/updateGeo";

const TheHeader = () => {
  const { t } = useTranslation();
  const items = navItems(t);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const [load, setLoad] = useState(false);
  const [keywordValue, setKeywordValue] = useState(null);
  const idUserParam = urlParams.get("keyword");
  const ad_campaign = urlParams.get("ad_campaign_id");
  const userData = keywordValue !== null ? keywordValue : idUserParam;
  const [dataUser, setDataUser] = useState();
  const [d, setD] = useState(null);

  useEffect(() => {
    if (ad_campaign !== null) {
      localStorage.setItem("ad_campaign_id", ad_campaign);
    }
    async function updateUserData(data) {
      localStorage.setItem("user_id", data);
      const partners = ["partner1039", "partner1043", "partner1044"];

      // Перебор каждого идентификатора
      partners.forEach((partner) => {
        if (data.includes(partner)) {
          localStorage.setItem("source", partner);
        }
      });

      setUser(data);
      const dataUser = await getUserData(data);
      if (dataUser) {
        setDataUser(dataUser);
        setLoad(true);
      }
      if (dataUser && dataUser.country === "N/A") {
        updateGeo(
          localStorage.getItem("user_id"),
          localStorage.getItem("country_data")
        );
      }
      if (d && typeof d === "string" && d.includes("Json")) {
        console.log("--------------------- Data in `d` contains 'Json':", d);
        const dataUser = await getUserData(data);
        if (dataUser) {
          setDataUser(dataUser);
          setLoad(true);
        }
      }
    }
    if (idUserParam !== null) {
      updateUserData(idUserParam);
    } else if (keywordValue !== null) {
      updateUserData(keywordValue);
    } else if (typeof window !== "undefined") {
      const keyword = localStorage.getItem("savedUrl");
      if (keyword) {
        const pairs = keyword.split("&");
        const keywordPair = pairs.find((pair) => pair.startsWith("?keyword="));
        if (keywordPair) {
          const keywordValue2 = keywordPair.split("=")[1];
          updateUserData(keywordValue2);
          setKeywordValue(userData);
          setIsLoading(true);
        }
      }
    }
  }, [d]);

  /////////////////////////////////////

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);

    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    const newUrlWithSource =
      "?" +
      (searchParams.toString()
        ? searchParams.toString() + "&"
        : `keyword=${localStorage.getItem("user_id")}&`) +
      `source=${localStorage.getItem("source")}` +
      `&ad_campaign_id=${localStorage.getItem("ad_campaign_id")}`;
    if (newUrlWithSource.includes("keyword")) {
      localStorage.setItem("savedUrl", newUrlWithSource);
      localStorage.setItem("token", "give");
    }
    const tokenGive = localStorage.getItem("token");
    if (tokenGive !== "give") {
      localStorage.setItem("savedUrl", newUrlWithSource);
    }
  });

  //////////////////////////////////////////////////

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://bonus.xxxcasinoguru.com") {
        console.error(
          "Received message from an unauthorized origin:",
          event.origin
        );
        return;
      }
      // console.log("Raw data from iframe:", event.data);
      const jsonData = event.data;
      setD(typeof jsonData === "string" ? jsonData : "");
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // useEffect(() => {

  //   updateGeo(
  //     localStorage.getItem("user_id"),
  //     localStorage.getItem("country_data")
  //   );
  // }, []);

  return (
    <header className="header">
      <div className="header__bg">
        <div className="header__container ">
          <div className="logo">
            <Link href="/">
              <Image src={Img} alt="logo" width={130} loading="lazy" />
            </Link>
          </div>

          <div className="account-items ml-auto flex items-center">
            <div className="flex flex-col">
              {load ? (
                <Badge badgeContent={`${dataUser.balance}$`} color="secondary">
                  <Link href={`/personal?tab=wallet`} className="balance flex">
                    <>
                      <AccountBalanceWalletOutlinedIcon
                        className="mr-2"
                        size={18}
                      />{" "}
                      <span>{t("My Wallet")}</span>
                    </>
                  </Link>
                </Badge>
              ) : (
                "..."
              )}
            </div>
            <div className="flex flex-col ml-8">
              {load ? (
                <Badge badgeContent={`${dataUser.tickets}`} color="primary">
                  <Link href={`/fortune`} className="spins flex">
                    <>
                      <CurrencyExchangeOutlinedIcon
                        className="mr-2"
                        size={18}
                      />
                      <span>{t("Fortune Wheel")}</span>
                    </>
                  </Link>
                </Badge>
              ) : (
                "..."
              )}
            </div>
            <div className="flex flex-col ml-8">
              {load && (
                <Link href={`/personal?tab=cards`} className="cards-shop flex">
                  <>
                    <ShoppingBagOutlinedIcon className="mr-2" size={18} />
                    <span>{t("Cards Shop")}</span>
                  </>
                </Link>
              )}
            </div>
          </div>

          <I18nextProvider i18n={i18n}>
            <MenuLanguages />
            <div className="d-none">
              <div className="somelng">
                <LanguageSwitcher />{" "}
              </div>
              <BrandsSwitcher />
            </div>
          </I18nextProvider>

          <MenuPages userId={user} t={t} />

          <div className="mobile-none">
            <button
              className={`burger-icon ${isMobileMenuOpen ? "open" : ""}`}
              onClick={toggleMobileMenu}
            >
              <div className="burger-lines">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
              </div>
            </button>
            <div className="menu-mobile">
              <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <Navigation
                  navLinks={items.map((item) => ({
                    ...item,
                    label: item.label,
                    // label: t(item.label),
                  }))}
                  onLinkClick={closeMobileMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__container menu-desctop">
        <Navigation
          navLinks={items.map((item) => ({
            ...item,
            label: item.label,
          }))}
        />
      </div>
    </header>
  );
};

export { TheHeader };
