import { useState, useEffect } from "react";
import { getProducts } from "@/components/products/apiProducts";
import MediaCard from "@/components/products/Card";
import { useTranslation } from "react-i18next";
// import i18n from "@/components/i18n";

const Cards = () => {
  const [productsData, setProductsData] = useState([]);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProductsData(data.products);
      } catch (error) {
        console.error("Ошибка при получении товаров:", error);
      }
    };

    fetchData();
  }, [lang]);
  console.log("data", productsData);
  console.log("lang", lang);
  return (
    <div className="flex flex-wrap mt-10 cards">
      {productsData.map((item) => (
        <MediaCard lang={lang} item={item} key={item.product_id} />
      ))}
      <p>
        
      </p>
    </div>
  );
};

export default Cards;


