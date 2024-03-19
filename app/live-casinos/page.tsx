import { Metadata } from "next";


import FilteredCasinos from "@/components/casinos/FilteredCasinos";

import LiveCasinos from "@/components/casinos/LiveCasinos";

export const metadata: Metadata = {
  title: "Live Casinos | Bonus XXXCasinoGuru",
  description: "Experience the thrill of a real casino from the comfort of your home with our exhaustive guide to Live Casinos on Bonus XXXCasinoGuru. Get the lowdown on live dealer games, from blackjack and roulette to baccarat and poker, all streamed in high-quality video. Our guide reviews the most reputable live casinos, detailing their game variety, interface, and bonus offers. With tips and strategies from experts, elevate your gaming experience to the next level. Don't settle for less—immerse yourself in the most authentic casino atmosphere with our curated list of top live casinos!",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <LiveCasinos />
      {/* <TopBrands /> */}
      <FilteredCasinos />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
