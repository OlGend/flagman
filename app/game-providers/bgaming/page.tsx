import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredProviders from "@/components/providers/FilteredProviders";
import PreviewBonuses from "@/components/PreviewBonuses";
import GuideSlotsPage from "@/components/GuideSlotsPage";
import Bgaming from "@/components/providers/Bgaming";

export const metadata: Metadata = {
  title: "BGaming | XXLCasinoList",
  description: "Navigate the dynamic world of BGaming with our thorough guide at XXLCasinoList. BGaming is recognized for its versatile game portfolio, featuring high-quality slots, table games, and more. Our comprehensive guide highlights their popular titles, cutting-edge features, and what sets BGaming apart in the ever-evolving casino landscape. Additionally, we provide a carefully curated list of top casinos where you can safely enjoy BGaming’s suite of games. Whether you’re a newcomer seeking an introduction or a seasoned player looking for deeper insights, our guide is your ultimate resource for mastering BGaming.",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <Bgaming />
      {/* <TopBrands /> */}
      <FilteredProviders />
      <GuideSlotsPage />
    </div>
  );
}
