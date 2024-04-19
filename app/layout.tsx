import { Analytics } from "@vercel/analytics/react";
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
            <Analytics />
          </main>
          <TheFooter />
        </LanguageProvider>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R5MZ7TVJRB');
            `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R5MZ7TVJRB"
          strategy="afterInteractive"
        />
        <Script id="tgm">
          {`
          function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M68KW5XM');
          `}
        </Script>
        <Script id="hotjar">
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3873571,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
        <Script id="ladesc">
          {`
            (function (d, src, c) {
              var t = d.scripts[d.scripts.length - 1],
                s = d.createElement("script");
              s.id = "la_x2s6df8d";
              s.defer = true;
              s.src = src;
              s.onload = s.onreadystatechange = function () {
                var rs = this.readyState;
                if (rs && rs != "complete" && rs != "loaded") {
                  return;
                }
                c(this);
              };
              t.parentElement.insertBefore(s, t.nextSibling);
            })(document, "https://maw.ladesk.com/scripts/track.js", function (e) {
              LiveAgent.createButton("32wx1d8n", e);
            });
          `}
        </Script>
      </body>
    </html>
  );
}
