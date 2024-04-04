import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import { useMutationWalletAddressValidate } from "@/queries";
import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent } from "react";

type WalletAddressStepProps = {
  user: User;
  step: number;
  coin: string;
  walletAddress: string;
  onChangeStep: (nextStep: number) => void;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onConfirm: (userId: User["id"]) => Promise<void>;
  t: Function;
};

export const WalletAddressStep = ({
  user,
  step,
  coin,
  walletAddress,
  onChangeStep,
  onChangeWalletAddress,
  onConfirm,
  t
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

    await onConfirm(user.id);
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
      />
      <Box>
        <Button
          className="btn-primary mr-2"
          variant="contained"
          onClick={() => {
            onChangeStep(step - 1);
          }}
        >
          {t("Prev step")}
        </Button>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={setNextStep}
          disabled={isButtonNextStepDisabled}
        >
          {t("Next step")}
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
