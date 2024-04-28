import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import Image from "next/image";

import { Brand } from "@/app/personal/page";

type FinallyStepProps = {
  brands: Brand[];
};

export const FinallyStep = ({ brands }: FinallyStepProps) => {
  const savedUrl = localStorage.getItem("savedUrl");

  return (
    <StyledDiv>
      <Box>
        <div className="flex flex-wrap px-0 py-6">
          {brands.map((brand) => (
            <div key={brand.id_brand} className="card-brand mb-3 basis-[19%]">
              <div className="brandImage p-3">
                <Link href={`${brand.GoBig}/${savedUrl}`}>
                  <Image
                    src={`/brands/${brand.CasinoBrand}.png`}
                    alt={`/brands/${brand.CasinoBrand}.png`}
                    width={150}
                    height={75}
                  />
                </Link>
              </div>
              <div className="brandContent p-3">
                <div>
                  <div className="review-bonus">{brand.OurOfferContent}</div>
                </div>
                <div className="buttons">
                  <Link
                    className="btn btn-primary"
                    href={`${brand.GoBig}/${savedUrl}`}
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
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
