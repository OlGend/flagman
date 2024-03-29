import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { styled } from "@mui/system";
import type { User } from "@/interfaces/user";
import { useMutationWalletAddressValidate } from "@/queries";

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

export const WalletAddressStep = ({
  coin,
  walletAddress,
  step,
  onChangeWalletAddress,
  onChangeStep,
  onConfirm,
  user,
}: WalletAddressStepProps) => {
  const {
    data: isWalletAddressValid,
    loading: walletAddressValidateLoading,
    error: walletAddressValidateError,
    errorMessage: walletAddressValidateErrorMessage,
    refetch: refetchWalletAddressValidate,
  } = useMutationWalletAddressValidate(coin, walletAddress);

  const setNextStep = async () => {
    const response = await refetchWalletAddressValidate();
    if (!response) return;

    if (!user?.phone_number) {
      onChangeStep(step + 1);
      return;
    }

    await onConfirm();
  };

  const isButtonDisabled = !walletAddress;
  const isError = isWalletAddressValid !== null && !isWalletAddressValid;

  return (
    <StyledDiv>
      <TextField
      className="input_address"
        value={walletAddress}
        onChange={onChangeWalletAddress}
        error={isError}
        helperText={walletAddressValidateErrorMessage}
        fullWidth
        sx={{
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              "-webkit-appearance": "none",
            },
          "& input[type=number]": {
            "-moz-appearance": "textfield",
          },
        }}
      />
      <Box>
        <Button
          className="btn-primary mr-2"
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
          Next step
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
