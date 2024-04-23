"use client";
import { useState, useEffect } from "react";
import Fortunes from "@/components/fortune";
import { getUserData } from "@/components/getUser/getUser";
import { useTranslation } from "react-i18next";
interface UserData {
  winbalance?: string; // "?" указывает, что свойство необязательное
  // Добавьте другие свойства здесь по необходимости
}

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState("1170px");
  const [iframeHeight, setIframeHeight] = useState("658px");
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
  const banner = false;

  // const [usId, setUsId] = useState();
  // console.log("USID", usId);

  // Обновление размеров iframe при изменении размеров окна
  useEffect(() => {
    // Получение ID пользователя
    // if (typeof window !== "undefined") {
    //   const userId = localStorage.getItem("user_id");
    //   setUsId(userId);
    // }
    const updateIframeSize = () => {
      const screenWidth = window.innerWidth;
      setIframeWidth(screenWidth <= 767 ? "100%" : "1170px");
      setIframeHeight(screenWidth <= 767 ? "100%" : "658px");
    };

    window.addEventListener("resize", updateIframeSize);
    updateIframeSize();

    return () => window.removeEventListener("resize", updateIframeSize);
  }, []);

  // Функция для обнуления времени в объекте даты
  // const startOfDay = (date: Date) => {
  //   date.setHours(0, 0, 0, 0);
  //   return date;
  // };

  // Функция для обновления данных пользователя, если необходимо
  // const updateUserDataIfNeeded = async (data: UserData) => {
  //   if (!data) return;

  //   const oldDate = data.winbalance ? new Date(data.winbalance) : new Date(0);
  //   startOfDay(oldDate);
  //   const newDate = new Date();
  //   startOfDay(newDate);

  //   if (newDate.getTime() - oldDate.getTime() >= 86400000) {
  //     const formattedNewDate = newDate.toISOString();

  //     try {
  //       const body = JSON.stringify({
  //         id: usId,
  //         winbalance: formattedNewDate,
  //       });
  //       const response = await fetch(
  //         "https://pickbonus.myawardwallet.com/api/user/update_time.php",
  //         {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body,
  //         }
  //       );

  //       if (!response.ok) throw new Error(`Error: ${response.status}`);
  //       console.log("Данные успешно обновлены");
  //       await fetchData(); // Перезагружаем данные пользователя
  //     } catch (error) {
  //       console.error("Ошибка при обновлении данных пользователя:", error);
  //     }
  //   } else {
  //     console.log("Обновление не требуется.");
  //   }
  // };

  // // Функция для получения данных пользователя
  // const fetchData = async () => {
  //   if (!usId) return;
  //   try {
  //     const data = await getUserData(usId);
  //     setUserData(data);
  //     console.log("DATA", data)
  //   } catch (error) {
  //     console.error("Ошибка при получении данных пользователя:", error);
  //   }
  // };

  // addEventListener("message", (event) => {
  //   console.log("EVENT", event);
  // fetchData(userId);
  // updateUserDataIfNeeded(userData);
  // });

  // const [messageData, setMessageData] = useState(null);
  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (event.origin !== window.location.origin) {
  //       console.error("unauthorized origin", event.origin);
  //       return;
  //     }
  //     let dataString =
  //       typeof event.data === "string"
  //         ? event.data
  //         : JSON.stringify(event.data);

  //     if (dataString.includes("Json:")) {
  //       setMessageData(dataString);

  //       fetchData();
  //       if (userData) {
  //         updateUserDataIfNeeded(userData);
  //         // return;
  //       }
  //     }
  //     console.log("Received data", dataString);
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, [messageData]);

  const target = "target-fw-brands-wheel-page";
  const creative = "FW_Brands_Wheel_Page";
  return (
    <div className="page-fortune main__container">
      {/* <button onClick={() => updateUserDataIfNeeded(userData)}>On</button> */}
      <div className="pt-10 pb-10">
        <iframe
          id="myIframe"
          src="/wheelNew/index.html"
          width={iframeWidth}
          height={iframeHeight}
        />
      </div>

      <Fortunes banner={banner} target={target} creative={creative} />
    </div>
  );
}
