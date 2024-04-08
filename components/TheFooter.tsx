"use client";
import Image from "next/image";
import Img from "@/public/logo3.png";
import { useTranslation } from "react-i18next";
import { Link } from "phosphor-react";

const TheFooter = () => {

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="flex  text-white flex-col">
        <div className="footer-top ">
          <div className="main__container flex justify-between items-center pb-3 pt-5">
            <div className="logo">
              <Image src={Img} alt="logo" width={150} loading="lazy" />
            </div>
            <div className="solution-contacts flex">
              <div>
                <p className="mb-1">{t("Our Contacts:")}</p>
                <a
                  className="underline flex items-center"
                  href="mailto:manager@reg2dep.business"
                >
                  manager@reg2dep.business
                </a>
              </div>
              <div className="flex flex-col">
                <a
                  className="underline ml-5 flex items-end mb-1"
                  href="/responsible-gaming"
                >
                  {t("Responsible Gaming")}
                </a>
                <a
                  className="underline ml-5 flex items-end mb-1"
                  href="/privacy-policy"
                >
                  {t("Privacy Policy")}
                </a>
                <a
                  className="underline ml-5 flex items-end "
                  href="/terms-and-conditions"
                >
                  {t("Terms and Conditions")}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-center ">
          <div className="main__container flex pt-5 pb-4">
            <div className="solution-images flex flex-wrap justify-start items-center">
            </div>
            <div className="flex flex-col ml-auto mr-auto ">
              <div className="solution-text flex flex-col items-center">
                <h4 className="text-center mb-1">{t("Empowering iGaming Solutions")}</h4>
                <p className="text-center">{t("Unlocking 15 Websites That Will Boost Your Brand to New Heights")}</p>
                <a
                  className="btn btn-primary m-auto"
                  target="_blank"
                  href="skype:live:.cid.3ebe8eae09c57c4f?chat"
                >
                 {t("Start Working With Us")}
                </a>
              </div>
            </div>
            <div className="solution-images flex flex-wrap justify-end items-center">
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="main__container pt-3">
            <p>bonus.xxxcasinoGuru.com {t("footer_description")}</p>
          </div>
        </div> */}
        <div className="footer-end">
          <div className="main__container pt-3 pb-3 flex justify-center">
            <span>Copyright © 2024, bonus.xxxcasinoGuru.com All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { TheFooter };
