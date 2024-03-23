"use client";

import {
  Box,
  SelectChangeEvent,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

import { FinallyStep } from "@/components/personal/FinallyStep";
import { PaymentMethodStep } from "@/components/personal/PaymentMethodStep";
import { PhoneNumberStep } from "@/components/personal/PhoneNumberStep";
import { WalletAddressStep } from "@/components/personal/WalletAddressStep";
import { PaymentHistory } from "@/components/personal/PaymentHistory";
import { updateUserStatusPayment } from "@/components/getUser/pushPayment";
import Cards from "@/components/products/Cards";
// import Withdrawal from "@/components/Withdrawal/Withdrawal";

const defaultCoin = "USDTTRC20";
const defaultStep = 0;

const api = "https://pickbonus.myawardwallet.com/api";
const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";

type CoinsResponse = {
  selectedCurrencies: string[];
};

type Fee = {
  currency: string;
  fee: number;
};

type Estimated = {
  amount_from: number;
  currency_from: string;
  currency_to: string;
  estimated_amount: string;
};

export type User = {
  id: string;
  balance: string;
  phone_number: string | null;
  status_payment: string | null;
  // VIP: "";
  // auth: null;
  // country: "AU";
  // customer: "";
  // input: "";
  // login: "test_max";
  // password: "";
  // status_payment: null;
  // tickets: "2";
  // winbalance: "";
};

const getUserId = () => {
  return (
    localStorage.getItem("user_id") ??
    new URLSearchParams(window.location.search).get("keyword")
  );
};

export default function Personal() {
  const [coins, setCoins] = useState<string[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const userId = getUserId();

      if (!userId) return;

      const response = await fetch(`${api}/user/read_one.php?id=${userId}`);

      if (response.ok) {
        const data: User = await response.json();
        setUser(data);

        return;
      }

      console.error(`Response - getUser not ok: ${response}`);
    } catch (e) {
      console.error(`Error - getUser: ${e}`);
    }
  };

  useEffect(() => {
    const getCoins = async () => {
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

          return;
        }

        console.error(`Response - getCoins not ok: ${response}`);
      } catch (e) {
        console.error(`Error - getCoins: ${e}`);
      }
    };

    getUser();
    getCoins();
  }, []);

  const [coin, setCoin] = useState(defaultCoin);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [step, setStep] = useState(defaultStep);
  const [tab, setTab] = useState(0);
  const [fee, setFee] = useState<Fee["fee"] | null>(null);
  const [estimatedAmount, setEstimatedAmount] = useState<
    Estimated["estimated_amount"] | null
  >(null);

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

  const onChangeStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const onChangeTab = (event: React.SyntheticEvent, nextValue: number) => {
    setTab(nextValue);
  };

  const getFee = async (coin: string, amount: string) => {
    try {
      const response = await fetch(
        `https://api.nowpayments.io/v1/payout/fee?currency=${coin}&amount=${amount}`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );

      if (!response.ok) return;
      const data: Fee = await response.json();
      setFee(data.fee);

      console.log("getFee - response:", response);
    } catch (e) {
      console.error("ERROR - getFee:", e);
    }
  };

  const getEstimated = async (coin: string, amount: string) => {
    try {
      const response = await fetch(
        `https://pickbonus.myawardwallet.com/api/payment/estimated.php?amount=${amount}&currency_from=usd&currency_to=${coin}`
      );

      if (!response.ok) return;
      const data: Estimated = await response.json();
      setEstimatedAmount(data.estimated_amount);

      console.log("getEstimated - response", response);
    } catch (e) {
      console.error("ERROR - getEstimated:", e);
    }
  };

  const sendRequest = async (coin: string, amount: string) => {
    await getFee(coin, amount);
    await getEstimated(coin, amount);
    onChangeStep(step + 1);
  };

  const onConfirm = async () => {
    if (!user) return;

    const status_payment = JSON.stringify({
      status: "Waiting",
      timestamp: new Date().toISOString(),
      paymentMethod: coin,
      paymentSumIn: estimatedAmount,
      paymentAddress: walletAddress,
      USD: amount,
    });

    const body = JSON.stringify({
      id: user.id,
      status_payment,
      sumMinus: amount,
    });

    console.log("body", body);

    try {
      const response = await updateUserStatusPayment(body);
      onChangeStep(step + 1);
      console.log("response", response);
    } catch (e) {
      console.error("ERROR - onConfirm:", e);
    }
  };

  const onFinish = async () => {
    await getUser();
    setCoin(defaultCoin);
    setAmount("");
    setWalletAddress("");
    setStep(defaultStep);
    setFee(null);
    setEstimatedAmount(null);
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
            onChangeStep={sendRequest}
          />
        ),
      },
      {
        label: "Wallet Address",
        description: `Fee: ${fee}, Estimated amount: ${estimatedAmount}`,
        content: (
          <WalletAddressStep
            coin={coin}
            walletAddress={walletAddress}
            onChangeWalletAddress={onChangeWalletAddress}
            step={step}
            onChangeStep={onChangeStep}
            onConfirm={onConfirm}
            user={user}
          />
        ),
      },

      {
        label: "Finally Step",
        description: "Description",
        content: <FinallyStep text="Test text." onFinish={onFinish} />,
      },
    ];

    if (!user?.phone_number) {
      initialSteps.splice(2, 0, {
        label: "Phone Number",
        description: "Description",
        content: (
          <PhoneNumberStep
            step={step}
            onChangeStep={onChangeStep}
            onConfirm={onConfirm}
            user={user}
          />
        ),
      });
    }

    return initialSteps;
  };

  const steps = getSteps(user);

  return (
    <div className="page-personal main__container pb-10">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={onChangeTab}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Withdrawal History" />
          <Tab label="Withdrawal Request" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <PaymentHistory statusPayment={user?.status_payment} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
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
        </TabPanel>
      </Box>
      {/* <Withdrawal /> */}
      <Cards />
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...props }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      {...props}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
