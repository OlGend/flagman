"use client";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { data: selectedLanguage, error } = useSWR(
    "selectedLanguage",
    () => i18n.language
  );
  const { data: languageDetails, error: detailsError } = useSWR(
    "languageDetails",
    null,
    {
      fallbackData: { flag: "🌍", allBrand: 25, topBrand: 213 }, // Задаем начальное значение
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  // Если данные еще не загрузились, показываем индикатор загрузки
  if (!selectedLanguage || !languageDetails) {
    return <Loader />;
  }

  // Обработка ошибок для selectedLanguage и languageDetails
  if (error || detailsError) {
    return <div>Failed to load</div>;
  }


  const changeLanguage = async (lng, flag, allBrand, topBrand) => {
    setIsLoading(true);
    try {
      // Не вызываем i18n.changeLanguage(lng);
      mutate("languageDetails", { flag, allBrand, topBrand }, true); // Обновляем дополнительные данные
    } catch (error) {
      console.error("Ошибка при смене языка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const availableLanguages = [
    { code: "en", label: "World", flag: "🌍", allBrand: 25, topBrand: 213 }, //
    { code: "pl", label: "Poland", flag: "🇵🇱", allBrand: 125, topBrand: 48 }, //
    { code: "no", label: "Norway", flag: "🇳🇴", allBrand: 124, topBrand: 44 }, //
    {
      code: "au",
      label: "Australia",
      flag: "🇦🇺",
      allBrand: 143,
      topBrand: 184,
    }, //
    { code: "ca", label: "Canada", flag: "🇨🇦", allBrand: 120, topBrand: 46 }, //
    { code: "nz", label: "New Zealand", flag: "🇳🇿", allBrand: 123, topBrand: 47 }, //
    { code: "de", label: "Germany", flag: "🇩🇪", allBrand: 122, topBrand: 45 }, //
    { code: "at", label: "Austria", flag: "🇦🇹", allBrand: 122, topBrand: 45 },
    { code: "ch", label: "Switzerland", flag: "🇨🇭", allBrand: 122, topBrand: 45 },
    // Добавьте другие языки по аналогии
  ];
  // Обработка ошибок для selectedLanguage и languageDetails
  if (error || detailsError) return <div>Failed to load</div>;

  return (
    <div className={`language-switcher ml-3 flex flex-col`}>
      <p className="headerText">Your country of residence</p>
      <select
        className={`${selectedLanguage}`}
        value={selectedLanguage}
        onChange={(e) => {
          const selected = availableLanguages.find(
            (lang) => lang.code === e.target.value
          );
          if (selected) {
            changeLanguage(
              selected.code,
              selected.flag,
              selected.allBrand,
              selected.topBrand
            );
          }
        }}
      >
        {availableLanguages.map((language) => (
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
  );
};

export default LanguageSwitcher;
