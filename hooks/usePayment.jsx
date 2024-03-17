// hooks/usePayment.js
import { useState } from 'react';

export const usePayment = (apiKey, user) => {
  const [errorWallet, setErrorWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minFee, setMinFee] = useState("");

  const validateAddress = async (selectedPaymentMethod, addressPayment) => {
    setLoading(true);
    try {
      const url = "https://api.nowpayments.io/v1/payout/validate-address";
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        address: addressPayment,
        currency: selectedPaymentMethod,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      setLoading(false);
      if (!response.ok) {
        setErrorWallet(true);
        return false; // Неудачная валидация
      }
      console.log("Adress validate")
      setErrorWallet(false);
      return true; // Удачная валидация
    } catch (error) {
      console.error("An error occurred during address validation:", error);
      setLoading(false);
      setErrorWallet(true);
      return false; // В случае ошибки
    }
  };

  const handlePayoutRequest = async (selectedPaymentMethod, addressPayment, estimatedAmount, jwtToken) => {
    setLoading(true);
    try {
        setLoading(true);
        const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
  
        const jwtToken = await authenticateUser(); // Получаем новый токен перед каждым запросом
        console.log("JWT", jwtToken);
  
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${jwtToken}`);
  
        const payoutData = {
          ipn_callback_url: "https://nowpayments.io",
          withdrawals: [
            {
              address: adressPayment,
              currency: selectedPaymentMethod,
              amount: parseFloat(estimated.estimated_amount),
              ipn_callback_url: "https://nowpayments.io",
              userData: user,
              userWithdraw: withdrawalRequestValue,
            },
          ],
        };
        console.log("type", user);
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ ...payoutData }), // Добавляем токен к данным
          redirect: "follow",
        };
  
        const response = await fetch(phpScriptUrl, requestOptions);
  
        if (response.ok) {
          const result = await response.text();
  
          setErrorMin(t("Withdrawal successful"));
  
          setModalError(!modalError);
          setModalPayout(!modalPayout);
        } else {
          if (response.status === 400) {
            const result = await response.json();
            console.error("Failed to make payout request:", result.error);
            // Тут ви можете вивести повідомлення про помилку користувачу
            // setError(true);
            // setErrorMessage(result.error);
            setMessage(result.error);
          } else if (response.status === 500) {
            console.error(
              "Failed to make payout request:",
              "Internal Server Error"
            );
            // Тут ви можете вивести інше повідомлення про помилку користувачу
            // setError(true);
            // setErrorMessage("Internal Server Error");
            setShowModal(true);
            setMessage("Internal Server Error");
          } else {
            console.error("Failed to make payout request:", response.status);
            // setError(true);
            setShowModal(true);
  
            setMessage(`Error: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error during payout request:", error);
        // setError(true);
        setShowModal(true);
        setMessage("Insufficient balance for withdrawal");
      } finally {
        setLoading(false); // Выключить лоадер вне зависимости от результата запроса
      }
    setLoading(false);
  };

  const authenticateUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: "and@karmabs.com",
        password: "Ytvn3daw!",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const authResponse = await fetch(
        "https://api.nowpayments.io/v1/auth",
        requestOptions
      );

      if (authResponse.ok) {
        const authData = await authResponse.json(); // Извлекаем данные из ответа как объект
        const authToken = authData.token; // Извлекаем значение токена из объекта
  
        return authToken;
      } else {
        console.error("Failed to authenticate user:", authResponse.status);
        // Возможно, здесь стоит бросить ошибку или выполнить другие действия в зависимости от вашего потока управления
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      // То же самое - обработайте ошибку в соответствии с вашими потребностями
    }
  };

  const fetchFee = async (selectedPaymentMethod, withdrawalRequestValue) => {
    setLoading(true);
    try {
      if (withdrawalRequestValue !== undefined) {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `https://api.nowpayments.io/v1/payout/fee?currency=${selectedPaymentMethod}&amount=${withdrawalRequestValue}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMinFee(result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { validateAddress, handlePayoutRequest, errorWallet, loading, authenticateUser, minFee, fetchFee };
};


