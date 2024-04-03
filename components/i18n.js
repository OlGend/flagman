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
    defLng = "all"; // Установка значения по умолчанию в случае ошибки
  }

  const languages = ["all", "au", "ca", "nz", "pl"];

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

  const resources = {
    all: {
      translation: {
        "Casinos ▼": "Casinos ▼",
        "Crypto Casinos": "Crypto Casinos",
        "Fast Withdrawal Casinos": "Fast Withdrawal Casinos",
        "Live Casinos": "Live Casinos",
        "Newest Casinos": "Newest Casinos",
        "Top Certified Casinos": "Top Certified Casinos",
        "Bonuses ▼": "Bonuses ▼",
        "No Deposit Bonuses": "No Deposit Bonuses",
        "Exclusive Bonuses": "Exclusive Bonuses",
        "Deposit Bonuses": "Deposit Bonuses",
        "Welcome Bonuses": "Welcome Bonuses",
        "No Wagering Bonuses": "No Wagering Bonuses",
        "All Payments ▼": "All Payments ▼",
        "Apple Pay": "Apple Pay",
        Bitcoin: "Bitcoin",
        Ecopayz: "Ecopayz",
        Maestro: "Maestro",
        Mastercard: "Mastercard",
        "Mobile Payments": "Mobile Payments",
        Muchbetter: "Muchbetter",
        Neosurf: "Neosurf",
        Neteller: "Neteller",
        PayPal: "PayPal",
        Paysafecard: "Paysafecard",
        Pix: "Pix",
        Skrill: "Skrill",
        Trustly: "Trustly",
        Visa: "Visa",
        "Game Providers ▼": "Game Providers ▼",
        Amatic: "Amatic",
        BGaming: "BGaming",
        Boongo: "Boongo",
        Amusnet: "Amusnet",
        Evolution: "Evolution",
        Mascot: "Mascot",
        NeTent: "NeTent",
        "Nolimit city": "Nolimit city",
        "Play’n go": "Play’n go",
        "Pragmatic Play": "Pragmatic Play",
        "Push Gaming": "Push Gaming",
        Spinomenal: "Spinomenal",
        "Play Now": "Play Now",
        "How to get bonus?": "How to get bonus?",
        "Activate bonus in your casino account":
          "Activate bonus in your casino account",
        "Load More Brands": "Load More Brands",
        "Withdrawal Limits:": "Withdrawal Limits:",
        Advantages: "Advantages",
        "Payment Methods": "Payment Methods",
        "Game Providers": "Game Providers",
        "Restricted Countries": "Restricted Countries",
        "Feeling lucky today?": "Feeling lucky today?",
        "Click now to play": "Click now to play",
        "and see if": "and see if",
        "luck is on your side!": "luck is on your side!",
        "Try Your Luck": "Try Your Luck",
        "All Brands": "All Brands",
        "Recommended Brands": "Recommended Brands",
        "Newly Brands": "Newly Brands",
        "Crypto Brands": "Crypto Brands",
        "Top Sports Brands": "Top Sports Brands",
        "Catalog of all 2024 Online Casino Bonuses Offered":
          "Catalog of all 2024 Online Casino Bonuses Offered",
        "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.":
          "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.",
        "Our Contacts:": "Our Contacts:",
        "Responsible Gaming": "Responsible Gaming",
        "Privacy Policy": "Privacy Policy",
        "Terms and Conditions": "Terms and Conditions",
        "Empowering iGaming Solutions": "Empowering iGaming Solutions",
        "Unlocking 15 Websites That Will Boost Your Brand to New Heights":
          "Unlocking 15 Websites That Will Boost Your Brand to New Heights",
        "Start Working With Us": "Start Working With Us",
        "positions itself as an exceptional source of information about virtual gaming establishments and online gambling entertainment. All our reviews and guides are crafted in accordance with the knowledge and convictions of our independent team of experts, objectively and without any bias. Nevertheless,such assessments and notifications are provided solely for informational purposes and should not be considered legal advice or a basis for making legal decisions. Before commencing participation in your chosen casino, always ensure that you comply with all applicable legal requirements.":
          "positions itself as an exceptional source of information about virtual gaming establishments and online gambling entertainment. All our reviews and guides are crafted in accordance with the knowledge and convictions of our independent team of experts, objectively and without any bias. Nevertheless,such assessments and notifications are provided solely for informational purposes and should not be considered legal advice or a basis for making legal decisions. Before commencing participation in your chosen casino, always ensure that you comply with all applicable legal requirements.",
        "Your balance:": "Your balance:",
        "Fortune wheel": "Fortune wheel",
        "My wallet": "My wallet",
        "Cards Shop": "Cards Shop",
        "Account menu": "Account menu",

        "Fee:": "Fee",
        "You will receive on balance:": "You will receive on balance:",
        "Payment Method": "Payment Method",
        "Select one of the withdrawal methods and enter the withdrawal amount":
          "Select one of the withdrawal methods and enter the withdrawal amount",
        "Wallet Address": "Wallet Address",
        "Finally Step": "Finally Step",
        "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands":
          "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands",
        "Phone Number": "Phone Number",
        "To create a transfer, we need to verify your phone number":
          "To create a transfer, we need to verify your phone number",
        "Withdrawal Request": "Withdrawal Request",
        "Withdrawal History": "Withdrawal History",
        "Cards Shop": "Cards Shop",
      },
    },

    pl: {
      translation: {
        "Casinos ▼": "Kasyna ▼",
        "Crypto Casinos": "Krypto kasyna",
        "Fast Withdrawal Casinos": "Kasyna z szybkimi wypłatami",
        "Live Casinos": "Kasyna na żywo",
        "Newest Casinos": "Najnowsze kasyna",
        "Top Certified Casinos": "Najlepsze certyfikowane kasyna",
        "Bonuses ▼": "Bonusy ▼",
        "No Deposit Bonuses": "Bonusy bez depozytu",
        "Exclusive Bonuses": "Ekskluzywne bonusy",
        "Deposit Bonuses": "Bonusy od depozytu",
        "Welcome Bonuses": "Bonusy powitalne",
        "No Wagering Bonuses": "Bonusy bez wymogu obrotu",
        "All Payments ▼": "Wszystkie płatności ▼",
        "Apple Pay": "Apple Pay",
        Bitcoin: "Bitcoin",
        Ecopayz: "Ecopayz",
        Maestro: "Maestro",
        Mastercard: "Mastercard",
        "Mobile Payments": "Płatności mobilne",
        Muchbetter: "Muchbetter",
        Neosurf: "Neosurf",
        Neteller: "Neteller",
        PayPal: "PayPal",
        Paysafecard: "Paysafecard",
        Pix: "Pix",
        Skrill: "Skrill",
        Trustly: "Trustly",
        Visa: "Visa",
        "Game Providers ▼": "Dostawcy gier ▼",
        Amatic: "Amatic",
        BGaming: "BGaming",
        Boongo: "Boongo",
        Amusnet: "Amusnet",
        Evolution: "Evolution",
        Mascot: "Mascot",
        NeTent: "NeTent",
        "Nolimit city": "Nolimit City",
        "Play’n go": "Play’n GO",
        "Pragmatic Play": "Pragmatic Play",
        "Push Gaming": "Push Gaming",
        Spinomenal: "Spinomenal",
        "Play Now": "Zagraj Teraz",
        "How to get bonus?": "Jak otrzymać bonus?",
        "Activate bonus in your casino account":
          "Aktywuj bonus na swoim koncie w kasynie",
        "Load More Brands": "Załaduj więcej marek",
        "Withdrawal Limits:": "Limity wypłat:",
        Advantages: "Zalety",
        "Payment Methods": "Metody płatności",
        "Game Providers": "Dostawcy gier",
        "Restricted Countries": "Kraje ograniczone",
        "Feeling lucky today?": "Czujesz się dzisiaj szczęśliwy?",
        "Click now to play": "Kliknij teraz, aby zagrać",
        "and see if": "i zobacz czy",
        "luck is on your side!": "szczęście jest po twojej stronie!",
        "Try Your Luck": "Spróbuj swojego szczęścia",
        "All Brands": "Wszystkie marki",
        "Recommended Brands": "Polecane marki",
        "Newly Brands": "Nowe marki",
        "Crypto Brands": "Marki krypto",
        "Top Sports Brands": "Najlepsze marki sportowe",
        "Catalog of all 2024 Online Casino Bonuses Offered":
          "Katalog wszystkich oferowanych bonusów w kasynach online w 2024 roku",
        "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.":
          "Szukasz bonusów i promocji w kasynach online? Zapoznaj się z naszą bieżącą bazą danych zawierającą liczne oferty bonusów kasynowych do wyboru.",
        "Our Contacts:": "Nasze kontakty:",
        "Responsible Gaming": "Odpowiedzialna gra",
        "Privacy Policy": "Polityka prywatności",
        "Terms and Conditions": "Warunki użytkowania",
        "Empowering iGaming Solutions": "Umocnienie rozwiązań iGaming",
        "Unlocking 15 Websites That Will Boost Your Brand to New Heights":
          "Odkrywanie 15 stron internetowych, które wzniosą Twoją markę na nowe wyżyny",
        "Start Working With Us": "Zacznij z nami współpracę",
        footer_description:
          "pozycjonuje się jako wyjątkowe źródło informacji o wirtualnych zakładach gier i rozrywce hazardowej online. Wszystkie nasze recenzje i przewodniki są tworzone zgodnie z wiedzą i przekonaniami naszego niezależnego zespołu ekspertów, obiektywnie i bez jakiejkolwiek stronniczości. Niemniej jednak, takie oceny i powiadomienia są dostarczane wyłącznie w celach informacyjnych i nie powinny być traktowane jako porada prawna lub podstawa do podejmowania decyzji prawnych. Zawsze, przed rozpoczęciem uczestnictwa w wybranym kasynie, upewnij się, że spełniasz wszystkie obowiązujące wymogi prawne.",
        "Your balance:": "Twoje saldo:",
        "Fortune wheel": "Koło fortuny",
        "My wallet": "Mój portfel",
        "Cards Shop": "Sklep z kartami",
        "Account menu": "Menu konta",
        "Fee:": "Opłata:",
        "You will receive on balance:": "Otrzymasz na saldo:",
        "Payment Method": "Metoda płatności",
        "Select one of the withdrawal methods and enter the withdrawal amount":
          "Wybierz jedną z metod wypłaty i wprowadź kwotę wypłaty",
        "Wallet Address": "Adres portfela",
        "Finally Step": "Ostatni krok",
        "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands":
          "Gratulacje, pomyślnie zażądałeś wypłaty, aby została ona zaksięgowana na Twoim portfelu, musisz dokonać wpłaty przy użyciu jednej z naszych marek",
        "Phone Number": "Numer telefonu",
        "To create a transfer, we need to verify your phone number":
          "Aby utworzyć transfer, musimy zweryfikować Twój numer telefonu",
        "Withdrawal Request": "Żądanie wypłaty",
        "Withdrawal History": "Historia wypłat",
        "Cards Shop": "Sklep z kartami",
      },
    },
  };

  // Инициализация i18n
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: matchedLanguage || "all",
      interpolation: {
        escapeValue: false,
      },
    });
}

initializeI18n();

export default i18n;
