import { Box, Button, Dialog } from "@mui/material";
import { styled } from "@mui/system";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState } from "react";

import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import {
  useMutationSaveUserPhoneNumber,
  useMutationSendUserPhoneNumber,
} from "@/queries";
import { OTP } from "../OTP";

type PhoneNumberStepProps = {
  user: User;
  step: number;
  phoneNumber: string;
  onChangeStep: (nextStep: number) => void;
  onChangePhoneNumber: (nextPhoneNumber: string) => void;
  onConfirm: (userId: User["id"]) => Promise<void>;
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
  user,
  step,
  phoneNumber,
  onChangeStep,
  onChangePhoneNumber,
  onConfirm,
}: PhoneNumberStepProps) => {
  const defaultCountry = (localStorage.getItem("country") ?? undefined) as
    | MuiTelInputCountry
    | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [
    saveUserPhoneNumber,
    {
      loading: isSaveUserPhoneNumberLoading,
      error: isEaveUserPhoneNumberError,
    },
  ] = useMutationSaveUserPhoneNumber();

  const [
    sendUserPhoneNumber,
    {
      data: sendUserPhoneNumberData,
      loading: isSendUserPhoneNumberLoading,
      error: isSendUserPhoneNumberError,
      message: sendUserPhoneNumberMessage,
    },
  ] = useMutationSendUserPhoneNumber();

  const onSendUserPhoneNumber = async (phoneNumber: string) => {
    setOtp("");
    setOtpMessage("");
    setIsDialogOpen(false);
    await sendUserPhoneNumber({ phoneNumber });
    setIsDialogOpen(true);
  };

  const onConfirmOtp = async () => {
    if (!sendUserPhoneNumberData) return;
    setIsLoading(true);
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
        await saveUserPhoneNumber({ userId: user.id, phoneNumber });
        await onConfirm(user.id);
        onCloseDialog();
        setIsLoading(false);
        return;
      }

      if (hasConfirmOtpResponseStatus(data) && data.status === "EXPIRED") {
        setOtpMessage("Your OTP expired");
        setIsLoading(false);
        return;
      }

      if (!hasConfirmOtpResponseStatus(data)) {
        setOtpMessage(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (e) {
      setOtpMessage("Something wrong, try again!");
      setIsLoading(false);
    }
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;
  const isLoaderShown =
    isSendUserPhoneNumberLoading || isLoading || isSaveUserPhoneNumberLoading;

  return (
    <StyledDiv>
      <StyledBoxTel className="relative">
        <MuiTelInput
          className="input_phone"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          defaultCountry={defaultCountry}
          fullWidth
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

      <Dialog
        open={isDialogOpen && !isSendUserPhoneNumberError}
        onClose={onCloseDialog}
      >
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
      {sendUserPhoneNumberMessage && <div>{sendUserPhoneNumberMessage}</div>}
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
      {isLoaderShown && <Loader />}
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


