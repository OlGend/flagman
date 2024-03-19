"use client";
import { useState } from "react";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Payments | Bonus XXXCasinoGuru",
//   description: "Navigate the complexities of casino payment methods with ease, thanks to Bonus XXXCasinoGuru's comprehensive Payments guide. From credit cards and e-wallets to cryptocurrencies, we cover all the options, detailing the pros and cons to help you make informed decisions. Learn about processing times, fees, and security measures so you can deposit and withdraw funds with confidence. Your seamless gaming experience starts with choosing the right payment method, and we're here to guide you every step of the way!",
// };

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState(1200);
  const [iframeHeight, setIframeHeight] = useState(675);

  const updateIframeSize = () => {
    const screenWidth = window.innerWidth;

    // Определите свои собственные условия для изменения размеров iframe
    if (screenWidth <= 767) {
      setIframeWidth("100%");
      setIframeHeight("100%");
    } else {
      setIframeWidth(1200);
      setIframeHeight(675);
    }
  };
  return (
    <div className="page-fortune main__container">
      <div className="pt-10 pb-10">
        <iframe
          id="myIframe"
          src="/wheel/index.html"
          width={iframeWidth}
          height={iframeHeight}
        ></iframe>
      </div>
    </div>
  );
}
