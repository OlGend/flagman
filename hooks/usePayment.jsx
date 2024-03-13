// hooks/usePayment.js
import { useState } from 'react';

export const usePayment = (apiKey, user) => {
  const [errorWallet, setErrorWallet] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateAddress = async (selectedPaymentMethod, addressPayment) => {
    setLoading(true);
    try {
        const url = "https://api.nowpayments.io/v1/payout/validate-address";
        const currency = selectedPaymentMethod;
        const address = adressPayment;
  
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);
        myHeaders.append("Content-Type", "application/json");
  
        const data = {
          address: address,
          currency: currency,
        };
  
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: "follow",
        };
  
        const response = await fetch(url, requestOptions);
  
        if (response.ok) {
          setErrorWallet(false);
          handlePayoutRequest();
        } else {
          console.error("Failed to validate address:", response.status);
          const text = await response.text();
          console.log("Response text:", text);
          setErrorWallet(true);
        }
      } catch (error) {
        console.error("An error occurred during address validation:", error);
        setErrorWallet(true);
      }
    setLoading(false);
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

  return { validateAddress, handlePayoutRequest, errorWallet, loading };
};
