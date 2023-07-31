import { Metadata } from "next";

import TopBrands from "@/components/TopBrands";
import NewBrands from "@/components/NewBrands";

export const metadata: Metadata = {
  title: "Bonuses | New Brand",
  description: "Generated by create next app",
};

export default async function Bonuses() {
  return (
    <>
      <div className="main__container">
        <h1>Bonuses page</h1>
        <TopBrands />
         <NewBrands />
      </div>
    </>
  );
}
