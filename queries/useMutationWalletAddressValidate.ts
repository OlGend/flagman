import { useState } from "react";

type WalletAddressValidate = {
  code: string;
  message: string;
  status: boolean;
  statusCode: number;
};

const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
const url = "https://api.nowpayments.io/v1/payout/validate-address";

export const useMutationWalletAddressValidate = (
  coin: string,
  walletAddress: string
) => {
  const [data, setData] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: walletAddress,
        currency: coin,
      }),
    });

    try {
      const data: WalletAddressValidate = await response.json();
      setData(data.status);
      setLoading(false);
      setError(true);
      setErrorMessage("Invalid payout address, try again!");
      return data.status;
    } catch (error) {
      setData(true);
      setLoading(false);
      setError(false);
      setErrorMessage(null);
      return true;
    }
  };

  return {
    data,
    loading,
    error,
    errorMessage,
    refetch: getData,
  };
};
