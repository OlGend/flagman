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
import { useLanguage } from "@/components/switcher/LanguageContext";
import { getBrands } from "@/components/getBrands/getBrands";

export default function TopBrands() {
  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const { language } = useLanguage(); 
  const { t } = useTranslation();

  useEffect(() => {
    // Обновляем URL, удаляем параметры и устанавливаем source на основе localStorage
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 = indexOfQuestionMark !== -1 ? currentUrl.substring(0, indexOfQuestionMark) : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    // Работа с URL и localStorage для определения source
    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
    const currentKeyword = searchParams.get("keyword");

    if (currentKeyword && currentKeyword.includes("partner1039")) {
      localStorage.setItem("source", "partner1039");
      const partnerIndex = currentKeyword.indexOf("partner");
      const partnerText = currentKeyword.substring(partnerIndex, partnerIndex + 11);
      setSource(partnerText);
      searchParams.set("source", partnerText);
    } else {
      setSource("0");
      const sourceFound = localStorage.getItem("source");
      if (sourceFound !== "partner1039") {
        localStorage.setItem("source", "0");
      }
      searchParams.set("source", "0");
    }

    const newUrlWithSource = "?" + (searchParams.toString() ? searchParams.toString() + "&" : "keyword=undefined") + `creative_id=XXL`;
    if (newUrlWithSource.includes("keyword")) {
      localStorage.setItem("savedUrl", newUrlWithSource);
      localStorage.setItem("token", "give");
    }
    const tokenGive = localStorage.getItem("token");
    if (tokenGive !== "give") {
      localStorage.setItem("savedUrl", newUrlWithSource);
    }
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
    
    // Подготовка данных о брендах
    const fetchBrands = async () => {
      const brandsData = await getBrands({ key1: "Segment2", key2: "Premium" }, language);
      setBrands(brandsData);
      setLoading(false);
    };
    fetchBrands();
  }, [language]);

  useEffect(() => {
    setLoading(brands.length === 0);
  }, [brands]);

  const shuffledBrands = shuffle(brands);
  const cards2 = shuffledBrands.slice(0, 6).map((brand) => ({
    key: uuidv4(),
    content: <Card imagen={brand.LinkImg} link={brand.GoBig} bonus={brand.OurOfferContent} />,
  }));

  return (
    <>
      <div className="topbr">
        <div className="main__container">
          {loading ? <Loader /> : cards2 && <Carousel className="carmob" cards={cards2} height="500px" width="100%" margin="0 auto" offset={200} showArrows={false} />}
        </div>
      </div>
      <div className="preview2 flex justify-between items-center">
        <div className="main__container flex items-center">
          <div className="flex flex-col">
            <h1 className="">
              Feeling lucky today? <span className="text-blued">Click now to play</span> and see if <span className="text-blued"> luck is on your side!</span>
            </h1>
            {shuffledBrands.slice(0, 1).map((item) => (
              <Link target="_blank" key={item} className="btn btn-primary big-btn mt-3" href={`${item.GoBig}/${newUrl}`}>
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
