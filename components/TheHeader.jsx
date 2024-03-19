"use client";
import { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/components/i18n";
import { Navigation } from "./Navigation";

import Image from "next/image";
import Img from "@/public/logo3.png";
// import SearchComponent from "@/components/SearchComponent";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import MenuPages from "@/components/header/MenuPages";

import { getUserData } from "@/components/getUser/getUser";

import { navItems } from "@/components/header/NavItems"

import wallet from "@/public/wallet.svg";
import dollar from "@/public/dollar.svg";



const TheHeader = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Step 2

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Step 3
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  /////////////////////////////////
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const [keywordValue, setKeywordValue] = useState(null);
  const idUserParam = urlParams.get("keyword");

  const userData = keywordValue !== null ? keywordValue : idUserParam;
  // const [userDataStorage, setUserDataStorage] = useState();
  // if (typeof window !== "undefined") {
  //   setUserDataStorage(localStorage.getItem("user_id"));
  // }
  // const id = userData ? userData : userDataStorage;


  useEffect(() => {
    const api = "https://pickbonus.myawardwallet.com/api";
    const fetchUsers = async (userData) => {
      try {
        const res = await fetch(`${api}/user/read_one.php?id=${userData}`);
        if (res.ok) {
          const users = await res.json();
          setUser(users);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    if (idUserParam !== null) {
      fetchUsers(idUserParam);
    } else if (keywordValue !== null) {
      fetchUsers(keywordValue);
    } else if (typeof window !== "undefined") {
      const keyword = localStorage.getItem("savedUrl");
      if (keyword) {
        const pairs = keyword.split("&");
        const keywordPair = pairs.find((pair) => pair.startsWith("?keyword="));
        if (keywordPair) {
          const keywordValue2 = keywordPair.split("=")[1];
          localStorage.setItem("user_id", keywordValue2);
          setKeywordValue(userData);
          // setUser(null); // Установка значения null перед загрузкой новых данных
          setIsLoading(true); // Установка isLoading в true перед загрузкой новых данных

          fetchUsers(keywordValue2); // Вызываем функцию через 2 секунды
        }
      }
    }
  }, []);



  return (
    <header className="header">
      <div className="header__bg">
        <div className="header__container ">
          <div className="logo">
            <Link href="/">
              <Image src={Img} alt="logo" width={130} loading="lazy" />
            </Link>
          </div>
          {/* {isLoading ? (
            // Если данные загружаются, отображаем индикатор загрузки или другое сообщение
            <div></div>
          ) : (
            // Если данные загружены, отображаем контент
            user && (
              <div className="usernone flex ml-auto">
                <div className="flex tickets items-end">
                  <Link
                    target="_blank"
                    className="user user-wheel flex items-center"
                    href={`https://pickbonus.myawardwallet.com/?keyword=${user.id}#/fortunewheel`}
                  >
                    <Image
                      className="mr-1"
                      src={dollar}
                      alt={dollar}
                      width={26}
                      height={26}
                      loading="lazy"
                    />
                    Wheel of Fortune <span>{user.tickets}</span>
                  </Link>
                </div>

                <div className="option flex items-end">
                  <Link
                    target="_blank"
                    className="flex items-center"
                    href={`https://pickbonus.myawardwallet.com/?keyword=${user.id}#/withdrawal`}
                  >
                    <Image
                      src={wallet}
                      alt={wallet}
                      width={25}
                      height={25}
                      loading="lazy"
                      className="mr-1"
                    />
                    Withdraw
                  </Link>
                </div>
              </div>
            )
          )} */}
          <div className="search-container flex items-end justify-center ml-auto">
            {/* <SearchComponent /> */}
          </div>

          <I18nextProvider i18n={i18n}>
            <div className="somelng">
              <LanguageSwitcher />{" "}
            </div>
          </I18nextProvider>

          <MenuPages />

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
                {/* <div className="flex flex-col items-start useryes">
                  {user && (
                    <div className="flex tickets items-end">
                      <Link
                        target="_blank"
                        className="user user-wheel flex items-center"
                        href={`https://pickbonus.myawardwallet.com/?keyword=${user.id}#/fortunewheel`}
                      >
                        <Image
                          className="mr-1"
                          src={dollar}
                          alt={dollar}
                          width={26}
                          height={26}
                          loading="lazy"
                        />
                        Wheel of Fortune <span>{user.tickets}</span>
                      </Link>
                    </div>
                  )}
                  {user && (
                    <div className="option flex items-end">
                      <Link
                        target="_blank"
                        className="flex items-center"
                        href={`https://pickbonus.myawardwallet.com/?keyword=${user.id}#/withdrawal`}
                      >
                        <Image
                          src={wallet}
                          alt={wallet}
                          width={25}
                          height={25}
                          loading="lazy"
                          className="mr-1"
                        />
                        Withdraw
                      </Link>
                    </div>
                  )}
                </div> */}
                <Navigation
                  navLinks={navItems.map((item) => ({
                    ...item,
                    label: t(item.label),
                  }))}
                  onLinkClick={closeMobileMenu}
                />

                {/* 
                <I18nextProvider i18n={i18n}>
                  <LanguageSwitcher />{" "}
                </I18nextProvider> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__container menu-desctop">
        <Navigation
          navLinks={navItems.map((item) => ({
            ...item,
            label: t(item.label),
          }))}
        />
      </div>
    </header>
  );
};

export { TheHeader };
