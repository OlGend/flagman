import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { styled } from "@mui/system";
import type { User } from "@/interfaces/user";
import { useMutationWalletAddressValidate } from "@/queries";
import Loader from "@/components/Loader";

type WalletAddressStepProps = {
  coin: string;
  walletAddress: string;
  step: number;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User;
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
  const [
    walletAddressValidate,
    {
      data: isWalletAddressValid,
      loading: isWalletAddressValidateLoading,
      error: isWalletAddressValidateError,
      message: walletAddressValidateMessage,
    },
  ] = useMutationWalletAddressValidate(coin, walletAddress);

  const setNextStep = async () => {
    const response = await walletAddressValidate();
    if (!response) return;

    if (!user.phone_number) {
      onChangeStep(step + 1);
      return;
    }

    await onConfirm();
  };

  const isButtonNextStepDisabled = !walletAddress;
  const isError =
    (isWalletAddressValid !== null && !isWalletAddressValid) ||
    isWalletAddressValidateError;

  return (
    <StyledDiv>
      <TextField
        className="input_address"
        value={walletAddress}
        onChange={onChangeWalletAddress}
        error={isError}
        helperText={walletAddressValidateMessage}
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
          disabled={isButtonNextStepDisabled}
        >
          Next step
        </Button>
      </Box>

      {isWalletAddressValidateLoading && <Loader />}
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
