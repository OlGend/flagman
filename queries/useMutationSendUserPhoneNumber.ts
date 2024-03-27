import { useState } from "react";

type Response = {
  expiry: number;
  otp_id: string;
  status: string;
};

export const useMutationSendUserPhoneNumber = () => {
  const [data, setData] = useState<Response["otp_id"] | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = async ({ phoneNumber }: { phoneNumber: string }) => {
    setData(null);
    setSuccess(null);
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "https://pickbonus.myawardwallet.com/api/user/get_token.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            phoneNumber,
          }),
        }
      );
      if (!response.ok) throw new Error();
      const data: Response = await response.json();
      setData(data.otp_id);
      setSuccess(true);
      setLoading(false);
    } catch (e) {
      setSuccess(false);
      setLoading(false);
      setError(true);
      setErrorMessage("Unexpected error, try again!");
    }
  };

  return [
    mutation,
    {
      data,
      success,
      loading,
      error,
      errorMessage,
    },
  ] as const;
};
