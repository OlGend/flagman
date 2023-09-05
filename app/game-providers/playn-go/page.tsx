import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredProviders from "@/components/providers/FilteredProviders";
import PreviewBonuses from "@/components/PreviewBonuses";
import GuideSlotsPage from "@/components/GuideSlotsPage";
import Playngo from "@/components/providers/Playngo";

export const metadata: Metadata = {
  title: "Play'n Go | XXLCasinoList",
  description: "Immerse yourself in the innovative world of Play'n Go with our comprehensive guide at XXLCasinoList. Celebrated for its top-tier slots and high-quality table games, Play'n Go stands as a pillar of creativity and excitement in the online casino industry. Our guide provides an in-depth look at their popular titles, unique game features, and the technology that powers the Play'n Go experience. Additionally, we offer a curated list of premier casinos where you can enjoy these captivating games. Whether you're just discovering Play'n Go or are a long-time fan, our guide equips you with the knowledge to maximize your enjoyment.",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <Playngo />
      {/* <TopBrands /> */}
      <FilteredProviders />
      <GuideSlotsPage />
    </div>
  );
}
