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
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

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
  isError: boolean,
  t: TFunction
) => {
  if (!!amount && isLessThanFour)
    return t("Withdrawal rejected: Minimum withdrawal amount is 4 USD.");
  if (!!amount && isMoreThanUserBalance)
    return t("Not enough funds in the account.");
  if (isError) return t("Something wrong, try again!");
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
  const { t } = useTranslation();

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
    isError,
    t
  );

  const isPayPal = coin === "PayPal";

  const getFeeAndEstimatedAmountAndThanGoToWalletAddressStep = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      if (!isPayPal) {
        await getFeeAndEstimatedAmount();
      }
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
        <MenuItem className="PayPal" key="paypal" value="PayPal">
          PayPal
        </MenuItem>
      </Select>
      <TextField
        className="input_number"
        placeholder={t("Sum")}
        value={amount}
        onChange={(e) => {
          setIsError(false);
          onChangeAmount(e);
        }}
        type="number"
        error={error}
        helperText={helperText}
      />
      <Box>
        <Button
          className="btn-primary w-48"
          variant="contained"
          onClick={getFeeAndEstimatedAmountAndThanGoToWalletAddressStep}
          disabled={isButtonNextStepDisabled}
        >
          {t("Next step")}
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
