import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";

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
  const [userData, setUserData] = useState(user);

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

      if (response.ok && data.status === "APPROVED" && user !== null) {
        await saveUserPhoneNumber({ user, phoneNumber });
        await onConfirm();
      }
      
    } catch (e) {
      console.error("ERROR - onConfirmOtp:", e);
    }
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;
  const [showOtp, setShowOtp] = useState(true);
  const [showProduct, setShowProduct] = useState(false);
  const [showPhone, setShowPhone] = useState(false);



  return (
    <StyledDiv>
      {!user?.phone_number && (
        <div>
          {showOtp && (
            <StyledBoxTel className="relative">
              <MuiTelInput
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                defaultCountry={defaultCountry}
                fullWidth
              />
              <StyledButton
                className="btn-primary absolute right-1 text-xs"
                variant="contained"
                onClick={() => {
                  sendUserPhoneNumber({ phoneNumber })
                    .then(() => {
                      setShowOtp(false);
                      setShowPhone(true);
                    })
                }}
                
              >
                Send code
              </StyledButton>
            </StyledBoxTel>
          )}
          {showPhone && (
            <Box>
              <StyledBox>
                <OTP
                  length={DEFAULT_OTP_LENGTH}
                  value={otp}
                  onChange={setOtp}
                  separator=""
                />
              </StyledBox>
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
                onClick={async () => {
                  await onConfirmOtp();
                  setShowProduct(true);
                  setShowPhone(false);
                }}
                disabled={isButtonContinueDisabled}
              >
                Continue
              </Button>
            </Box>
          )}
        </div>
      )}
      {showProduct || user?.phone_number && (
        <Box sx={{ width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Purchase
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to buy this product for 20$?
          </Typography>
          <Button
            className="btn btn-primary mt-4"
            onClick={async () => {
              await onConfirm();
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      )}
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
