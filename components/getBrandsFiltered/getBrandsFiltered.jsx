// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getBrandsFiltered = async (filtered, lng) => {
  const apiOld = "api/brands";
  const apiNew = "api/brands";

  const source = localStorage.getItem("source");
  // const geo = localStorage.getItem("country");

  console.log("TTTTTTT", filtered, lng);

  try {
    const url = source === "partner1039" ? apiNew : apiOld;
    const res = await fetch("https://pickbonus.myawardwallet.com/api/brandsNew/read.php");
    console.log("RES", res);

   
    if (res.ok) {
      const responseData = await res.json();
      let filteredData = [];
      console.log("responseData", responseData);
      console.log("GEO2", lng);
      if (lng) {
        const geoLng = lng.toUpperCase();
        console.log("СУЩЕСТВУЕТ2", `"${filtered}"`);

        filteredData = responseData.brandsNew.filter((rowData) => {
          const categoriesArray = rowData["categories"]
            .split(",")
            .map((category) => category.trim());
          return (
            rowData.GEO === geoLng &&
            rowData["CurrentStatus"] === "Ongoing" &&
            !["Mirax (FS)", "Katsubet (FS)", "7Bit (FS)"].includes(
              rowData["CasinoBrand"]
            ) &&
            categoriesArray.includes(filtered)
          );
        });
      }
      console.log("ДАТА ПРИ СМЕНЕ ЯЗЫКА", filteredData);
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


