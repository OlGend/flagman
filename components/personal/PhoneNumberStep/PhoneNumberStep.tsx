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

  const [otpId, setOtpId] = useState<string>("");


  const fetchAuthToken = async (clientId: string, clientSecret: string) => {
    const response = await fetch('https://api.d7networks.com/auth/v1/login/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'client_id': clientId,
        'client_secret': clientSecret
      })
    });
  
    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error(data.message || 'Failed to fetch auth token');
    }
  };
  
  const sendSms = async (phoneNumber: string) => {
    try {
      const authToken = await fetchAuthToken('q3pclZDnn9ZjbgvXoLcmrKZDO8fJ8EAwkQ4DHWpG', 'MCgmZREVlaiUkM4XkszuIdKgQEQlsR43dPbwhg7qaeOaaGf0Rm36IfZMF9Sc1tBeshdp2SDOTQ67TkTajD3F7bYhMWbxpIxvvxE48xx8NOh8qB3NfPaMqt7fGoji1C0a');
      const response = await fetch("https://api.d7networks.com/verify/v1/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
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
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setOtpId(data.otp_id);
      } else {
        throw new Error(data.message || 'Failed to send SMS');
      }
    } catch (error) {
      console.error("Error: catch some error");
    }
  };
  
  const verifyOtp = async (otpId: string, code: string) => {
    try {
      // Получаем токен аутентификации
      const authToken = await fetchAuthToken('q3pclZDnn9ZjbgvXoLcmrKZDO8fJ8EAwkQ4DHWpG', 'MCgmZREVlaiUkM4XkszuIdKgQEQlsR43dPbwhg7qaeOaaGf0Rm36IfZMF9Sc1tBeshdp2SDOTQ67TkTajD3F7bYhMWbxpIxvvxE48xx8NOh8qB3NfPaMqt7fGoji1C0a');
  
      // Выполняем запрос на проверку OTP с динамически полученным токеном
      const response = await fetch("https://api.d7networks.com/verify/v1/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          otp_id: otpId,
          otp_code: code,
        }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok && data.status === "APPROVED") {
        setPhoneToUser();
      } else {
        console.log("MODAL ERROR");
      }
    } catch (error) {
      console.error("Verification Error:");
    }
  };
  
  // const [userOtp, setUserOtp] = useState("");

  // const handleOtpChange = (e) => {
  //   setUserOtp(e.target.value);
  // };

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
