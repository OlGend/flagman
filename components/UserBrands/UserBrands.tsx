"use client";
import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import { updateUserStatus } from "./UpdateUserStatus";
import { getUserData } from "@/components/getUser/getUser";

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

  // const savedUrl = localStorage.getItem("savedUrl") || "";
  let savedUrl = "";
  if (typeof window !== "undefined") {
    savedUrl = localStorage.getItem("user_id") || "";
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
    setIsLoading(true);
    const data = await getUserData(localStorage.getItem("user_id"));
    if (!data) {
      // Проверка на null
      console.error("Received null data from getUserData");
      setIsLoading(false); // Обязательно остановить индикатор загрузки
      return; // Выход из функции, если данные нулевые
    }
    const userDataString = data.leads;
    let userData: LeadOrSale[] = [];

    try {
      const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
      userData = JSON.parse(userDataString);

      const statusArray = userData.map((item) => item.campaignId);

      const newFilteredBrands = brandsData.filter((brand) =>
        statusArray.some(
          (status) =>
            status === brand.KeitaroGoBigID || status === brand.KeitaroR2dID
        )
      );

      setBrands(newFilteredBrands);

      setOtherBrands(
        brandsData.filter((brand) => !newFilteredBrands.includes(brand))
      );

    } catch (error) {
      console.error("Ошибка при загрузке брендов:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchBrands();
    }
  }, [language, isShow, userId]);


  console.log("UserId check:", userId);
  if (userId === "null") {
    return null;
  }

  return userId ? (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      <h3>You are registered from us</h3>
      <div className="flex flex-wrap px-0 py-6">
        {brands.map((brand) => (
          <BrandCard brand={brand} savedUrl={savedUrl} key={brand.id_brand} />
        ))}
      </div>
      <h3>You can registered from us</h3>
      <div className="flex flex-wrap px-0 py-6">
        {otherBrands.map((brand) => (
          <BrandCard
            brand={brand}
            savedUrl={savedUrl}
            key={brand.id_brand}
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
}> = ({ brand, savedUrl, register }) => (
  <div className="card-brand mb-3 basis-[24%] glowing-box">
    <div className="brandImage p-3">
      <Link href={`${brand.GoBig}/${savedUrl}`}>
        <Image
          src={`/brands/${brand.CasinoBrand}.png`}
          alt={`Image of ${brand.CasinoBrand}`}
          width={150}
          height={75}
        />
      </Link>
    </div>
    <div className="brandContent p-3">
      <div>
        <div className="review-bonus">{brand.OurOfferContent}</div>
      </div>
      <div className="buttons flex items-center justify-between">
        {register ? (
          <button className="btn btn-secondary btn-fz" onClick={register}>
           I&#39;m Registered
          </button>
        ) : (
          ""
        )}
          <Link className="btn btn-primary btn-fz" href={`${brand.GoBig}/${savedUrl}`}>
            Deposit Now
          </Link>
      </div>
    </div>
  </div>
);

export default UserBrands;
