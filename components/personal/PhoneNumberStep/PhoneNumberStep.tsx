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
  const [code, setCode] = useState("");

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

  const isButtonDisabled = code.length < oneTimePasswordLength;

  const [otpId, setOtpId] = useState();
  const [status, setStauts] = useState();
  const sendSms = (phoneNumber) => {
    fetch("https://api.d7networks.com/verify/v1/otp/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMTYwZmQ2NWYtYTJlNC00YjdjLWE0ZTMtOWVhMTc0OTAxNzIxIn0.xtUqJP6RYJpg7zZ68EY2TKyz4JVkgqoP7w3TRR444qc",
      },
      body: JSON.stringify({
        originator: "MyAwardWallet",
        recipient: phoneNumber,
        content: "Your OTP code is: {}",
        expiry: 300,
        data_coding: "auto",
        retry_delay: 60,
        retry_count: 3,
        otp_code_length: 5,
        otp_type: "numeric",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOtpId(data.otp_id);
      })
      .catch((error) => console.error("Error:", error));
  };
  const verifyOtp = (otpId, code) => {
    fetch("https://api.d7networks.com/verify/v1/otp/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMTYwZmQ2NWYtYTJlNC00YjdjLWE0ZTMtOWVhMTc0OTAxNzIxIn0.xtUqJP6RYJpg7zZ68EY2TKyz4JVkgqoP7w3TRR444qc",
      },
      body: JSON.stringify({
        otp_id: otpId,
        otp_code: code,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStauts(data);
        if (status) {
          setPhoneToUser();
        } else {
          console.log("MODAL ERROR")
        }
      })
      .catch((error) => console.error("Verification Error:", error));
  };
  const [userOtp, setUserOtp] = useState("");

  const handleOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

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
          onClick={() => sendSms(phoneNumber)}
        >
          Send code
        </StyledButton>
      </StyledBoxTel>

      <StyledBox>
        <OTP
          length={oneTimePasswordLength}
          value={code}
          onChange={setCode}
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
          // onClick={setPhoneToUser}
          onClick={() => verifyOtp(otpId, code)}
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
