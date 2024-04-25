import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import {
  useMutationUpdatePayment,
  useMutationWalletAddressValidate,
} from "@/queries";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

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
  onFinish: () => Promise<void>;
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
  onFinish,
}: WalletAddressStepProps) => {
  const { t } = useTranslation();

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

  const updatePaymentWithValidate = async () => {
    const response = await walletAddressValidate();
    if (!response) return;
    const isUpdated = await updatePayment();
    if (!isUpdated) return;
    await onFinish();
    onChangeStep(step + 1);
  };

  const updatePaymentWithoutValidate = async () => {
    const isUpdated = await updatePayment();
    if (!isUpdated) return;
    await onFinish();
    onChangeStep(step + 1);
  };

  const isButtonNextStepDisabled = !walletAddress;
  const isError =
    (isWalletAddressValid !== null && !isWalletAddressValid) ||
    isWalletAddressValidateError ||
    isUpdatePaymentError;
  const isLoaderShown =
    isWalletAddressValidateLoading || isUpdatePaymentLoading;
  const isPayPal = coin === "PayPal";

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
      {isPayPal && (
        <span className="paypalnote">
          {t(
            "Please note: PayPal withdrawals are processed every day from 7 AM to 8 PM CET"
          )}
        </span>
      )}
      <Box>
        <Button
          className="btn-primary w-48 !mr-2"
          variant="contained"
          onClick={() => {
            onChangeStep(step - 1);
          }}
        >
          {t("Prev step")}
        </Button>
        <Button
          className="btn-primary w-48"
          variant="contained"
          onClick={
            isPayPal ? updatePaymentWithoutValidate : updatePaymentWithValidate
          }
          disabled={isButtonNextStepDisabled}
        >
          {t("Next step")}
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
