"use client";
import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Loader from "../Loader";

const Fortunes = ({ banner, target }) => {
  const [brands, setBrands] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(5); // Состояние для отслеживания количества видимых брендов
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const categoryBrands = { key1: "FirstPriority", key2: "1" };
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      const brandsData = await getBrands(categoryBrands, language);
      setBrands(brandsData);
      setIsLoading(false);
    };

    fetchBrands();
  }, [language]);

  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  const loadMoreBrands = () => {
    setVisibleBrands((prev) => prev + 5); // Увеличиваем количество видимых брендов на 5
  };

  const hasMoreBrands = brands.length > visibleBrands; // Определяем, есть ли еще бренды для отображения

  return (
    <div className="flex flex-col container-fortune">
      <div className="banner-wheel">
        <h3>{t("FORTUNE WHEEL BRANDS")}</h3>
        <p>{t("Pick a brand below, make first deposit and win real cash")}</p>
        {banner && (
          <Link className="btn btn-thirdy target-spin-the-roulette" href={`/fortune`}>
            {t("Spin the Roulette")}
          </Link>
        )}
      </div>
      <p className="text-center mt-3">
        {t(
          "To qualify for withdrawals, ensure your first deposit is at least €25 or the equivalent in other currencies and was made after requesting a withdrawal."
        )}
      </p>
      <div className="flex flex-wrap px-0 py-6">
        {isLoading ? (
          <Loader />
        ) : (
          brands.slice(0, visibleBrands).map((brand) => (
            <div key={brand.id_brand} className="card-brand mb-3 basis-[19%]">
              <div className="brandImage p-3">
                <Link className={target} href={`${brand.GoBig}/${newUrl}`}>
                  <Image
                    src={`/brands/${brand.CasinoBrand}.png`}
                    alt={brand.CasinoBrand}
                    width={150}
                    height={75}
                    className={target}
                  />
                </Link>
              </div>
              <div className="brandContent p-3">
                <div className="review-bonus">{brand.OurOfferContent}</div>
                <div className="buttons">
                  <Link
                    className={`btn btn-primary ${target}`}
                    href={`${brand.GoBig}/${newUrl}`}
                  >
                    {t("Play Now")}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {hasMoreBrands && (
        <button
          className="btn-primary btn-more text-lg max-w-sm p-3 ml-auto mr-auto mt-4 font-semibold text-white flex justify-center items-center"
          onClick={loadMoreBrands}
        >
          {t("Load More Brands")}
        </button>
      )}
    </div>
  );
};

export default Fortunes;
