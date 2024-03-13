// components/ConfirmPayoutModal.js
"use client";
import React from "react";

const ConfirmPayoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  minFee,
  estimated,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal">
        {/* {loading && <LoaderMini />} */}
        <div className="close" onClick={() => setModalPayout(!modalPayout)}>
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
            {t("Enter your wallet details and click ‘Withdraw Funds’")}
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
            className={`column-input ${errorWallet ? "error" : ""}`}
            onChange={(e) => setAdressPayment(e.target.value)}
          />
          {errorWallet && (
            <span className="error-span">{t("Your address is not valid")}</span>
          )}
        </div>
        <button className="btn btn-primary btn-modal" onClick={validateAddress}>
          {t("Send Request")}
        </button>
      </div>
      <button onClick={onClose}>Close</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmPayoutModal;
