import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ChangeEvent } from "react";
import { styled } from "@mui/system";
import Image from "next/image";
import USDTTRC20 from "@/public/USDTTRC20.png";
import LTC from "@/public/LTC.png";

import type { User } from "@/app/personal/page";

type PaymentMethodStepProps = {
  coin: string;
  coins: string[] | null;
  amount: string;
  user: User | null;
  step: number;
  onChangeCoin: (e: SelectChangeEvent<string>) => void;
  onChangeAmount: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeStep: (nextStep: number) => void;
  // coinImages: { [key: string]: StaticImageData };
};

const MIN_AMOUNT = 4;

const getHelperText = (
  amount: PaymentMethodStepProps["amount"],
  isLessThanFour: boolean,
  isMoreThanUserBalance: boolean
) => {
  if (!!amount && isLessThanFour)
    return "Withdrawal rejected: Minimum withdrawal amount is 1 USD.";
  if (!!amount && isMoreThanUserBalance)
    return "Not enough funds in the account.";
  return undefined;
};

export const PaymentMethodStep = ({
  coin,
  coins,
  amount,
  user,
  step,
  onChangeCoin,
  onChangeAmount,
  onChangeStep,
}: PaymentMethodStepProps) => {
  const isLessThanFour = Number(amount) < MIN_AMOUNT;
  const isMoreThanUserBalance = Number(amount) > Number(user?.balance);

  const isTextFieldError =
    !!amount && (isLessThanFour || isMoreThanUserBalance);
  const isButtonDisabled = !amount || isLessThanFour || isMoreThanUserBalance;
  const helperText = getHelperText(
    amount,
    isLessThanFour,
    isMoreThanUserBalance
  );
  // const coinImages = {
  //   USDTTRC20: USDTTRC20,
  //   LTC: LTC,
  //   // Добавь здесь другие монеты по аналогии
  // };
  return (
    <StyledDiv>
      <Select value={coin} onChange={onChangeCoin}>
        {coins?.map((coin) => (
          <MenuItem key={coin} value={coin}>
            {/* <Image
              className="mb-1 mr-2"
              width={25}
              height={25}
              src={coinImages[coin]}
              alt={coin}
            /> */}
            {coin}
          </MenuItem>
        ))}
      </Select>

      <TextField
        value={amount}
        onChange={onChangeAmount}
        type="number"
        error={isTextFieldError}
        helperText={helperText}
      />

      <Box>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={() => {
            onChangeStep(step + 1);
          }}
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
