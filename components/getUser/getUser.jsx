export const getUserData = async (userId) => {
    try {
      // Добавляем `userId` в URL запроса
      const res = await fetch(`https://pickbonus.myawardwallet.com/api/user/read_one.php?id=${userId}`);
  
      if (res.ok) {
        const responseData = await res.json();
        localStorage.setItem("user_data", responseData);
        return responseData; // Возвращаем данные пользователя
      } else {
        console.error("Failed to fetch data:", res.status);
        return null; // Возвращаем null в случае ошибки
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return null; // Возвращаем null в случае ошибки
    }
  };
  