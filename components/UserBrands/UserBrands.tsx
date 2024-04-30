"use client";
import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";

export type Brand = {
  id_brand: string;
  CasinoBrand: string;
  GoBig: string;
  OurOfferContent: string;
  KeitaroGoBigID: string;
  KeitaroR2dID: string;
};
interface UserData {
  leads?: string;  // Предполагая, что 'leads' это строка, содержащая JSON-строку.
}

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

  const savedUrl = localStorage.getItem("savedUrl") || "";

  const fetchBrands = async () => {
    const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
    setBrands(brandsData);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      const userDataString = localStorage.getItem("userData") || "{}";
      let userData: UserData = JSON.parse(userDataString); 
  
      try {
        const brandsData = await getBrands(BRAND_CATEGORIES, language);
        const statusArray: LeadOrSale[] = userData.leads ? JSON.parse(userData.leads) : [];
        const newFilteredBrands = brandsData.filter((brand: Brand) =>
          statusArray.some((status: LeadOrSale) =>
            status.campaignId === brand.KeitaroGoBigID ||
            status.campaignId === brand.KeitaroR2dID
          )
        );
  
        setBrands(newFilteredBrands);
        setOtherBrands(
          brandsData.filter((brand: Brand) => !newFilteredBrands.includes(brand))
        );
      } catch (error) {
        console.error("Ошибка при загрузке брендов:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBrands();
  }, [language]);
  

  // useEffect(() => {
  //   const userDataString = localStorage.getItem("userData") || "{}";
  //   let userData = {};
  //   try {
  //     userData = JSON.parse(userDataString);
  //     const statusArray = userData.leads ? JSON.parse(userData.leads) : [];
  //     const newFilteredBrands = brands.filter((brand) =>
  //       statusArray.some(
  //         (status) =>
  //           status.campaignId === brand.KeitaroGoBigID ||
  //           status.campaignId === brand.KeitaroR2dID
  //       )
  //     );
  //     setFilteredBrands(newFilteredBrands);
  //     setOtherBrands(
  //       brands.filter((brand) => !newFilteredBrands.includes(brand))
  //     );
  //   } catch (error) {
  //     console.error("Ошибка при обработке данных пользователя:", error);
  //   }
  // }, [brands]);

  const updateUserStatus = async (
    userId: string,
    campaignId: string,
    status: string
  ) => {
    if (!userId || !campaignId) {
      console.error("Error: Missing userId or campaignId");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://pickbonus.myawardwallet.com/api/addStatus/add_status.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            campaignId: campaignId,
            status: status,
          }),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      await fetchBrands();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      <h3>You are registered</h3>
      <div className="flex flex-wrap px-0 py-6">
        {brands.map((brand) => (
          <BrandCard brand={brand} savedUrl={savedUrl} key={brand.id_brand} />
        ))}
      </div>
      <h3>More options available</h3>
      <div className="flex flex-wrap px-0 py-6">
        {otherBrands.map((brand) => (
          <BrandCard
            brand={brand}
            savedUrl={savedUrl}
            key={brand.id_brand}
            register={() =>
              updateUserStatus(
                localStorage.getItem("user_id") || "",
                brand.KeitaroGoBigID,
                "lead"
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

const BrandCard: React.FC<{
  brand: Brand;
  savedUrl: string;
  register?: () => void;
}> = ({ brand, savedUrl, register }) => (
  <div className="card-brand mb-3 basis-[19%] glowing-box">
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
      <div className="buttons">
        {register ? (
          <button className="btn btn-primary" onClick={register}>
            Register Now
          </button>
        ) : (
          <Link className="btn btn-primary" href={`${brand.GoBig}/${savedUrl}`}>
            Explore More
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default UserBrands;
