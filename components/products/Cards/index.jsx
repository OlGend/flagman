import { useState, useEffect } from "react";
import { getProducts } from "@/components/products/apiProducts";
import Card from "@/components/products/Card";

const Cards = () => {
  const [productsData, setProductsData] = useState([]);

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
  }, []);
  console.log("data", productsData);
  return (
    <div className="flex flex-wrap mt-10 cards">
      {productsData.map((item) => (
        <Card item={item} key={item.product_id} />
      ))}
      <p>
        
      </p>
    </div>
  );
};

export default Cards;


