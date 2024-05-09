"use client";
import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import { updateUserStatus } from "./UpdateUserStatus";
import { getUserData } from "@/components/getUser/getUser";
import { useTranslation } from "react-i18next";

export type Brand = {
  id_brand: string;
  CasinoBrand: string;
  GoBig: string;
  OurOfferContent: string;
  KeitaroGoBigID: string;
  KeitaroR2dID: string;
};

interface LeadOrSale {
  campaignId: string;
  status: string;
  timestamp: string;
  paymentMethod: string;
  paymentSumIn: string;
  paymentAddress: string;
  USD: string;
}

const BRAND_CATEGORIES = { key1: "Segment2", key2: "Sandbox" };

const UserBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [otherBrands, setOtherBrands] = useState<Brand[]>([]);

  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIshow] = useState(false);
  const { t } = useTranslation();

  // const savedUrl = localStorage.getItem("savedUrl") || "";
  let savedUrl = "";
  if (typeof window !== "undefined") {
    savedUrl = localStorage.getItem("savedUrl") || "";
  }

  // const userId = localStorage.getItem("user_id");
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  const fetchBrands = async () => {
    if (userId === "null") {
      console.error("No user ID found, unable to fetch brands.");
      setIsLoading(false);
      return;
    }
    if (!userId) {
      console.error("No user ID found, unable to fetch brands.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await getUserData(userId);
    if (!data) {
      console.error("Received null data from getUserData");
      setIsLoading(false);
      return;
    }

    // Преобразование строк JSON в массивы объектов
    const userLeads: LeadOrSale[] = JSON.parse(data.leads || "[]");
    const userSales: LeadOrSale[] = JSON.parse(data.sales || "[]");

    // Создание массивов идентификаторов кампаний из лидов и продаж
    const leadsIds = userLeads.map((lead) => lead.campaignId);
    const salesIds = userSales.map((sale) => sale.campaignId);

    try {
      const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);

      // Фильтрация брендов по лидам, которые не пересекаются с продажами
      const leadsOnlyBrands = brandsData.filter(
        (brand) =>
          leadsIds.includes(brand.KeitaroGoBigID) &&
          !salesIds.includes(brand.KeitaroGoBigID)
      );

      // Обновление состояния с брендами только из лидов
      setBrands(leadsOnlyBrands);

      // Остальные бренды, которые могут быть использованы в другом контексте
      setOtherBrands(
        brandsData.filter((brand) => !leadsIds.includes(brand.KeitaroGoBigID))
      );
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBrands();
    }
  }, [language, isShow, userId]);

  if (userId === "null") {
    return null;
  }

  return userId ? (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      {brands.length > 0 && (
        <h2>{t("Your Registration Completed, First Deposit Awaited")}</h2>
      )}
      <div className="flex flex-wrap px-0 py-6">
        {brands.map((brand) => (
          <BrandCard brand={brand} savedUrl={savedUrl} key={brand.id_brand} t={t} />
        ))}
      </div>
      {otherBrands.length > 0 && (
        <h2>{t("Registration and First Deposit Not Completed")}</h2>
      )}
      <div className="flex flex-wrap px-0 py-6">
        {otherBrands.map((brand) => (
          <BrandCard
            brand={brand}
            savedUrl={savedUrl}
            key={brand.id_brand}
            t={t}
            register={() => {
              updateUserStatus(
                localStorage.getItem("user_id") || "",
                brand.KeitaroGoBigID,
                "lead",
                () => {
                  fetchBrands(); // Эта функция вызовется после успешного обновления статуса
                  setIshow((prev) => !prev); // Это изменит состояние isShow
                }
              );
            }}
          />
        ))}
      </div>
    </div>
  ) : null;
};

const BrandCard: React.FC<{
  brand: Brand;
  savedUrl: string;
  register?: () => void;
  t: Function;
}> = ({ brand, savedUrl, register, t }) => (
  <div className="card-brand mb-3 basis-[49%] glowing-box">
    <div
      className={`brandImage p-3 items-start flex flex-col ${
        register ? "frstreg" : "frstdep"
      }`}
    >
      <Link
        className={`flex flex-col items-start`}
        href={`${brand.GoBig}/${savedUrl}`}
      >
        <Image
          src={`/brands/${brand.CasinoBrand}.png`}
          alt={`Image of ${brand.CasinoBrand}`}
          width={200}
          height={100}
        />
        <div>
          <div className="review-bonus">{brand.OurOfferContent}</div>
        </div>
      </Link>
      <div className="buttons flex items-center justify-between">
        {register ? (
          <button
            className="btn btn-secondary btn-fz btn-fzl mr-2"
            onClick={register}
          >
            {t("I'm Registered")}
          </button>
        ) : (
          ""
        )}
        <Link
          className="btn btn-primary btn-fz"
          href={`${brand.GoBig}/${savedUrl}`}
        >
          {t("Deposit Now")}
        </Link>
      </div>
    </div>
    {/* <div className="brandContent p-3">
    </div> */}
  </div>
);

export default UserBrands;
