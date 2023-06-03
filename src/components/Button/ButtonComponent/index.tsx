import { Button as MuiButton, Typography } from "@mui/material";
import { Pallette } from "../../../constants/pallette";
import { useState } from "react";

interface Props {
  label: string;
  onClick?: () => void;
  borderRadius?: string;
  invertColors?: boolean;
}

const ButtonComponent = ({
  label,
  onClick,
  borderRadius,
  invertColors,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <MuiButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          backgroundColor:
            hover || invertColors ? Pallette.primary : Pallette.constrast,

          borderRadius: borderRadius || "6px",
          paddingLeft: "20px",
          paddingRight: "20px",
          border: `solid 2px ${Pallette.primary}`,
        }}
        onClick={onClick}
      >
        <Typography
          style={{
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            color:
              hover || invertColors ? Pallette.constrast : Pallette.primary,
          }}
        >
          {label}
        </Typography>
      </MuiButton>
    </>
  );
};

export default ButtonComponent;
