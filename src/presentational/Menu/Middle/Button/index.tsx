import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom"



interface Props {
  title: string;
  path?: string;
  setOpenDrawer: (openDrawer: boolean) => void
  onClick?: () => void
}

const Button = ({ title, path, setOpenDrawer, onClick }: Props) => {
  const navigate = useNavigate()
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  return (
    <>
      <Typography
        style={{ color: "whiteSmoke", cursor: "pointer", fontSize: mobile ? "34px" : "18px" }}

        onClick={() => {
          if (path) { navigate(path); setOpenDrawer(false) };
          if (onClick) { onClick() }
        }}
      >
        {title}
      </Typography>
    </>
  );
};

export default Button;
