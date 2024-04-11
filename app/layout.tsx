// import { Analytics } from "@vercel/analytics/react";
import { TheHeader } from "@/components/TheHeader";
import "./globals.css";
import type { Metadata } from "next";
import { TheFooter } from "@/components/TheFooter";
import { LanguageProvider } from "@/components/switcher/LanguageContext";
import RandomWindow from "@/components/random/RandomWindow";
// import BannerWindow from "@/components/banner/BannerWindow";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Bonus XXXCasinoGuru: Your Comprehensive Source for Casino Reviews and Insights",
  description:
    "Welcome to Bonus XXXCasinoGuru, your ultimate destination for comprehensive casino reviews and invaluable insights. Whether you're a seasoned gambler or just starting your casino journey, we're here to guide you through the world of online casinos. Our expert team meticulously reviews casinos, covering game variety, bonuses, payment options, security, and more. With our in-depth analysis and unbiased recommendations, you can make informed decisions and elevate your gaming experience. Explore our extensive database, stay updated with the latest trends, and embark on a rewarding casino adventure with Bonus XXXCasinoGuru.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
    
       


        <LanguageProvider>
          <TheHeader />

          <main>
            {children}
            {/* <Analytics /> */}
          </main>
          <TheFooter />
        </LanguageProvider>
        {/* <Script id="sendx">
          {`
            var _scq = _scq || [];
            var _scs = _scs || {};
            _scs.teamId = "xJsMCWbZMv32X90WBkQnTx";

            (function() {
              var dc = document.createElement('script');
              dc.type = 'text/javascript';
              dc.async = true;
              dc.src = '//cdn.sendx.io/prod/xJsMCWbZMv32X90WBkQnTx.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(dc, s);
            })();
          `}
        </Script> */}
      </body>
    </html>
  );
}
