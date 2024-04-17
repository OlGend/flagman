//page.tsx
import { Metadata } from "next";
import TopBrands from "@/components/TopBrands";

import FilteredHome from "@/components/FilteredHome";
import Fortunes from "@/components/fortune";

export const metadata: Metadata = {
  title:
    "Bonus XXXCasinoGuru: Your Comprehensive Source for Casino Reviews and Insights",
  description:
    "Welcome to Bonus XXXCasinoGuru, your ultimate destination for comprehensive casino reviews and invaluable insights. Whether you're a seasoned gambler or just starting your casino journey, we're here to guide you through the world of online casinos. Our expert team meticulously reviews casinos, covering game variety, bonuses, payment options, security, and more. With our in-depth analysis and unbiased recommendations, you can make informed decisions and elevate your gaming experience. Explore our extensive database, stay updated with the latest trends, and embark on a rewarding casino adventure with Bonus XXXCasinoGuru.",
};

export default async function Home() {

  const banner = true;
  return (
    <>
      {/* <PreviewHome /> */}

      <TopBrands />

      <div className="main__container">
        <Fortunes banner={banner} />
      </div>

      <div className="background-block">
        <FilteredHome />
        {/* <NewBrands /> */}
      </div>
      {/* <TopBrandsOriginal /> */}
      {/* <ReviewBrands /> */}
      {/* <GuideSlotsHome /> */}
    </>
  );
}
