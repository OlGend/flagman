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
import { useTranslation } from "react-i18next";

type PhoneNumberStepProps = {
  user: User;
  step: number;
  phoneNumber: string;
  onChangeStep: (nextStep: number) => void;
  onChangePhoneNumber: (nextPhoneNumber: string) => void;
};

const DEFAULT_OTP_LENGTH = 5;
const DEFAULT_PHONE_NUMBER_LENGTH = 6;

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
}: PhoneNumberStepProps) => {
  const { t } = useTranslation();

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
        onCloseDialog();
        setIsLoading(false);
        onChangeStep(step + 1);
        return;
      }

      if (hasConfirmOtpResponseStatus(data) && data.status === "EXPIRED") {
        setOtpMessage(t("Your OTP expired"));
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
      setOtpMessage(t("Something wrong, try again!"));
      setIsLoading(false);
    }
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;
  const isLoaderShown =
    isSendUserPhoneNumberLoading || isLoading || isSaveUserPhoneNumberLoading;
  const isButtonSendCodeDisabled =
    phoneNumber.length < DEFAULT_PHONE_NUMBER_LENGTH;

  return (
    <StyledDiv>
      <StyledBoxTel className="relative">
        <MuiTelInput
          className="input_phone"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          defaultCountry={defaultCountry}
          fullWidth
          helperText={sendUserPhoneNumberMessage}
          error={isSendUserPhoneNumberError}
        />
        <StyledButton
          disabled={isButtonSendCodeDisabled}
          className="btn-primary absolute right-2 btn-radius"
          variant="contained"
          onClick={() => {
            onSendUserPhoneNumber(phoneNumber);
          }}
        >
          {t("Send code")}
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
          {t("Continue")}
        </Button>
      </Dialog>
      <Box>
        <Button
          className="btn-primary w-48 !mr-2"
          variant="contained"
          onClick={() => {
            onChangeStep(step - 1);
          }}
        >
          {t("Prev step")}
        </Button>
        <Button
          className="btn-primary w-48"
          variant="contained"
          onClick={() => {
            onChangeStep(step + 1);
          }}
        >
          {t("Skip")}
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
    padding: 16px;
  `
);
