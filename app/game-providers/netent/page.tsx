import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredProviders from "@/components/providers/FilteredProviders";
import PreviewBonuses from "@/components/PreviewBonuses";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import Netent from "@/components/providers/Netent";

export const metadata: Metadata = {
  title: "NeTent | XXLCasinoList",
  description: "Discover the magic of NetEnt games with our comprehensive guide at XXLCasinoList. A pioneering force in the online casino world, NetEnt is known for its graphically stunning slots, innovative features, and immersive live casino games. Our in-depth guide takes you through their classic and newest titles, special gameplay mechanics, and the key elements that make NetEnt a favorite among players. Plus, find a curated selection of premium casinos offering NetEnt games for a top-tier gaming experience. Whether you're new to NetEnt or a seasoned aficionado, our guide provides everything you need to enjoy their offerings to the fullest.",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <Netent />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
