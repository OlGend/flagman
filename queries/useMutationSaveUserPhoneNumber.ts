import { useState } from "react";

import type { User } from "@/interfaces/user";

export const useMutationSaveUserPhoneNumber = () => {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = async ({
    user,
    phoneNumber,
  }: {
    user: User;
    phoneNumber: string;
  }) => {
    setSuccess(null);
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://pickbonus.myawardwallet.com/api/user/update_phone.php`,
        {
          method: "POST",
          body: JSON.stringify({
            id: user.id,
            phone_number: phoneNumber,
          }),
        }
      );
      if (!response.ok) throw new Error();
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
      success,
      loading,
      error,
      errorMessage,
    },
  ] as const;
};
