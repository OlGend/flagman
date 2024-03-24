// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getBrands = async (categoryBrands, lng) => {
  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read.php";

  
  const source = localStorage.getItem("source");
  // const geo = localStorage.getItem("country");


  try {
    const url = source === "partner1039" ? apiNew : apiOld;
    const res = await fetch(url);

    if (res.ok) {
      const responseData = await res.json();
      let filteredData = [];
 
 
      if (lng) {
        const geoLng = lng.toUpperCase();
    
        
 
        filteredData = responseData.brandsNew.filter(
          (rowData) =>
            rowData.GEO === geoLng &&
            rowData["CurrentStatus"] === "Ongoing" &&
            rowData["CasinoBrand"] !== "Mirax (FS)" &&
            rowData["CasinoBrand"] !== "Katsubet (FS)" &&
            rowData["CasinoBrand"] !== "7Bit (FS)" &&
            rowData[categoryBrands.key1] === categoryBrands.key2
        );
      }
   
      return filteredData; // Возвращаем отфильтрованные данные
    } else {
      console.error("Failed to fetch data:", res.status);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};
