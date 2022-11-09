import { Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"



interface Props {
  title: string;
  path: string;
}

const Button = ({ title, path }: Props) => {
  const navigate = useNavigate()
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <Typography
        style={{ color: hover ? "yellow" : "whiteSmoke", cursor: "pointer" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate(path)}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
