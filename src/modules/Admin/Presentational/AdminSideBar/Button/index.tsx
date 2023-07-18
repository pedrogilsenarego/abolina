import { Box, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Pallette } from "../../../../../constants/pallette";

interface Props {
  icon: ReactNode;
  label: string;
  path: string;
}

const Button = ({ icon, label, path, ...props }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const iconStyle = {
    color:
      hover || location.pathname === path
        ? Pallette.constrast
        : Pallette.constrastTransparent,
    marginRight: "4px",
    fontSize: `20px`,
    width: `20px`,
    height: `20px`,
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      display="flex"
      columnGap={1}
      alignItems="center"
      padding="10px 10px"
      style={{
        borderRight:
          location.pathname === path
            ? `4px solid ${Pallette.primaryDark}`
            : undefined,
        cursor: "pointer",
      }}
      onClick={() => navigate(path)}
      {...props}
    >
      {(icon as React.ReactElement).type ? (
        // Check if the icon is a valid React element
        React.cloneElement(icon as React.ReactElement, {
          style: iconStyle,
        }) // Apply the icon style
      ) : (
        <span style={iconStyle}>{icon}</span>
      )}

      <Typography
        style={{
          fontSize: "14px",
          color:
            hover || location.pathname === path
              ? Pallette.constrast
              : Pallette.constrastTransparent,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Button;
