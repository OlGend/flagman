// import { Metadata } from "next";

// async function getData(id: string) {
//   const response = await fetch(
//     `https://hotoffers.casino/wp-json/wp/v2/affiliates/${id}`,
//     {
//       next: {
//         revalidate: 60,
//       },
//     }
//   );
//   return response.json();
// }

// type Props = {
//   params: {
//     id: string;
//   };
// };

// export async function generateMetadata({
//   params: { id },
// }: Props): Promise<Metadata> {
//   const brand = await getData(id); // Дожидаемся окончания функции getData
//   return {
//     title: brand.title, // Используем актуальный заголовок из полученных данных
//   };
// }

// export default async function Brand({ params: { id } }: Props) {
//   const brand = await getData(id);

//   return (
//     <>
//       <h1>{brand.title.rendered}</h1>
//       <div dangerouslySetInnerHTML={{ __html: brand.content.rendered }} />
//     </>
//   );
// }
