import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"



interface Props {
  title: string;
  path: string;
}

const Button = ({ title, path }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <Typography
        style={{ color: "whiteSmoke", cursor: "pointer" }}

        onClick={() => navigate(path)}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
