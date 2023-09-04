import { Button as MuiButton, Typography } from "@mui/material";
import React, { CSSProperties, useState } from "react";
import { Pallette } from "../../../constants/pallette";

interface Props {
  label: string;
  onClick?: () => void;
  borderRadius?: string;
  invertColors?: boolean;
  leftIcon?: React.ReactElement<{
    color: string;
    size: string;
    style: CSSProperties;
  }>;
}

const ButtonComponent = ({
  label,
  onClick,
  borderRadius,
  invertColors,
  leftIcon,
}: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div style={{ display: "inline-block" }}>
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
        {leftIcon &&
          React.cloneElement(leftIcon, {
            size: "20px",
            style: {
              height: "20px",
              marginRight: "10px",
              color:
                hover || invertColors ? Pallette.constrast : Pallette.primary,
            },
          })}
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
    </div>
  );
};

export default ButtonComponent;
