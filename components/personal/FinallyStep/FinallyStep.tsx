import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "@/components/Loader";

type FinallyStepProps = {
  text: string;
  onClick: () => Promise<void>;
  t: Function; 
};

interface Brand {
  id_brand: string;
  CasinoBrand: string;
  GoBig: string;
  OurOfferContent: string;
}


export const FinallyStep = ({ text, onClick, t }: FinallyStepProps) => {

  const [brands, setBrands] = useState<Brand[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const categoryBrands = { key1: "Segment2", key2: "Premium" };
  const { language } = useLanguage();

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      const brandsData = await getBrands(categoryBrands, language) as Brand[];
      setBrands(brandsData);
      
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
    <StyledDiv>
      <Typography>{text}</Typography>
      <Box>
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
      </Box>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(
  () => `
    display: flex;
    flex-direction: column;
    gap: 16px;
  `
);
