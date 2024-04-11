import { useState, useEffect } from "react";
import { getProducts } from "@/components/products/apiProducts";
import MediaCard from "@/components/products/Card";
import { useTranslation } from "react-i18next";
// import i18n from "@/components/i18n";

const Cards = ({ user, onFinish }) => {
  const [productsData, setProductsData] = useState([]);
  const { i18n } = useTranslation();
  // const userId = user;
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

  // const onTest = () => {
  //   console.log("WORKING");
  //   _scq.push([
  //     "identify",
  //     {
  //       email: "johnw.doe@example.com",
  //       firstName: "Johnw",
  //       lastName: "Doe",
  //       birthday: "1989-03-03",
  //       customFields: {
  //         Position: "Software Engineer",
  //         Age: "34",
  //         Experience: "10",
  //       },
  //       tags: ["PAYOUT REQUEST"],
  //     },
  //   ]);
  // };

  return (
    <div className="flex flex-wrap mt-10 cards">
      {/* <button className="btn btn-primary" onClick={() => onTest()}>
        Test SendX Identification
      </button> */}
      {productsData.map((item) => (
        <MediaCard
          lang={lang}
          item={item}
          onFinish={onFinish}
          key={item.product_id}
        />
      ))}
      <p></p>
    </div>
  );
};

export default Cards;
