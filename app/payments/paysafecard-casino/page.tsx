import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredPayments from "@/components/payments//FilteredPayments";
import PreviewBonuses from "@/components/PreviewBonuses";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import Paysafe from "@/components/payments/Paysafe";

export const metadata: Metadata = {
  title: "Paysafecard payments | Bonus XXXCasinoGuru",
  description: "Embrace the power of anonymity and security with Paysafecard payments, your guide to which can be found on Bonus XXXCasinoGuru. Ideal for players who prioritize privacy, Paysafecard allows you to play without revealing personal banking information. Our comprehensive guide walks you through the simple process of purchasing and using Paysafecard, outlining its pros and cons for casino gaming. Discover top-rated casinos that accept Paysafecard and start your secure gaming adventure today. With our expert advice, make Paysafecard your go-to payment option for peace of mind and convenience!",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <Paysafe />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
