/**
 * Обновляет статус оплаты пользователя по его ID.
 * @param {number|string} userId ID пользователя, чей статус оплаты нужно обновить.
 * @param {string} statusPayment Новое значение статуса оплаты.
 * @param {number} sumMinus Сумма, на которую нужно уменьшить баланс.
 * @returns {Promise<object|null>} Возвращает обновленные данные пользователя или null в случае ошибки.
 */
export const updateUserStatusPayment = async (userId, statusPayment, sumMinus) => {
  try {
    const res = await fetch(`https://pickbonus.myawardwallet.com/api/user/update_payment.php`, {
      method: "POST", // Изменено на POST, убедитесь, что ваш PHP скрипт поддерживает этот метод
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        status_payment: statusPayment, // Обновляем только поле status_payment
        sumMinus: sumMinus, // Добавлено поле sumMinus для передачи суммы
      }),
    });

    if (res.ok) {
      const responseData = await res.json();
      console.log("Статус оплаты успешно обновлен:", responseData);
      return responseData; // Возвращаем обновленные данные пользователя
    } else {
      console.error("Не удалось обновить статус оплаты:", res.status);
      return null; // Возвращаем null в случае ошибки
    }
  } catch (error) {
    console.error("Произошла ошибка при обновлении статуса оплаты:", error);
    return null; // Возвращаем null в случае ошибки
  }
};

// /**
//  * Обновляет статус оплаты пользователя по его ID.
//  * @param {number|string} userId ID пользователя, чей статус оплаты нужно обновить.
//  * @param {string} statusPayment Новое значение статуса оплаты.
//  * @returns {Promise<object|null>} Возвращает обновленные данные пользователя или null в случае ошибки.
//  */
// export const updateUserStatusPayment = async (userId, statusPayment, sumMinus) => {
//   try {
//     const res = await fetch(`/api/updatestatus?id=${userId}`, {
//       method: "PATCH", // Используем метод PATCH для частичного обновления
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: userId,
//         balance: sumMinus,
//         status_payment: statusPayment, // Обновляем только поле status_payment
//       }),
//     });

//     if (res.ok) {
//       const responseData = await res.json();
//       console.log("Статус оплаты успешно обновлен:", responseData);
//       return responseData; // Возвращаем обновленные данные пользователя
//     } else {
//       console.error("Не удалось обновить статус оплаты:", res.status);
//       return null; // Возвращаем null в случае ошибки
//     }
//   } catch (error) {
//     console.error("Произошла ошибка при обновлении статуса оплаты:", error);
//     return null; // Возвращаем null в случае ошибки
//   }
// };
