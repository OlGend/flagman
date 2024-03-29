import { Box, Button, Dialog } from "@mui/material";
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
  user: User;
  phoneNumber: string;
  onChangePhoneNumber: (nextPhoneNumber: string) => void;
};

const DEFAULT_OTP_LENGTH = 5;

type Status = {
  status: "EXPIRED" | "APPROVED";
};

type Message = {
  message: string;
};

type ConfirmOtpResponse = Status | Message;

const hasConfirmOtpResponseStatus = (
  response: ConfirmOtpResponse
): response is Status => "status" in response;

export const PhoneNumberStep = ({
  step,
  onChangeStep,
  onConfirm,
  user,
  phoneNumber,
  onChangePhoneNumber,
}: PhoneNumberStepProps) => {
  const defaultCountry = (localStorage.getItem("country") ?? undefined) as
    | MuiTelInputCountry
    | undefined;

  const [otp, setOtp] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

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

  const onSendUserPhoneNumber = async (phoneNumber: string) => {
    setOtp("");
    setOtpMessage("");
    try {
      await sendUserPhoneNumber({ phoneNumber });
      setIsDialogOpen(true);
    } catch (e) {
      // TODO: add error handler
    }
  };

  const onConfirmOtp = async () => {
    if (!sendUserPhoneNumberData) return;
    setOtpMessage("");
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

      if (hasConfirmOtpResponseStatus(data) && data.status === "APPROVED") {
        await saveUserPhoneNumber({ user, phoneNumber });
        await onConfirm();
        onCloseDialog();
        return;
      }

      if (hasConfirmOtpResponseStatus(data) && data.status === "EXPIRED") {
        setOtpMessage("Your OTP expired");
        return;
      }

      if (!hasConfirmOtpResponseStatus(data)) {
        setOtpMessage(data.message);
      }
    } catch (e) {
      setOtpMessage("Something wrong, try again!");
      console.error("ERROR - onConfirmOtp:", e);
    }
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
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
            onSendUserPhoneNumber(phoneNumber);
          }}
        >
          Send code
        </StyledButton>
      </StyledBoxTel>

      <Dialog open={isDialogOpen} onClose={onCloseDialog}>
        <StyledBox>
          <OTP
            length={DEFAULT_OTP_LENGTH}
            value={otp}
            onChange={setOtp}
            separator=""
          />
        </StyledBox>
        {otpMessage && <div>{otpMessage}</div>}
        <Button
          className="btn-primary"
          variant="contained"
          onClick={onConfirmOtp}
          disabled={isButtonContinueDisabled}
        >
          Continue
        </Button>
      </Dialog>

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
