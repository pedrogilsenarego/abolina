import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom"



interface Props {
  title: string;
  path: string;
  setOpenDrawer: (openDrawer: boolean) => void
}

const Button = ({ title, path, setOpenDrawer }: Props) => {
  const navigate = useNavigate()
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  return (
    <>
      <Typography
        style={{ color: "whiteSmoke", cursor: "pointer", fontSize: mobile ? "34px" : "18px" }}

        onClick={() => { navigate(path); setOpenDrawer(false) }}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
