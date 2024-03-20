import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/system";
import type { User } from "@/app/personal/page";

type WalletAddressStepProps = {
  coin: string;
  walletAddress: string;
  step: number;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
};

const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
const url = "https://api.nowpayments.io/v1/payout/validate-address";

const validateWalletAddress = async (coin: string, walletAddress: string) => {
  const body = JSON.stringify({
    address: walletAddress,
    currency: coin,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body,
    });

    return response.ok;
  } catch {
    return false;
  }
};

export const WalletAddressStep = ({
  coin,
  walletAddress,
  step,
  onChangeWalletAddress,
  onChangeStep,
  onConfirm,
  user,
}: WalletAddressStepProps) => {
  const [isTextFieldError, setIsTextFieldError] = useState(false);

  const setNextStep = async () => {
    setIsTextFieldError(false);
    const isWalletAddressValid = await validateWalletAddress(
      coin,
      walletAddress
    );

    if (!isWalletAddressValid) {
      setIsTextFieldError(true);
      return;
    }

    setIsTextFieldError(false);

    if (!user?.phone_number) {
      onChangeStep(step + 1);
      return;
    }

    await onConfirm();
  };

  const isButtonDisabled = !walletAddress;
  const helperText = isTextFieldError ? "Your address is not valid" : undefined;

  return (
    <StyledDiv>
      <TextField
        value={walletAddress}
        onChange={onChangeWalletAddress}
        error={isTextFieldError}
        helperText={helperText}
        fullWidth
      />

      <Box>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={() => {
            onChangeStep(step - 1);
          }}
        >
          Prev step
        </Button>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={setNextStep}
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </Box>
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(
  () => `
    display: flex;
    flex-direction: column;
    gap: 16px;
  `
);
