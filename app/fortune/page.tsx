"use client";
import { useState, useEffect } from "react";
import Fortunes from "@/components/fortune";
import { getUserData } from "@/components/getUser/getUser";

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState("1170px");
  const [iframeHeight, setIframeHeight] = useState("658px");
  const [userData, setUserData] = useState(null);

  // Получение ID пользователя
  const userId = localStorage.getItem("user_id");

  // Обновление размеров iframe при изменении размеров окна
  useEffect(() => {
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
  const startOfDay = (date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // Функция для обновления данных пользователя, если необходимо
  const updateUserDataIfNeeded = async (data) => {
    if (!data) return;

    const oldDate = data.winbalance ? new Date(data.winbalance) : new Date(0);
    startOfDay(oldDate);
    const newDate = new Date();
    startOfDay(newDate);

    if (newDate - oldDate >= 86400000) {
      const formattedNewDate = newDate.toISOString();

      try {
        const body = JSON.stringify({
          id: userId,
          winbalance: formattedNewDate,
        });
        const response = await fetch(
          "https://pickbonus.myawardwallet.com/api/user/update_time.php",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        console.log("Данные успешно обновлены");
        await fetchData(); // Перезагружаем данные пользователя
      } catch (error) {
        console.error("Ошибка при обновлении данных пользователя:", error);
      }
    } else {
      console.log("Обновление не требуется.");
    }
  };

  // Функция для получения данных пользователя
  const fetchData = async () => {
    if (!userId) return;
    try {
      const data = await getUserData(userId);
      setUserData(data);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  addEventListener("message", (event) => {
    fetchData(userId);
    updateUserDataIfNeeded(userData);
  });

  return (
    <div className="page-fortune main__container">
      <button onClick={() => updateUserDataIfNeeded(userData)}>On</button>
      <div className="pt-10 pb-10">
        <iframe
          id="myIframe"
          src="/wheel/index.html"
          width={iframeWidth}
          height={iframeHeight}
        />
      </div>
      <Fortunes />
    </div>
  );
}
