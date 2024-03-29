"use client";

import type { User } from "@/interfaces/user";
import { updateUserStatusPayment } from "@/components/getUser/pushPayment";
import { FinallyStep } from "@/components/personal/FinallyStep";
import { PaymentHistory } from "@/components/personal/PaymentHistory";
import { PaymentMethodStep } from "@/components/personal/PaymentMethodStep";
import { PhoneNumberStep } from "@/components/personal/PhoneNumberStep";
import { WalletAddressStep } from "@/components/personal/WalletAddressStep";
import Cards from "@/components/products/Cards";
import {
  useQueryCoins,
  useQueryUser,
  useQueryFee,
  useQueryEstimated,
} from "@/queries";
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
import { ChangeEvent, useState } from "react";

// import Withdrawal from "@/components/Withdrawal/Withdrawal";

const defaultCoin = "USDTTRC20";
const defaultStep = 0;

export default function Personal() {
  const {
    data: user,
    loading: userLoading,
    error: userError,
    errorMessage: userErrorMessage,
    refetch: refetchUser,
  } = useQueryUser();

  const {
    data: coins,
    loading: coinsLoading,
    error: coinsError,
    errorMessage: coinsErrorMessage,
    refetch: refetchCoins,
  } = useQueryCoins();

  const [coin, setCoin] = useState(defaultCoin);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [step, setStep] = useState(defaultStep);
  const [tab, setTab] = useState(0);

  const {
    data: fee,
    loading: feeLoading,
    error: feeError,
    errorMessage: feeErrorMessage,
    refetch: refetchFee,
    reset: resetFee,
  } = useQueryFee(coin, amount);

  const {
    data: estimatedAmount,
    loading: estimatedAmountLoading,
    error: estimatedAmountError,
    errorMessage: estimatedAmountErrorMessage,
    refetch: refetchEstimatedAmount,
    reset: resetEstimatedAmount,
  } = useQueryEstimated(coin, amount);

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

  const goToWalletAddressStep = async () => {
    try {
      await refetchFee();
      await refetchEstimatedAmount();
      onChangeStep(step + 1);
    } catch (error) {
      // TODO: add error handler
    }
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

    try {
      const response = await updateUserStatusPayment(body);
      onChangeStep(step + 1);
    } catch (e) {
      console.error("ERROR - onConfirm:", e);
    }
  };

  const onFinish = async () => {
    await refetchUser();
    setCoin(defaultCoin);
    setAmount("");
    setWalletAddress("");
    setStep(defaultStep);
    resetFee();
    resetEstimatedAmount();
  };

  // const finalSum = estimatedAmount - fee;

  const getSteps = (user: User | null) => {
    const initialSteps = [
      {
        label: "Payment Method",
        description: "Select one of the withdrawal methods and enter the withdrawal amount",
        content: (
          <PaymentMethodStep
            coin={coin}
            coins={coins}
            amount={amount}
            user={user}
            step={step}
            onChangeCoin={onChangeCoin}
            onChangeAmount={onChangeAmount}
            onChangeStep={goToWalletAddressStep}
          />
        ),
      },
      {
        label: "Wallet Address",
        description: `Fee: ${fee} ${coin}, You will receive on balance: ${estimatedAmount} ${coin}`,
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
        description: "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands",
        content: <FinallyStep text="" onFinish={onFinish} />,
      },
    ];

    if (!user?.phone_number) {
      initialSteps.splice(2, 0, {
        label: "Phone Number",
        description: "To create a transfer, we need to verify your phone number",
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
        className="tab_field"
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "100%",
        }}
      >
        <Tabs
        className="tabs_pagination"
          orientation="vertical"
          variant="scrollable"
          value={tab}
          onChange={onChangeTab}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Withdrawal Request" />
          <Tab label="Withdrawal History" />
          <Tab label="Cards Shop" />
        </Tabs>
        <TabPanel className="tab_panel" value={tab} index={0}>
          <Stepper
            activeStep={step}
            orientation="vertical"
            sx={{ width: "100%" }}
            className="stepper"
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
        <TabPanel className="tab_panel" value={tab} index={1}>
          <PaymentHistory statusPayment={user?.status_payment} />
        </TabPanel>
        <TabPanel className="tab_panel" value={tab} index={2}>
          <Cards user={user} onFinish={onFinish} />
        </TabPanel>
      </Box>
      {/* <Withdrawal /> */}
    </div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
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
