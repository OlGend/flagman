"use client";

import { User } from "@/app/interfaces/user";
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
            onChangeStep={goToWalletAddressStep}
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
          <Tab label="Withdrawal Request" />
          <Tab label="Withdrawal History" />
        </Tabs>
        <TabPanel value={tab} index={0}>
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
        <TabPanel value={tab} index={1}>
          <PaymentHistory statusPayment={user?.status_payment} />
        </TabPanel>
      </Box>
      {/* <Withdrawal /> */}
      <Cards user={user} onFinish={onFinish} />
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
