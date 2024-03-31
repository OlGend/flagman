import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import {
  useMutationUpdatePayment,
  useMutationWalletAddressValidate,
} from "@/queries";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent } from "react";
// import { updateUserStatusPayment } from "@/components/getUser/pushPayment";

type WalletAddressStepProps = {
  user: User;
  step: number;
  coin: string;
  walletAddress: string;
  amount: string;
  estimatedAmount: string | null;
  onChangeStep: (nextStep: number) => void;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const WalletAddressStep = ({
  user,
  step,
  coin,
  walletAddress,
  amount,
  estimatedAmount,
  onChangeStep,
  onChangeWalletAddress,
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

  const [
    updatePayment,
    {
      loading: isUpdatePaymentLoading,
      error: isUpdatePaymentError,
      message: updatePaymentMessage,
    },
  ] = useMutationUpdatePayment(
    user.id,
    coin,
    estimatedAmount,
    walletAddress,
    amount
  );

  const setNextStep = async () => {
    const response = await walletAddressValidate();
    if (!response) return;
    const isUpdated = await updatePayment();
    if (!isUpdated) return;
    onChangeStep(step + 1);
  };

  const isButtonNextStepDisabled = !walletAddress;
  const isError =
    (isWalletAddressValid !== null && !isWalletAddressValid) ||
    isWalletAddressValidateError ||
    isUpdatePaymentError;
  const isLoaderShown =
    isWalletAddressValidateLoading || isUpdatePaymentLoading;

  return (
    <StyledDiv>
      <TextField
        className="input_address"
        value={walletAddress}
        onChange={onChangeWalletAddress}
        error={isError}
        helperText={walletAddressValidateMessage ?? updatePaymentMessage}
        fullWidth
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

      {isLoaderShown && <Loader />}
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
