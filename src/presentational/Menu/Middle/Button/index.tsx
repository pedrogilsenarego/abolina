import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"



interface Props {
  title: string;
  path: string;
  setOpenDrawer: (openDrawer: boolean) => void
}

const Button = ({ title, path, setOpenDrawer }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <Typography
        style={{ color: "whiteSmoke", cursor: "pointer" }}

        onClick={() => { navigate(path); setOpenDrawer(false) }}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
