// TopBrands.jsx (Клиентский компонент)
"use client";
import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";


import Loader from "@/components/Loader";
import useSWR from "swr";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "@/components/slider/Card";
import Carousel from "@/components/slider/Carousel";
import imgrandom from "@/public/coins_banner2.jpg";

import { getBrands } from "@/components/getBrands/getBrands";

import i18n from "@/components/i18n";

export default function TopBrands() {

  ////////////////////NEW CODE/////////////////////

  // Получаем текущий URL

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // Определяем позицию символа "?"
  const indexOfQuestionMark = currentUrl.indexOf("?");

  // Если "?" найден, обрезаем URL до символа "?"
  const newUrl2 =
    indexOfQuestionMark !== -1
      ? currentUrl.substring(0, indexOfQuestionMark)
      : currentUrl;

  // Обновляем URL
  if (typeof window !== "undefined") {
    window.history.replaceState({}, document.title, newUrl2);
  }

  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");



  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const urlObj = typeof window !== "undefined" ? new URL(url) : null;

    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");

    const currentKeyword = searchParams.get("keyword");

    if (currentKeyword !== null && currentKeyword.includes("partner1039")) {
      // Если в строке есть "partner1039" или "partner1041", вырезаем и добавляем в setSource
      if (typeof window !== "undefined") {
        localStorage.setItem("source", "partner1039");
      }
      const partnerIndex = currentKeyword.indexOf("partner");
      const partnerText = currentKeyword.substring(
        partnerIndex,
        partnerIndex + 11
      ); // 11 - длина "partner1039" или "partner1041"
      setSource(partnerText);

      // Используем "partner1039" или "partner1041" в newUrl
      searchParams.set("source", partnerText);
    } else {
      // Если "partner1039" или "partner1041" отсутствует, добавляем 0 в setSource
      setSource("0");
      const sourceFound = localStorage.getItem("source");
      if (typeof window !== "undefined" && sourceFound !== "partner1039") {
        localStorage.setItem("source", "0");
      }
      searchParams.set("source", "0");
      // Если "partner1039" или "partner1041" отсутствует, новый URL не содержит source
      // searchParams.delete("source");
    }

    // Добавить source в новый URL только если он существует
    const newUrl =
      "?" +
      (searchParams.toString()
        ? searchParams.toString() + "&"
        : "keyword=undefined") +
      `creative_id=XXL`;

    // Сохранение ссылки в локальном хранилище только если параметр "keyword" присутствует
    if (typeof window !== "undefined") {
      if (newUrl.includes("keyword")) {
        localStorage.setItem("savedUrl", newUrl);
        localStorage.setItem("token", "give");
      }
    }

    if (typeof window !== "undefined") {
      const tokenGive = localStorage.getItem("token");
      if (tokenGive !== "give") {
        localStorage.setItem("savedUrl", newUrl);
      }
    }

    // Чтение сохраненной ссылки из локального хранилища
    const savedUrl = localStorage.getItem("savedUrl");

    // Установка новой ссылки в состояние
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  ///////////////NEW CODE//////////////////////////////

  const [loading, setLoading] = useState(true);



  if (typeof window !== "undefined") {
    const newSource = localStorage.getItem("source");
    const urlBrands = newSource === "partner1039" ? 248 : 221;

    if (urlBrands && typeof window !== "undefined") {
      localStorage.setItem("brands", urlBrands);
    }
  }

  let br;
  if (typeof window !== "undefined") {
    br = localStorage.getItem("brands");
  }

  const { t } = useTranslation();

  const [brands, setBrands] = useState([]);

  
  const categoryBrands = { key1: "Segment2", key2: "Premium" };
  useEffect(() => {
    const fetchBrands = async () => {
      if (typeof window !== "undefined") {
        const brandsData = await getBrands(categoryBrands, i18n.language);
        setBrands(brandsData);
      }
    };

    fetchBrands();
  }, [i18n.language]);

  useEffect(() => {
    if (brands.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [brands]);

  let cards2;
  // Перемешиваем массив filteredBrands случайным образом
  const shuffledBrands = shuffle(brands);
  // Берем первые 6 элементов из перемешанного массива
  const randomBrands = shuffledBrands;
  console.log("!!", randomBrands);
  // Преобразуем эти объекты в карточки
  cards2 = randomBrands.slice(0, 6).map((brand) => ({
    key: uuidv4(),
    content: (
      <Card
        imagen={brand.LinkImg}
        link={brand.GoBig}
        bonus={brand.OurOfferContent}
      />
    ),
  }));

  return (
    <>
      <div className="topbr">
        <div className="main__container">
          {loading ? ( 
            <Loader />
          ) : (
 
            cards2 && (
 
              <Carousel
                className="carmob"
                cards={cards2}
                height="500px"
                width="100%"
                margin="0 auto"
                offset={200}
                showArrows={false}
              />
            )
          )}
        </div>
      </div>
      <div className="preview2 flex justify-between items-center">
        <div className="main__container flex items-center">
          <div className="flex flex-col">
            <h1 className="">
 
              Feeling lucky today?{" "}
              <span className="text-blued">Click now to play</span> and see if{" "}
              <span className="text-blued"> luck is on your side!</span>
            </h1>
            {randomBrands.slice(0, 1).map((item) => (
              <Link
                target="_blank"
                key={item}
                className="btn btn-primary big-btn mt-3"
                href={`${item.GoBig}/${newUrl}`}
              >
                Try Your Luck
              </Link>
            ))}
          </div>
          <Image src={imgrandom} alt={imgrandom} width={500} loading="lazy" />
        </div>
      </div>
    </>
  );
}
