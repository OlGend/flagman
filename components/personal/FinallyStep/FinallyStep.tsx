import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

type FinallyStepProps = {
  text: string;
  onClick: () => Promise<void>;
  t: Function; 
};

export const FinallyStep = ({ text, onClick, t }: FinallyStepProps) => {
  return (
    <StyledDiv>
      <Typography>{text}</Typography>
      <Box>
        <Button className="btn-primary" variant="contained" onClick={onClick}>
          {t("Finish")}
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
