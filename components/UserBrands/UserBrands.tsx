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
    const userLeads: LeadOrSale[] = JSON.parse(data.leads || '[]');
    const userSales: LeadOrSale[] = JSON.parse(data.sales || '[]');
  
    // Создание массивов идентификаторов кампаний из лидов и продаж
    const leadsIds = userLeads.map((lead) => lead.campaignId);
    const salesIds = userSales.map((sale) => sale.campaignId);
  
    try {
      const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
  
      // Фильтрация брендов по лидам, которые не пересекаются с продажами
      const leadsOnlyBrands = brandsData.filter((brand) =>
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
      
      <h2>These are casinos where the user registered and did not make the first deposit</h2>
      <div className="flex flex-wrap px-0 py-6">
        {brands.map((brand) => (
          <BrandCard brand={brand} savedUrl={savedUrl} key={brand.id_brand} />
        ))}
      </div>
      <h2>These are casinos where the user did not register and did not make a first deposit</h2>
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
