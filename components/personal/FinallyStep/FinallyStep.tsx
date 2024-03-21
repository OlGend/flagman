import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

type FinallyStepProps = {
  text: string;
  onFinish: () => Promise<void>;
};

export const FinallyStep = ({ text, onFinish }: FinallyStepProps) => {
  return (
    <StyledDiv>
      <Typography>{text}</Typography>

      <Box>
        <Button className="btn-primary" variant="contained" onClick={onFinish}>
          Finish
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
