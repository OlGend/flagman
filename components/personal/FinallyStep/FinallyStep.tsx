import { Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

type FinallyStepProps = {
  text: string;
};

export const FinallyStep = ({ text }: FinallyStepProps) => {
  return (
    <StyledDiv>
      <Typography>{text}</Typography>

      <Box>
        <Button
          className="btn-primary"
          variant="contained"
          onClick={() => {
            console.log("Finish");
          }}
        >
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
