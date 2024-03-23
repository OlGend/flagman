"use client";
import { useState } from "react";

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
