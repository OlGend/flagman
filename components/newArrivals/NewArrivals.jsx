"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import { useTranslation } from "react-i18next";

const NewArrivals = () => {
  const { t } = useTranslation();
  const [newUrl, setNewUrl] = useState("");

  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // centerMode: true,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const { language } = useLanguage();
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");

    // Установка новой ссылки в состояние
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const sandBrands = await getBrands(categoryBrands, language);
      setBrands(sandBrands);
    };

    fetchData();
  }, [language]);
  return (
    <div className="bl-sand">
      <div className="main__container block-sandbox">
        <h2>Top New Releases</h2>
        <Slider {...settings}>
          {brands.map((item) => {
            return (
              <div
                className="card-second-banner mb-2 flex flex-col items-center pb-3"
                key={item.id_brand}
              >
                <div className="brandImage p-3">
                  <Link
                    className="flex justify-center flex-col items-center"
                    key={item.id_brand}
                    href={`${item.GoBig}/${newUrl}`}
                    target="_blank"
                  >
                    <Image
                      src={`/brands/${item.CasinoBrand}.png`}
                      alt={`/brands/${item.CasinoBrand}.png`}
                      width={200}
                      height={80}
                      loading="lazy"
                    />
                    <div className="p-3 text-center flex items-center review-bonus">
                      {item.OurOfferContent}
                    </div>
                  </Link>
                </div>
                <Link
                  className="btn btn-primary btn-new"
                  key={item.id_brand}
                  href={`${item.GoBig}/${newUrl}`}
                  target="_blank"
                >
                  {t("Play Now")}
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrivals;
