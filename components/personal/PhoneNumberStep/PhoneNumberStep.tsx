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


  const handleSendSMS = async () => {
    try {
      const response = await fetch("https://pickbonus.myawardwallet.com/api/user/get_token.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          phoneNumber: phoneNumber // Отправляем номер телефона
        })
      });

      const data = await response.json();
      setOtpId(data.otp_id);
      console.log("TOKEN",data); // Обработка ответа от вашего PHP API

    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  
  console.log("RESPONSE", otpId);

  const verifyOtp = async () => {
  
    try {
      const response = await fetch('https://pickbonus.myawardwallet.com/api/user/send_code.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          otp_id: otpId,
          otp_code: code
        })
      });

      const data = await response.json();

      // В зависимости от ответа вашего сервера, вы можете настроить сообщение
      if (response.ok && data.status === "APPROVED") {
        setPhoneToUser();
        postMessage('OTP верифицирован успешно.');
      } else {
        postMessage('Ошибка при верификации OTP.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      postMessage('Ошибка при верификации OTP.');
    }
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
          onClick={handleSendSMS}
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
          onClick={verifyOtp}
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
