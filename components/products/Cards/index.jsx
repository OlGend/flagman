import { useState, useEffect } from "react";
import { getProducts } from "@/components/products/apiProducts";
import MediaCard from "@/components/products/Card";
import { useTranslation } from "react-i18next";


const Cards = ({ user, onFinish }) => {
  const [productsData, setProductsData] = useState([]);
  const { i18n, t } = useTranslation();
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


  return (
    <div className="flex flex-wrap mt-10 cards">
      {productsData.map((item) => (
        <MediaCard
          lang={lang}
          item={item}
          onFinish={onFinish}
          key={item.product_id}
        />
      ))}
      <span className="cardaval">{t("Card availability varies by region.")}</span>
    </div>
  );
};

export default Cards;
