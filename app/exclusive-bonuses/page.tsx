import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";
import FilteredBonuses from "@/components/bonuses//FilteredBonuses";
import PreviewBonuses from "@/components/PreviewBonuses";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import ExclusiveBonuses from "@/components/bonuses/ExclusiveBonuses";

export const metadata: Metadata = {
  title: "Exclusive  Bonuses | Bonus XXXCasinoGuru",
  description: "Discover a world of exceptional rewards with our detailed guide to Exclusive Bonuses at Bonus XXXCasinoGuru. Curated for the discerning player, our guide illuminates the types of exclusive bonuses available, from high-roller promotions to VIP packages. We outline how to qualify, what to expect, and how to maximize these premium offers. Plus, browse our handpicked list of reputable casinos that offer the most attractive and reliable exclusive bonuses. Whether you're a casual gamer or a committed enthusiast, our guide serves as your roadmap to unlocking unparalleled value and excitement in your gaming experience.",
};

export default async function Bonuses() {
  
  return (
    <div className="page-bonuses">
      <ExclusiveBonuses />
      {/* <TopBrands /> */}
      <FilteredBonuses />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
