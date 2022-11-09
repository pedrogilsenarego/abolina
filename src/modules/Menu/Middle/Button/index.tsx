import { Typography } from "@mui/material";
import { useState } from "react";


interface Props {
  title: string;
}

const Button = ({ title }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <Typography
        style={{ color: hover ? "yellow" : "whiteSmoke", cursor: "pointer" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
