import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredBonuses from "@/components/bonuses//FilteredBonuses";
import PreviewBonuses from "@/components/PreviewBonuses";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import NoWageringBonuses from "@/components/bonuses/NoWageringBonuses";

export const metadata: Metadata = {
  title: "No Wagering  Bonuses | XXLCasinoList",
  description: "Discover the ultimate freedom of No Wagering Bonuses with our comprehensive guide at XXLCasinoList. Say goodbye to steep playthrough requirements and unlock your bonuses instantly. Our in-depth guide covers the ins and outs of no wagering bonuses, helping you understand how they work and why they offer unparalleled value. Plus, find an exclusive list of top-rated casinos that offer these hassle-free bonuses, so you can start playing and winning right away. Don't get caught in the wagering web—level up your gaming experience with No Wagering Bonuses and our expert guidance!",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <NoWageringBonuses />
      {/* <TopBrands /> */}
      <FilteredBonuses />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
