// import { Metadata } from "next";
// import BrandById from "@/components/BrandById";
// // import CarouselSlider from "@/components/CarouselSlider";
// import NewBrands from "@/components/NewBrands";
// // import GuideSlotsPage from "@/components/GuideSlotsPage";

// async function getData(id: string) {
//   // Здесь выполняйте загрузку данных бренда, например, с использованием fetch
//   const response = await fetch(`https://hotoffers.casino/wp-json/wp/v2/affiliates/${id}`);
//   const data = await response.json();
//   return data;
// }

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const brand = await getData(id);
//   return {
//     title: `${brand.title.rendered} | Bonus XXXCasinoGuru | Bonuses`,
//   };
// }


// export default async function Brand({ params: { id } }: Props) {
//   const brand = await getData(id);
//   return (
//     <>
//       <div className={`main__container brandUtils brand-${id}`}>
//         <BrandById brand={brand.id} />
//         {/* <CarouselSlider slides={[]} /> */}
//         <div className="wrapper-container background-block">
//           <NewBrands />
//         </div>
//         <div className="wrapper-container mt-6 mb-6">
//           {/* <GuideSlotsPage /> */}
//           </div>
//       </div>
//     </>
//   );
// }
