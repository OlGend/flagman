import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState } from "react";
import { styled } from "@mui/system";

import { OTP } from "../OTP";
import type { User } from "@/app/interfaces/user";

type PhoneNumberStepProps = {
  step: number;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
};

const DEFAULT_OTP_LENGTH = 5;
type queries = number;
type SendPhoneNumberResponse = {
  expiry: number;
  otp_id: string;
  status: string;
};

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
  const [otpId, setOtpId] = useState("");

  const onChangePhoneNumber = (nextPhoneNumber: string) => {
    setPhoneNumber(nextPhoneNumber);
  };

  const onSaveUserPhoneNumber = async () => {
    if (!user) return;

    await fetch(
      `https://pickbonus.myawardwallet.com/api/user/update_phone.php`,
      {
        method: "POST",
        body: JSON.stringify({
          id: user.id,
          phone_number: phoneNumber,
        }),
      }
    );

    await onConfirm();
  };

  const onSendPhoneNumber = async () => {
    try {
      const response = await fetch(
        "https://pickbonus.myawardwallet.com/api/user/get_token.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            phoneNumber: phoneNumber, // Отправляем номер телефона
          }),
        }
      );

      const data: SendPhoneNumberResponse = await response.json();
      setOtpId(data.otp_id);
    } catch (e) {
      console.error("ERROR - onSendOtpToPhoneNumber:", e);
    }
  };

  const onConfirmOtp = async () => {
    try {
      const response = await fetch(
        "https://pickbonus.myawardwallet.com/api/user/send_code.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            otp_id: otpId,
            otp_code: otp,
          }),
        }
      );

      const data: ConfirmOtpResponse = await response.json();
      // throw new Error("");

      if (response.ok && data.status === "APPROVED") {
        await onSaveUserPhoneNumber();
        await onConfirm();
      }
    } catch (e) {
      console.error("ERROR - onConfirmOtp:", e);
    }
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;

  return (
    <StyledDiv>
      <StyledBoxTel>
        <MuiTelInput
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          defaultCountry={defaultCountry}
          fullWidth
        />
        <StyledButton
          className="btn-primary"
          variant="contained"
          onClick={onSendPhoneNumber}
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
