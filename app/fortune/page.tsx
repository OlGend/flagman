"use client";
import { useState, useEffect } from "react";
import Fortunes from "@/components/fortune";

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState("1170px");
  const [iframeHeight, setIframeHeight] = useState("658px");

  useEffect(() => {
    const updateIframeSize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 767) {
        setIframeWidth("100%");
        setIframeHeight("100%");
      } else {
        setIframeWidth("1170px");
        setIframeHeight("658px");
      }
    };
    window.addEventListener("resize", updateIframeSize);
    updateIframeSize(); // Вызываем сразу, чтобы инициализировать размеры

    // Очистка
    return () => window.removeEventListener("resize", updateIframeSize);
  }, []);

  return (
    <div className="page-fortune main__container">
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
