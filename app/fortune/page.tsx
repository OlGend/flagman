"use client";
import { useState } from "react";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Payments | Bonus XXXCasinoGuru",
//   description: "Navigate the complexities of casino payment methods with ease, thanks to Bonus XXXCasinoGuru's comprehensive Payments guide. From credit cards and e-wallets to cryptocurrencies, we cover all the options, detailing the pros and cons to help you make informed decisions. Learn about processing times, fees, and security measures so you can deposit and withdraw funds with confidence. Your seamless gaming experience starts with choosing the right payment method, and we're here to guide you every step of the way!",
// };

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState<string>('1200px');
  const [iframeHeight, setIframeHeight] = useState<string>('675px');
  
  const updateIframeSize = () => {
    const screenWidth = window.innerWidth;
  
    if (screenWidth <= 767) {
      setIframeWidth('100%');
      setIframeHeight('100%');
    } else {
      setIframeWidth('1200px');
      setIframeHeight('675px');
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
