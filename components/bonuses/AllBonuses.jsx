// TopBrands.jsx (Клиентский компонент)
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBrandsFiltered } from "@/components/getBrandsFiltered/getBrandsFiltered";
import { getBrands } from "@/components/getBrands/getBrands";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FilterLoader from "@/components/FilterLoader";
import {
  Gift,
  ShieldPlus,
  CaretDown,
  GameController,
  CurrencyCircleDollar,
  Play,
  Eye,
  Prohibit,
  MinusCircle,
  DotsThreeCircle,
  Handshake,
} from "phosphor-react";
import { useLanguage } from "@/components/switcher/LanguageContext";



export default function AllBonuses({ filtered, isLoader, t }) {
  const itemsPerPage = 4;
  const itemsPerPage2 = 4;

  const [visibleBrands, setVisibleBrands] = useState(itemsPerPage);
  const [visibleBrands2, setVisibleBrands2] = useState(itemsPerPage2);

  const [hasMoreBrands, setHasMoreBrands] = useState(false);
  const [openPlusesId, setOpenPlusesId] = useState(null);
  const [openWithdrawalId, setOpenWithdrawalId] = useState(null);
  const [openDepositsId, setOpenDepositsId] = useState(null);
  const [openCountriesId, setOpenCountriesId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);

    // Simulate some delay to show the loader (remove this in actual usage)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [topBrands, setTopBrands] = useState([]);

  const { language } = useLanguage();
  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  useEffect(() => {
    const fetchData = async () => {
      const brands = await getBrandsFiltered(filtered, language);
      const brands2 = await getBrands(categoryBrands, language);

      setFilteredBrands(brands);
      setTopBrands(brands2);

    };

    fetchData();
  }, [language]);

  useEffect(() => {
    setHasMoreBrands(visibleBrands < filteredBrands.length);
  }, [visibleBrands, filteredBrands.length]);

  const loadMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + itemsPerPage);
    setVisibleBrands2((prevVisibleBrands) => prevVisibleBrands + itemsPerPage2);
  };

  const [newUrl, setNewUrl] = useState("");
  // Чтение сохраненной ссылки из локального хранилища
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");

    // Установка новой ссылки в состояние
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  const [randomBrands, setRandomBrands] = useState([]);
  const [randomBrands2, setRandomBrands2] = useState([]);
  const [brandsGenerated, setBrandsGenerated] = useState(false);

  useEffect(() => {
    setBrandsGenerated(false); // Устанавливаем в false при изменении локали, чтобы пересчитать случайные бренды
  }, [filtered.topBrand]); // Отслеживаем изменения связанные с локалью

  useEffect(() => {
    const generateRandomBrands = () => {
      if (!brandsGenerated && filteredBrands.length > 0) {
        const shuffledBrands = [...filteredBrands].sort(
          () => Math.random() - 0.5
        );
        const shuffledBrands2 = [...filteredBrands].sort(
          () => Math.random() - 0.5
        );

        setRandomBrands(shuffledBrands);
        setRandomBrands2(shuffledBrands2);
        setBrandsGenerated(true);
      }
    };

    generateRandomBrands(); // Вызываем генерацию при первом рендере
  }, [brandsGenerated, filteredBrands]); // Отслеживаем изменения brandsGenerated и filteredBrands

  const vis = randomBrands.length > 0 ? randomBrands : filteredBrands;
  const vis2 = randomBrands2.length > 0 ? randomBrands2 : filteredBrands;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
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

  const handlePlusesClick = (brandId) => {
    setOpenPlusesId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleWithdrawalClick = (brandId) => {
    setOpenWithdrawalId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleDepositsClick = (brandId) => {
    setOpenDepositsId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleCountriesClick = (brandId) => {
    setOpenCountriesId((prevId) => (prevId === brandId ? null : brandId));
  };
  return (
    <>
      {isLoader ? (
        <FilterLoader />
      ) : (
        <div className="flex flex-wrap justify-between awesome">
          <div className="flex flex-col px-0 py-6 basis-[75%]">
            {filteredBrands.slice(0, visibleBrands).map((brand) => {
              const advantages =
                brand.advantages !== null
                  ? brand.advantages
                      .split(",")
                      .map((advantage) => ({ advantage: advantage.trim() }))
                  : "";
              const deposits =
                brand.DepositMethods !== null
                  ? brand.DepositMethods.split(",").map((deposit) => ({
                      deposit: deposit.trim(),
                    }))
                  : "";
              const withdrawals =
                brand.WithdrawalMethods !== null
                  ? brand.WithdrawalMethods.split(",").map((withdrawal) => ({
                      withdrawal: withdrawal.trim(),
                    }))
                  : "";
              const restricted =
                brand.RestrictedCountries !== null
                  ? brand.RestrictedCountries.split(",").map((restrict) => ({
                      restrict: restrict.trim(),
                    }))
                  : "";

              const isPlusesOpen = openPlusesId === brand.id_brand;
              const isWithdrawalOpen = openWithdrawalId === brand.id_brand;
              const isDepositsOpen = openDepositsId === brand.id_brand;
              const isCountriesOpen = openCountriesId === brand.id_brand;

              return (
                <div
                  className="p-3 flex justify-between flex-wrap mb-2 card-brand-filtered w-full"
                  key={brand.id_brand}
                >
                  <div className="flex flex-col basis-[63%]">
                    <div className="flex ml-1 mb-3">
                      {/* <div className="filter-flag">{filtered.flag}</div> */}
                    </div>
                    <div className="flex mb-1">
                      <Gift className="mr-1" size={24} />
                      <div className=" flex items-center review-bonus">
                        {brand.OurOfferContent}
                      </div>
                    </div>
                    <div className="mb-2 withdrawal withdrawal-limits flex items-center">
                      <Handshake className="mr-1 mb-1" size={24} />

                      <div className="title mr-2">{t("Withdrawal Limits:")}</div>
                      <div className="items-center">
                        {brand.WithdrawalLimits}
                      </div>
                    </div>
                    {advantages && (
                      <div
                        onClick={() => handlePlusesClick(brand.id_brand)}
                        className="pluses custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <ShieldPlus size={24} />
                          <span className="mt-1 ml-2">{t("Advantages")}</span>
                          <CaretDown className="ml-auto" size={20} />
                        </div>
                        {isPlusesOpen && (
                          <div className="items-center ml-3">
                            <ul className="review-pros">
                              {advantages.map((advantage, index) => (
                                <li className="review-pros-item" key={index}>
                                  {advantage.advantage}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {deposits && (
                      <div
                        onClick={() => handleDepositsClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <CurrencyCircleDollar size={24} />
                          <span className="mt-1 ml-2">{t("Payment Methods")}</span>
                          <CaretDown className="ml-auto" size={20} />
                        </div>
                        {isDepositsOpen && (
                          <div className="withdrawal flex mt-2">
                            {deposits.map((deposit, index) => (
                              <div
                                className="depimg flex items-center justify-center mr-1 mb-1 flex-wrap"
                                key={index}
                              >
                                <Image
                                  width={60}
                                  height={38}
                                  src={`/payments/${deposit.deposit}.png`}
                                  alt={`${deposit.deposit}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {withdrawals && (
                      <div
                        onClick={() => handleWithdrawalClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <GameController size={24} />
                          <span className="mt-1 ml-2">{t("Game Providers")}</span>
                          <CaretDown className="ml-auto" size={20} />
                        </div>
                        {isWithdrawalOpen && (
                          <div className="withdrawal flex mt-2">
                            {withdrawals.map((withdrawal, index) => (
                              <div
                                className="depimg flex items-center justify-center mr-1 mb-1 flex-wrap"
                                key={index}
                              >
                                <Image
                                  width={60}
                                  height={38}
                                  src={`/providers/${withdrawal.withdrawal}.png`}
                                  alt={`${withdrawal.withdrawal}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {restricted && (
                      <div
                        onClick={() => handleCountriesClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <Prohibit size={24} />
                          <span className="mt-1 ml-2">
                            {t("Restricted Countries")}
                          </span>
                          <CaretDown className="ml-auto" size={20} />
                        </div>
                        {isCountriesOpen && (
                          <div className="withdrawal">
                            {/* Виводимо обмежені країни */}
                            <div className="countries flex flex-wrap justify-between mt-1">
                              {restricted.map((restrict, index) => (
                                <div
                                  className="basis-[49%] pl-1 mb-2 flex"
                                  key={index}
                                >
                                  <MinusCircle color="#dd3333" size={18} />
                                  <span>{restrict.restrict}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="basis-[36%]">
                    <div className="brandImage p-3">
                      <Link
                      className="target-brand-exit"
                        key={brand.id_brand}
                        href={`${brand.GoBig}/${newUrl}`}
                      >
                        <Image
                          src={`/brands/${brand.CasinoBrand}.png`}
                          alt={`/brands/${brand.CasinoBrand}.png`}
                          width={250}
                          height={125}
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    <div className="buttons ml-auto flex items-center">
                      {/* <Link
                        className="btn btn-secondary text-center flex justify-center items-center"
                      href={`https://link.reg2dep1.com/${playLink}/${newUrl}`}
                        onClick={handleLinkClick}
                      >
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <Eye className="mr-2" size={20} />
                        )}
                      Read Review
                      </Link> */}
                      <div className="flex flex-col items-center w-full p-4 howUse mt-2 mb-2">
                        <span className="text-center">{t("How to get bonus?")}</span>
                        <p className="text-center m-0 text-slate-500">
                        {t("Activate bonus in your casino account")}
                        </p>
                      </div>
                      <Link
                        className="btn btn-primary mt-0 text-center flex justify-center items-center target-brand-exit"
                        href={`${brand.GoBig}/${newUrl}`}
                        target="_blank"
                      >
                        <Play className="mr-2" size={24} /> {t("Play Now")}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {hasMoreBrands && (
              <button
                className="btn-primary btn-more text-lg max-w-sm p-3 ml-auto mr-auto mt-4 font-semibold text-white flex justify-center items-center"
                onClick={loadMoreBrands}
              >
                <DotsThreeCircle className="mr-1" size={24} />
                {t("Load More Brands")}
              </button>
            )}
          </div>
          <div className="flex flex-col basis-[24%] py-6">
            {!isMobile ? (
              topBrands.slice(0, visibleBrands2).map((item) => {
                // const reviewImgSrc = extractReviewImage(item.content.rendered);
                // const playLink = extractLink(item.content.rendered);
                return (
                  <div
                    className="card-brand-banner mb-2 flex flex-col items-center pb-3"
                    key={item.id_brand}
                  >
                    <div className="brandImage p-3">
                      <Link
                        className="flex justify-center flex-col items-center target-listing-brands"
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
                      className="btn btn-primary btn-new target-listing-brands"
                      key={item.id_brand}
                      href={`${item.GoBig}/${newUrl}`}
                      target="_blank"
                    >
                     {t("Play Now")}
                    </Link>
                  </div>
                );
              })
            ) : (
              <Slider {...settings}>
                {topBrands.map((item) => {
                  return (
                    <div
                      className="card-brand-banner mb-2 flex flex-col items-center pb-3"
                      key={item.id_brand}
                    >
                      <div className="brandImage p-3">
                        <Link
                          className="flex justify-center flex-col items-center target-listing-brands"
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
                        className="btn btn-primary btn-new target-listing-brands"
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
            )}
          </div>
        </div>
      )}
    </>
  );
}


