import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, useState } from "react";

import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";

type PaymentMethodStepProps = {
  user: User;
  coins: string[];
  step: number;
  coin: string;
  amount: string;
  onChangeStep: (nextStep: number) => void;
  onChangeCoin: (e: SelectChangeEvent<string>) => void;
  onChangeAmount: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  getFeeAndEstimatedAmount: () => Promise<void>;
};

const MIN_AMOUNT = 4;

const getHelperText = (
  amount: PaymentMethodStepProps["amount"],
  isLessThanFour: boolean,
  isMoreThanUserBalance: boolean,
  isError: boolean
) => {
  if (!!amount && isLessThanFour)
    return "Withdrawal rejected: Minimum withdrawal amount is 4 USD.";
  if (!!amount && isMoreThanUserBalance)
    return "Not enough funds in the account.";
  if (isError) return "Something wrong, try again!";
  return undefined;
};

export const PaymentMethodStep = ({
  user,
  coins,
  step,
  coin,
  amount,
  onChangeStep,
  onChangeCoin,
  onChangeAmount,
  getFeeAndEstimatedAmount,
}: PaymentMethodStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isLessThanFour = Number(amount) < MIN_AMOUNT;
  const isMoreThanUserBalance = Number(amount) > Number(user.balance);

  const isButtonNextStepDisabled =
    !amount || isLessThanFour || isMoreThanUserBalance;
  const error =
    (!!amount && (isLessThanFour || isMoreThanUserBalance)) || isError;
  const helperText = getHelperText(
    amount,
    isLessThanFour,
    isMoreThanUserBalance,
    isError
  );

  const getFeeAndEstimatedAmountAndThanGoToWalletAddressStep = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      await getFeeAndEstimatedAmount();
      onChangeStep(step + 1);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <StyledDiv>
      <Select
        className={`select_coins ${coin}`}
        value={coin}
        onChange={onChangeCoin}
      >
        {coins.map((coin) => (
          <MenuItem className={`${coin}`} key={coin} value={coin}>
            {coin}
          </MenuItem>
        ))}
      </Select>
      <TextField
        className="input_number"
        value={amount}
        onChange={(e) => {
          setIsError(false);
          onChangeAmount(e);
        }}
        type="number"
        error={error}
        helperText={helperText}
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
          className="btn-primary"
          variant="contained"
          onClick={getFeeAndEstimatedAmountAndThanGoToWalletAddressStep}
          disabled={isButtonNextStepDisabled}
        >
          Next step
        </Button>
      </Box>
      {isLoading && <Loader />}
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
