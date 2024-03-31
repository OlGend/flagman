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
// import { useTranslation } from "react-i18next";
import Link from "next/link";
import MenuPages from "@/components/header/MenuPages";
import { getUserData } from "@/components/getUser/getUser";
import { navItems } from "@/components/header/NavItems";
import MenuLanguages from "@/components/header/MenuLanguages";

const TheHeader = () => {
  // const { t } = useTranslation();
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

  const [keywordValue, setKeywordValue] = useState(null);
  const idUserParam = urlParams.get("keyword");
  const userData = keywordValue !== null ? keywordValue : idUserParam;

  useEffect(() => {
    if (idUserParam !== null) {
      localStorage.setItem("user_id", idUserParam);
      setUser(idUserParam);
    } else if (keywordValue !== null) {
      localStorage.setItem("user_id", idUserParam);
      setUser(keywordValue);
    } else if (typeof window !== "undefined") {
      const keyword = localStorage.getItem("savedUrl");
      if (keyword) {
        const pairs = keyword.split("&");
        const keywordPair = pairs.find((pair) => pair.startsWith("?keyword="));
        if (keywordPair) {
          const keywordValue2 = keywordPair.split("=")[1];
          localStorage.setItem("user_id", keywordValue2);
          setUser(keywordValue2);
          setKeywordValue(userData);
          setIsLoading(true);
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

          <div className="search-container flex items-end justify-center ml-auto">
            {/* <SearchComponent /> */}
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

          <MenuPages userId={user} />

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
                  navLinks={navItems.map((item) => ({
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
          navLinks={navItems.map((item) => ({
            ...item,
            label: item.label,
          }))}
        />
      </div>
    </header>
  );
};

export { TheHeader };
