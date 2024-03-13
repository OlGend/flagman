// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const SliderExample = () => {
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   useEffect(() => {
//     // Здесь вы можете динамически загрузить изображения
//     // Например, с использованием new Image()
//     const img1 = new Image();
//     img1.src = "/letter1.png";
//     const img2 = new Image();
//     img2.src = "/letter2.png";
//     const img3 = new Image();
//     img3.src = "/letter3.png";
//     const img4 = new Image();
//     img4.src = "/letter4.png";
//     // После загрузки всех изображений устанавливаем флаг imagesLoaded в true
//     Promise.all([img1, img2, img3])
//       .then(() => {
//         setImagesLoaded(true);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке изображений:", error);
//       });
//   }, []);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           initialSlide: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   if (!imagesLoaded) {
//     // Если изображения еще не загружены, вы можете отобразить загрузочный индикатор или что-то подобное
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="slider-popup">
//       <Slider {...settings}>
//         <div>
//           <img src="/letter1.png" alt="Slide 1" width={298} height={300} />
//         </div>
//         <div>
//           <img src="/letter2.png" alt="Slide 2" width={298} height={300} />
//         </div>
//         <div>
//           <img src="/letter3.png" alt="Slide 3" width={298} height={300} />
//         </div>
//         <div>
//           <img src="/letter4.png" alt="Slide 4" width={298} height={300} />
//         </div>
//       </Slider>
//     </div>
//   );
// };

// export default SliderExample;
