"use client";

import {
  SelectChangeEvent,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
// import { Metadata } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { styled } from "@mui/system";

import { FinallyStep } from "@/components/personal/FinallyStep";
import { PaymentMethodStep } from "@/components/personal/PaymentMethodStep";
import { PhoneNumberStep } from "@/components/personal/PhoneNumberStep";
import { WalletAddressStep } from "@/components/personal/WalletAddressStep";
import { PaymentHistory } from "@/components/personal/PaymentHistory";

// import Withdrawal from "@/components/Withdrawal/Withdrawal";

// export const metadata: Metadata = {
//   title: "Personal | Bonus XXXCasinoGuru",
//   description:
//     "Embark on a thrilling journey through the diverse world of online casinos with our all-inclusive guide at Bonus XXXCasinoGuru. From the industry giants to hidden gems, our comprehensive guide reviews the most trustworthy and entertaining casinos in the market. Discover what sets each casino apart in terms of game offerings, customer service, bonuses, and security features. Additionally, navigate our curated list of top-rated online casinos to find the perfect match for your gaming preferences. Whether you're a novice player taking your first steps or a seasoned veteran, our guide equips you with everything you need for an enriching gaming experience.",
// };


const defaultCoin = "USDTTRC20";
const defaultStep = 0;

const api = "https://pickbonus.myawardwallet.com/api";
const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";

type CoinsResponse = {
  selectedCurrencies: string[];
};

export type User = {
  balance: string;
  phone_number: string | null;
  // VIP: "";
  // auth: null;
  // country: "AU";
  // customer: "";
  // id: "test_max";
  // input: "";
  // login: "test_max";
  // password: "";
  // payment_history: null;
  // status_payment: null;
  // tickets: "2";
  // winbalance: "";
};

export default function Personal() {
  const [coins, setCoins] = useState<string[] | null>(null);
  const [areCoinsLoading, setAreCoinsLoading] = useState(false);
  const [areCoinsError, setAreCoinsError] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isUserError, setIsUserError] = useState(false);


  useEffect(() => {
    const getUser = async () => {
      setIsUserLoading(true);

      try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const userId = urlSearchParams.get("keyword");
        const response = await fetch(`${api}/user/read_one.php?id=${userId}`);
          console.log("USER", response)
        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
          setIsUserLoading(false);
          return;
        }

        setIsUserLoading(false);
        console.error(`Response - getUser not ok: ${response}`);
      } catch (e) {
        setIsUserLoading(false);
        setIsUserError(true);
        console.error(`Error - getUser: ${e}`);
      }
    };
    const getCoins = async () => {
      setAreCoinsLoading(true);

      try {
        const response = await fetch(
          "https://api.nowpayments.io/v1/merchant/coins",
          {
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        if (response.ok) {
          const data: CoinsResponse = await response.json();
          setCoins(data.selectedCurrencies);
          setAreCoinsLoading(false);
          return;
        }

        setAreCoinsLoading(false);
        console.error(`Response - getCoins not ok: ${response}`);
      } catch (e) {
        setAreCoinsLoading(false);
        setAreCoinsError(true);
        console.error(`Error - getCoins: ${e}`);
      }
    };

    getUser();
    getCoins();
  }, []);

  const [coin, setCoin] = useState(defaultCoin);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const onChangeCoin = (e: SelectChangeEvent<string>) => {
    const nextCoin = e.target.value;
    setCoin(nextCoin);
  };

  const onChangeAmount = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextAmount = e.target.value;
    setAmount(nextAmount);
  };

  const onChangeWalletAddress = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextWalletAddress = e.target.value;
    setWalletAddress(nextWalletAddress);
  };

  const [step, setStep] = useState(defaultStep);

  const onChangeStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const getSteps = (user: User | null) => {
    const initialSteps = [
      {
        label: "Payment Method",
        description: "Description",
        content: (
          <PaymentMethodStep
            coin={coin}
            coins={coins}
            amount={amount}
            user={user}
            step={step}
            onChangeCoin={onChangeCoin}
            onChangeAmount={onChangeAmount}
            onChangeStep={onChangeStep}
          />
        ),
      },
      {
        label: "Wallet Address",
        description: "Description",
        content: (
          <WalletAddressStep
            coin={coin}
            walletAddress={walletAddress}
            onChangeWalletAddress={onChangeWalletAddress}
            step={step}
            onChangeStep={onChangeStep}
          />
        ),
      },

      {
        label: "Finally Step",
        description: "Description",
        content: <FinallyStep text="Test text." />,
      },
    ];

    if (!user?.phone_number) {
      initialSteps.splice(2, 0, {
        label: "Phone Number",
        description: "Description",
        content: <PhoneNumberStep step={step} onChangeStep={onChangeStep} />,
      });
    }

    return initialSteps;
  };

  const steps = getSteps(user);

  return (
    <div className="page-personal">
      <div className="main__container">
        <StyledDiv>
          <PaymentHistory />
          <Stepper
            activeStep={step}
            orientation="vertical"
            sx={{ width: "100%" }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  {step.content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </StyledDiv>
         {/* <Withdrawal />  */}
      </div>
    </div>
  );
}

const StyledDiv = styled("div")(
  () => `
    display: flex;
    align-items: flex-start;
    gap: 32px;
    padding-bottom: 32px;
  `
);

