"use client";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { data: selectedLanguage, error } = useSWR(
    "selectedLanguage",
    () => i18n.language
  );
  let defLng;
  if (typeof window !== "undefined") {
    defLng = localStorage.getItem("country");
  }

  const [isLoading, setIsLoading] = useState(false);

  // const [source, setSource] = useState("");
  // useEffect(() => {
  //   const url = typeof window !== "undefined" ? window.location.href : "";
  //   const urlObj = typeof window !== "undefined" ? new URL(url) : null;

  //   const searchParams = new URLSearchParams(urlObj.search);
  //   searchParams.delete("brand");

  //   const currentKeyword = searchParams.get("keyword");

  //   if (currentKeyword !== null && currentKeyword.includes("partner1039")) {
  //     // Если в строке есть "partner1039" или "partner1041", вырезаем и добавляем в setSource
  //     const partnerIndex = currentKeyword.indexOf("partner");
  //     const partnerText = currentKeyword.substring(
  //       partnerIndex,
  //       partnerIndex + 11
  //     ); // 11 - длина "partner1039" или "partner1041"
  //     setSource(partnerText);

  //     // Используем "partner1039" или "partner1041" в newUrl
  //     searchParams.set("source", partnerText);
  //   } else {
  //     // Если "partner1039" или "partner1041" отсутствует, добавляем 0 в setSource
  //     setSource("0");
  //     searchParams.set("source", "0");
  //     // Если "partner1039" или "partner1041" отсутствует, новый URL не содержит source
  //     // searchParams.delete("source");
  //   }
  // }, []);

  // Обработка ошибок для selectedLanguage и languageDetails
  if (error) {
    return <div>Failed to load</div>;
  }

  const changeLanguage = async (lng, flag) => {
    setIsLoading(true);

    localStorage.setItem("country", lng);
    // setIsLoading(false);
    try {
      mutate("selectedLanguage", lng, false);
      await i18n.changeLanguage(lng);
      // Не вызываем i18n.changeLanguage(lng);
      // mutate("languageDetails", { brand, topBrand }, true); // Обновляем дополнительные данные
    } catch (error) {
      console.error("Ошибка при смене языка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const availableLanguages = [
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🌍" },
  ];
  const availableLanguages1039 = [
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "en", label: "English", flag: "🌍" },
  ];
  const availableLanguages1043 = [{ code: "en", label: "English", flag: "🌍" }];
  const availableLanguages1044 = [
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "en", label: "English", flag: "🌍" },

  ];
  let item;
  if (typeof window !== "undefined") {
    item = localStorage.getItem("source");
  }
  // let newLng =
  //   item === "partner1039" ? availableLanguagesPartners : availableLanguages;
  let newLng;
  if (item === "partner1039") {
    newLng = availableLanguages1039;
  } else if (item === "partner1043") {
    newLng = availableLanguages1043;
  } else if (item === "partner1044") {
    newLng = availableLanguages1044;
  } else {
    newLng = availableLanguages;
  }
  // Обработка ошибок для selectedLanguage и languageDetails
  if (error) return <div>Failed to load</div>;

  return (
    <div>
      {item !== "partner1043" && (
        <div>
          <p className="ml-4 mr-4">Website language</p>
          <div className={`language-switcher ml-3 flex flex-col`}>
            <select
              className={`desktop-lang ${selectedLanguage}`}
              value={selectedLanguage}
              onChange={(e) => {
                const selected = newLng.find(
                  (lang) => lang.code === e.target.value
                );
                if (selected) {
                  changeLanguage(selected.code, selected.flag);
                }
              }}
            >
              {newLng.map((language) => (
                <option
                  className={`${language.code} notranslate`}
                  key={language.code}
                  value={language.code}
                  style={{ fontSize: "20px" }}
                >
                  {language.flag} {language.label}
                </option>
              ))}
            </select>

            {isLoading && <Loader />}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
