import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState } from "react";
import { styled } from "@mui/system";

import { OTP } from "../OTP";
import { User } from "@/app/personal/page";

type PhoneNumberStepProps = {
  step: number;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
};

const oneTimePasswordLength = 5;

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

  const setPhoneToUser = async () => {
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

  const isButtonDisabled = otp.length < oneTimePasswordLength;

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
          onClick={() => {
            console.log("Send code");
          }}
        >
          Send code
        </StyledButton>
      </StyledBoxTel>

      <StyledBox>
        <OTP
          length={oneTimePasswordLength}
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
          onClick={setPhoneToUser}
          disabled={isButtonDisabled}
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
