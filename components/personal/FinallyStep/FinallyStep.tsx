import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

type FinallyStepProps = {
  text: string;
  onClick: () => Promise<void>;
};

export const FinallyStep = ({ text, onClick }: FinallyStepProps) => {
  return (
    <StyledDiv>
      <Typography>{text}</Typography>
      <Box>
        <Button className="btn-primary" variant="contained" onClick={onClick}>
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
