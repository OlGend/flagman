import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { styled } from "@mui/system";

type WalletAddressStepProps = {
  coin: string;
  walletAddress: string;
  step: number;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeStep: (nextStep: number) => void;
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
    onChangeStep(step + 1);
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
