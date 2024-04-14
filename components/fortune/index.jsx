import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import i18n from "@/components/i18n";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Loader from "../Loader";
const Fortunes = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const categoryBrands = { key1: "Segment2", key2: "Premium" };

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
  // Чтение сохраненной ссылки из локального хранилища
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");

    // Установка новой ссылки в состояние
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  return (
    <div className="flex flex-wrap px-0 py-6">
      {isLoading ? (
        <Loader /> // Показываем лоадер, если данные загружаются
      ) : (
        brands.map((brand) => (
          <div key={brand.id_brand} className="card-brand mb-3 basis-[19%]">
            <div className="brandImage p-3">
              <Link href={`${brand.GoBig}/${newUrl}`}>
                <Image
                  src={`/brands/${brand.CasinoBrand}.png`}
                  alt={`/brands/${brand.CasinoBrand}.png`}
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
                <Link
                  className="btn btn-primary"
                  href={`${brand.GoBig}/${newUrl}`}
                >
                  Play Now
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Fortunes;
