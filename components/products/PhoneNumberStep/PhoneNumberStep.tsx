import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { OutlinedInput } from "@mui/material";

import { OTP } from "../OTP";
import type { User } from "@/interfaces/user";
import {
  useMutationSaveUserPhoneNumber,
  useMutationSendUserPhoneNumber,
} from "@/queries";
import Image from "next/image";

type PhoneNumberStepProps = {
  step: number;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
  product: object;
  setEmail: (email: string) => void;
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
  product,
  setEmail,
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
    { loading: saveUserPhoneNumberLoading, error: saveUserPhoneNumberError },
  ] = useMutationSaveUserPhoneNumber();

  const [
    sendUserPhoneNumber,
    {
      data: sendUserPhoneNumberData,

      loading: sendUserPhoneNumberLoading,
      error: sendUserPhoneNumberError,
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
      if (user !== null) {
        const id = user.id;

        if (response.ok && data.status === "APPROVED") {
          await saveUserPhoneNumber({ userId: id, phoneNumber });
          // другой код
        }
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
            <>
              <h2 className="text-center mb-2">Enter your phone number</h2>
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
                    sendUserPhoneNumber({ phoneNumber }).then(() => {
                      setShowOtp(false);
                      setShowPhone(true);
                    });
                  }}
                >
                  Send code
                </StyledButton>
              </StyledBoxTel>
            </>
          )}
          {showPhone && (
            <Box className="flex flex-col items-center">
              <h2 className="mb-2">Enter the code</h2>
              <StyledBox>
                <OTP
                  length={DEFAULT_OTP_LENGTH}
                  value={otp}
                  onChange={setOtp}
                  separator=""
                />
              </StyledBox>
              <div className="mt-4">
                <Button
                  className="btn-primary mr-1"
                  variant="contained"
                  onClick={() => {
                    onChangeStep(step - 1);
                  }}
                >
                  Prev step
                </Button>
                <Button
                  className="btn-primary ml-1"
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
              </div>
            </Box>
          )}
        </div>
      )}
      {showProduct && (
        <Box className="flex flex-col items-center">
          <Typography
            className="text-center mb-2"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Indicate the email address to which to send the card
          </Typography>

          <OutlinedInput onChange={(e) => setEmail(e.target.value)} />

          <Button
            className="btn btn-primary mt-4"
            onClick={async () => {
              await onConfirm(user.id);
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      )}
      {user?.phone_number && (
        <Box className="flex flex-col items-center">
          <Typography
            className="text-center mb-2"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Indicate the email address to which to send the card
          </Typography>

          <OutlinedInput onChange={(e) => setEmail(e.target.value)} />

          <Button
            className="btn btn-primary mt-4"
            onClick={async () => {
              await onConfirm(user.id);
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
