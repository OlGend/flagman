import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState } from "react";
import { styled } from "@mui/system";

import { OTP } from "../OTP";
import type { User } from "@/interfaces/user";
import {
  useMutationSaveUserPhoneNumber,
  useMutationSendUserPhoneNumber,
} from "@/queries";

type PhoneNumberStepProps = {
  step: number;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
};

const DEFAULT_OTP_LENGTH = 5;

type ConfirmOtpResponse = {
  status: "EXPIRED" | "APPROVED";
};

export const PhoneNumberStep = ({
  step,
  onChangeStep,
  onConfirm,
  user,
}: PhoneNumberStepProps) => {
  const defaultCountry = (localStorage.getItem("country") ?? undefined) as
    | MuiTelInputCountry
    | undefined;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const onChangePhoneNumber = (nextPhoneNumber: string) => {
    setPhoneNumber(nextPhoneNumber);
  };

  const [
    saveUserPhoneNumber,
    {
      success: saveUserPhoneNumberSuccess,
      loading: saveUserPhoneNumberLoading,
      error: saveUserPhoneNumberError,
      errorMessage: saveUserPhoneNumberErrorMessage,
    },
  ] = useMutationSaveUserPhoneNumber();

  const [
    sendUserPhoneNumber,
    {
      data: sendUserPhoneNumberData,
      success: sendUserPhoneNumberSuccess,
      loading: sendUserPhoneNumberLoading,
      error: sendUserPhoneNumberError,
      errorMessage: sendUserPhoneNumberErrorMessage,
    },
  ] = useMutationSendUserPhoneNumber();

  const onConfirmOtp = async () => {
    if (!sendUserPhoneNumberData) return;
    try {
      const response = await fetch(
        "https://pickbonus.myawardwallet.com/api/user/send_code.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            otp_id: sendUserPhoneNumberData,
            otp_code: otp,
          }),
        }
      );

      const data: ConfirmOtpResponse = await response.json();
      // throw new Error("");

      if (response.ok && data.status === "APPROVED") {
        await saveUserPhoneNumber({ user, phoneNumber });
        await onConfirm();
      }
    } catch (e) {
      console.error("ERROR - onConfirmOtp:", e);
    }
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;

  return (
    <StyledDiv>
      <StyledBoxTel className="relative">
        <MuiTelInput
          className="input_phone"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          defaultCountry={defaultCountry}
          fullWidth
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
        <StyledButton
          className="btn-primary absolute right-2 btn-radius"
          variant="contained"
          onClick={() => {
            sendUserPhoneNumber({ phoneNumber });
          }}
        >
          Send code
        </StyledButton>
      </StyledBoxTel>

      <StyledBox>
        <OTP
          length={DEFAULT_OTP_LENGTH}
          value={otp}
          onChange={setOtp}
          separator=""
        />
      </StyledBox>

      <Box>
        <Button
          className="btn-primary"
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
          onClick={onConfirmOtp}
          disabled={isButtonContinueDisabled}
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

const StyledBoxTel = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `
);

const StyledButton = styled(Button)(
  () => `
    text-wrap: nowrap;
  `
);

const StyledBox = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
  `
);
