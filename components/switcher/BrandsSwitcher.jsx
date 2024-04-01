"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import { useLanguage } from "./LanguageContext";

const BrandsSwitcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage } = useLanguage(); // Используй состояние и функцию из контекста

  const ipData = async () => {
    try {
      const response = await fetch(
        "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
      );
      const data = await response.json();
      if (data.country) {
        setLanguage(data.country.toLowerCase()); // Используй setLanguage из контекста
        if (typeof window !== "undefined") {
          localStorage.setItem("country_brands", data.country.toLowerCase());
        }
      }
    } catch (error) {
      console.error("Ошибка при запросе к API:", error);
      setLanguage("au"); // Установка значения по умолчанию в случае ошибки
    }
  };
  useEffect(() => {
    const savedLanguage = localStorage.getItem("country_brands");
    if (!savedLanguage) {
      ipData();
    }
  }, []);

  const changeLanguage = (lng) => {
    setIsLoading(true);
    setLanguage(lng); 
    localStorage.setItem("country_brands", lng); 
    setIsLoading(false);
  };

  const availableLanguages = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "all", label: "World", flag: "🌍" },
  ];
  const availableLanguagesPartners = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "all", label: "World", flag: "🌍" },
  ];

  let item;
  if (typeof window !== "undefined") {
    item = localStorage.getItem("source");
  }
  const newLng =
    item === "partner1039" ? availableLanguagesPartners : availableLanguages;

  return (
    <div className={`language-switcher ml-3 flex flex-col`}>
      <select
        className={`desktop-lang ${language}`} 
        value={language} 
        onChange={(e) => {
          const selected = availableLanguages.find(
            (lang) => lang.code === e.target.value
          );
          if (selected) {
            changeLanguage(selected.code);
          }
        }}
      >
        {newLng.map((language) => (
          <option
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

export default BrandsSwitcher;

