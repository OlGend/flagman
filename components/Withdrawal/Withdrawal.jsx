"use client";
import React, { useState, useEffect } from "react";

import { useUserData } from "@/hooks/useUserData";
import { usePayment } from "@/hooks/usePayment";

import PaymentMethodSelect from "@/components/Withdrawal/PaymentMethodSelect";
import ConfirmPayoutModal from "@/components/Withdrawal/ConfirmPayoutModal";

import { useTranslation } from "react-i18next";

export default function Withdrawal() {
  const api = "https://pickbonus.myawardwallet.com/api";
  const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
  const { user, coins } = useUserData(api, apiKey);

  const { validateAddress, handlePayoutRequest, errorWallet, loading } =
    usePayment(apiKey, user);

    // В компоненте Withdrawal



  const { t } = useTranslation();

  const [adressPayment, setAdressPayment] = useState("");

  // const [user, setUser] = useState([]);
  // const [coins, setCoins] = useState(null);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const [minimumAmount, setMinimumAmount] = useState("");
  const [minFee, setMinFee] = useState("");

  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");

  const handleMenuItemClick = async (menuItem) => {
    setLoading(true);
    setSelectedMenuItem(menuItem);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Ждем 500 миллисекунд
    setLoading(false);
  };

  ////////////////////////////////////////////////////////////////////

  const phpScriptUrl =
    "https://pickbonus.myawardwallet.com/api/payment/payment.php";

  ///////////////////////////////////////////////////////

  ////////////////////ПОЛУЧЕНИЕ ТОКЕНА/////////////

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

  
  ////////////////////////////////////////////////////////

  const [withdrawalRequestValue, setWithdrawalRequestValue] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("USDTTRC20");
  const [minimumAmount, setMinimumAmount] = useState();

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setErrorWallet(false);
  };

  console.log("minimum", minimumAmount);
  useEffect(() => {
    handleEstimatedRequest(withdrawalRequestValue); // Используйте текущее значение withdrawalRequestValue
  }, [selectedPaymentMethod, withdrawalRequestValue]);

  const [estimated, setEstimated] = useState([]);

  ///////////////////////КОНВЕРТАЦИЯ//////////////////////
  const handleEstimatedRequest = async () => {
    try {
      // Значения переменных
      const currency_from = "usd"; // Замените на соответствующую валюту отправления
      const currency_to = selectedPaymentMethod; // Замените на соответствующую валюту получения
      const amount = withdrawalRequestValue; // Используем актуальное значение withdrawalRequestValue

      // Формируем URL с параметрами
      const url = `https://pickbonus.myawardwallet.com/api/payment/estimated.php?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`;

      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // Обработка успешного ответа
        console.log(result);
        setEstimated(result);
      } else {
        // Обработка ошибки
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Обработка ошибок в случае неудачи запроса
      console.error("An error occurred during the request:", error);
    }
  };
  //////////////////////////////////////////////

  //МИНИМАЛЬНЫЙ ВЫВОД //
  useEffect(() => {
    const getMinAmount = async () => {
      try {
        const response = await fetch(
          `https://pickbonus.myawardwallet.com/api/payment/minamount.php?currency=${selectedPaymentMethod}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMinimumAmount(result);
        console.log("======", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getMinAmount();
  }, [selectedPaymentMethod]);

  ////////////////////////////////////

  ////////////////КОМИССИЯ ЗА ВЫВОД/////////////////////////

  useEffect(() => {
    const fee = async () => {
      try {
        // Проверяем, установлено ли значение withdrawalRequestValue
        if (withdrawalRequestValue !== undefined) {
          const myHeaders = new Headers();
          myHeaders.append("x-api-key", "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC");

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
          console.log(result);
          setMinFee(result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fee();
  }, [selectedPaymentMethod, withdrawalRequestValue]);

  ///////////////////////////////////////////////////////////////

  console.log("minFee", minFee);

  const [modalPayout, setModalPayout] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorMin, setErrorMin] = useState(true);

  const modalPay = async () => {
    handleEstimatedRequest();
    setModalPayout(!modalPayout);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e) => {
    const enteredValue = parseFloat(e.target.value.trim()); // Убираем пробелы в начале и в конце

    setWithdrawalRequestValue(e.target.value);

    if (isNaN(enteredValue) || enteredValue < 4) {
      setErrorMin(true);
      setErrorMessage(
        t("Withdrawal rejected: Minimum withdrawal amount is 4 USD.")
      );
    } else if (enteredValue > user.balance) {
      setErrorMin(true);
      setErrorMessage(t("Not enough funds in the account."));
    } else {
      setErrorMin(false);
      setErrorMessage("");
    }
  };

  ///////////////////////получение статуса транзакции////////////////////////

  // const [paymentStatus, setPaymentStatus] = useState(null);

  // const fetchPaymentStatus = async () => {
  //   try {
  //     const response = await fetch("https://api.nowpayments.io/v1/payout/5000839277", {
  //       headers: {
  //         "x-api-key": "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC"
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Ошибка загрузки статуса платежа');
  //     }
  //     const result = await response.json();
  //     setPaymentStatus(result.status);
  //   } catch (error) {
  //     console.error('Произошла ошибка:', error);
  //   }
  // };
  // useEffect(() => {

  //   // fetchPaymentStatus();
  // }, []);
  // console.log("AAA", paymentStatus)
  ///////////////////////////////////////////////

  return (
    <div className="withdrawal">
      <div className="top-block">
        <h2>{t("Withdrawal")}</h2>
      </div>
      <div className="ui-methods">
        <div className="container flex">
          <div className="menu">
            <div
              className={`menu-item active`}
              onClick={() => handleMenuItemClick("withdrawal/")}
            >
              {t("Withdrawal Request")}
            </div>
          </div>
          <div className="menu-info">
            <div className="flex menu-content">
              <h4>{t("Withdrawal Requests")}</h4>
              <div className="all-balance">
                <p>
                  <span>{user.login}</span> {t("your current balance is:")}
                </p>
                {Object.keys(user).length > 0 && (
                  <div className="balance">
                    <span>{user.balance} USD</span>
                  </div>
                )}
              </div>
              <div className="withdrawal-form">
                <div className="column">
                  <label htmlFor="method">{t("Select Payment Method")}</label>

                  {coins && (
                    <PaymentMethodSelect
                      coins={coins}
                      selectedPaymentMethod={selectedPaymentMethod}
                      handlePaymentMethodChange={handlePaymentMethodChange}
                    />
                  )}
                </div>
                {selectedPaymentMethod && (
                  <div className="column">
                    <label htmlFor="amount">{t("Amount")} USD</label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="0"
                      required=""
                      value={withdrawalRequestValue}
                      onChange={(e) => {
                        handleAmountChange(e);
                      }}
                      className={errorMin ? "error" : ""}
                    />
                    {errorMin && (
                      <span className="mesSpan error-span">{errorMessage}</span>
                    )}
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  onClick={modalPay}
                  disabled={errorMin}
                >
                  {t("Payout")}
                </button>

                {modalPayout && (
                  <div className="overflow">
                    {/* <div className="modal">
                   
                      <div
                        className="close"
                        onClick={() => setModalPayout(!modalPayout)}
                      >
                        {" "}
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.44487 24L24 8.02771M8 8L23.5551 23.9723"
                            stroke="#15143D"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="column">
                        <p>
                          {t("Withdrawal commission:")}{" "}
                          {minFee.fee.toFixed(6).replace(/\.?0+$/, "")}{" "}
                          {estimated.currency_to}. <br></br>
                          {t("You will receive")}{" "}
                          {(estimated.estimated_amount - minFee.fee)
                            .toFixed(6)
                            .replace(/\.?0+$/, "")}{" "}
                          {estimated.currency_to} {t("in your wallet.")}
                          <br></br>
                          {t(
                            "Enter your wallet details and click ‘Withdraw Funds’"
                          )}
                        </p>
                      </div>

                      <div className="column">
                        <label htmlFor="wallet">
                          {t("Wallet Address")} {selectedPaymentMethod}
                        </label>
                        <input
                          type="text"
                          name="wallet"
                          id="wallet"
                          placeholder="Enter wallet address"
                          required=""
                          className={`column-input ${
                            errorWallet ? "error" : ""
                          }`}
                          onChange={(e) => setAdressPayment(e.target.value)}
                        />
                        {errorWallet && (
                          <span className="error-span">
                            {t("Your address is not valid")}
                          </span>
                        )}
                      </div>
                      <button
                        className="btn btn-primary btn-modal"
                        onClick={validateAddress}
                      >
                        {t("Send Request")}
                      </button>
                    </div> */}
                    <ConfirmPayoutModal
                      isOpen={modalPayout}
                      onClose={() => setModalPayout(false)}
                      onConfirm={handleConfirm}
                      minFee={minFee}
                      estimated={estimated}
                    />
                  </div>
                )}
                {modalError && (
                  <div className="overflow">
                    <div className="modal modal-success">
                      {/* {loading && <LoaderMini />} */}
                      <h3>{errorMin}</h3>
                      <button
                        className="btn btn-primary"
                        onClick={() => setModalError(!modalError)}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
