// TopBrands.jsx (Клиентский компонент)
"use client";
import { Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Play, Eye } from "phosphor-react";
import Image from "next/image";
import Link from "next/link";
import { useTopBrands } from "./useBrands";
import { useTopBrandsFilter } from "@/components/useBrands";
import {
  extractReviewBonus,
  extractReviewImage,
  extractLink,
} from "./brandUtils";
import Loader from "@/components/Loader";
import useSWR from "swr";

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

  const [selectedBrand, setSelectedBrand] = useState(null);
  useEffect(() => {
    const defLng = localStorage.getItem("country");
    // setSelectedBrand(defLng);
    if (defLng) {
      const foundBrand = navigateBrands.find(
        (brand) => brand.slug === defLng.toLowerCase()
      );
      const foundBrandPartners = navigateBrandsPartners.find(
        (brand) => brand.slug === defLng.toLowerCase()
      );
      if (foundBrand || foundBrand2) {
        setSelectedBrand(
          source === "partner139" ? foundBrandPartners : foundBrand
        );
      } else {
        // Если локаль не найдена, устанавливаем "all"
        const allBrand = navigateBrands.find((brand) => brand.slug === "all");
        const allBrandPartners = navigateBrandsPartners.find(
          (brand) => brand.slug === "all"
        );
        setSelectedBrand(source === "partner139" ? allBrandPartners : allBrand);
      }
    }
  }, []);

  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const urlObj = typeof window !== "undefined" ? new URL(url) : null;

    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");

    const currentKeyword = searchParams.get("keyword");

    if (currentKeyword !== null && currentKeyword.includes("partner1039")) {
      // Если в строке есть "partner1039" или "partner1041", вырезаем и добавляем в setSource
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
      `creative_id=MAW`;

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

  const navigateBrands = [
    {
      topCurrentCategories: 222,
      icon: "🌍",
      slug: "all",
    },
    {
      topCurrentCategories: 223,
      icon: "🇦🇺",
      slug: "au",
    },
    {
      topCurrentCategories: 224,
      icon: "🇨🇦",
      slug: "ca",
    },
    {
      topCurrentCategories: 228,
      icon: "🇫🇮",
      slug: "fi",
    },
    {
      topCurrentCategories: 226,
      icon: "🇩🇪",
      slug: "de",
    },
    {
      topCurrentCategories: 231,
      icon: "🇳🇿",
      slug: "nz",
    },
    {
      topCurrentCategories: 230,
      icon: "🇳🇴",
      slug: "no",
    },
    {
      topCurrentCategories: 232,
      icon: "🇵🇱",
      slug: "pl",
    },
  ];
  const navigateBrandsPartners = [
    {
      topCurrentCategories: 250,
      icon: "🌍",
      slug: "all",
    },
    {
      topCurrentCategories: 223,
      icon: "🇦🇺",
      slug: "au",
    },
    {
      topCurrentCategories: 224,
      icon: "🇨🇦",
      slug: "ca",
    },
    {
      topCurrentCategories: 228,
      icon: "🇫🇮",
      slug: "fi",
    },
    {
      topCurrentCategories: 226,
      icon: "🇩🇪",
      slug: "de",
    },
    {
      topCurrentCategories: 231,
      icon: "🇳🇿",
      slug: "nz",
    },
    {
      topCurrentCategories: 230,
      icon: "🇳🇴",
      slug: "no",
    },
    {
      topCurrentCategories: 232,
      icon: "🇵🇱",
      slug: "pl",
    },
  ];

  ///////////////NEW CODE//////////////////////////////

  const [loading, setLoading] = useState(true);

  const { data: languageDetails, error: detailsError } = useSWR(
    "languageDetails",
    null,
    {
      fallbackData: selectedBrand
        ? {
            flag: selectedBrand.icon,
            topBrand: selectedBrand.topCurrentCategories,
          }
        : { flag: "🌍", topBrand: 222 },
    }
  );
  const urlBrands = source === "partner1039" ? 248 : 221;

  const filteredBrands = useTopBrandsFilter(221, languageDetails.topBrand);
  const { t } = useTranslation();

  useEffect(() => {
    if (filteredBrands.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [filteredBrands]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);

    // Simulate some delay to show the loader (remove this in actual usage)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  console.log("WWWW", urlBrands, languageDetails.topBrand);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="main__container pb-6">
          <div className="heading flex items-center pt-12">
            <h2>{t("topBrands.title")}</h2>
          </div>
          <div className="flex flex-wrap px-0 py-6">
            {filteredBrands.map((brand) => {
              const reviewImgSrc = extractReviewImage(brand.content.rendered);
              const playLink = extractLink(brand.content.rendered);

              return (
                <div className="basis-[19%] card-brand mb-3" key={brand.id}>
                  <div className="brandImage p-3">
                    <Link key={brand.id} href={`/bonuses/${brand.id}`}>
                      <Image
                        src={reviewImgSrc}
                        alt={brand.title.rendered}
                        width={150}
                        height={75}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="brandContent p-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: extractReviewBonus(brand.content.rendered),
                      }}
                    />
                    <div className="buttons">
                      <Link
                        className="btn btn-secondary flex justify-center items-center mb-1"
                        href={`/bonuses/${brand.id}`}
                      >
                        <Eye className="mr-1" size={20} />
                        {t("button.review")}
                      </Link>
                      <Link
                        className="btn btn-primary flex justify-center items-center mt-1"
                        href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
                        target="_blank"
                      >
                        <Play className="mr-2" size={20} />

                        {t("button.play")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
