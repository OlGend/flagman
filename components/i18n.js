// i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

async function initializeI18n() {
  let defLng;

  try {
    const response = await fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    );
    const data = await response.json();
    if (typeof window !== "undefined") {
      localStorage.setItem("country", data.country);
    }
    defLng = data.country.toLowerCase();
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    defLng = "au"; // Установка значения по умолчанию в случае ошибки
  }

  const languages = ["au", "ca", "nz", "pl"];

  // Используем метод map для сопоставления значений массива languages с defLng
  const matchedLanguages = languages.map((language) => {
    if (language === defLng) {
      return language;
    }
    return null;
  });

  // Фильтруем совпадающие значения
  const matchedLanguage = matchedLanguages.find(
    (language) => language !== null
  );

  console.log("Выбранный язык:", matchedLanguage);

  // Инициализация i18n
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: matchedLanguage || "au", // Используем matchedLanguage, если есть совпадение, иначе 'au'
      interpolation: {
        escapeValue: false,
      },
    });
}

initializeI18n();

export default i18n;
