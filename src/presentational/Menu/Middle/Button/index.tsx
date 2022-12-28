import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css"

interface Props {
  title: string;
  path?: string;
  setOpenDrawer: (openDrawer: boolean) => void;
  onClick?: () => void;
  selected?: boolean
}

const Button = ({ title, path, setOpenDrawer, onClick, selected }: Props) => {
  const navigate = useNavigate();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));



  return (
    <>
      <p
        className={selected ? "menu-text-selected" : "menu-text"}
        style={{
          color: "whiteSmoke",
          cursor: "pointer",
          fontSize: mobile ? "20px" : "15px",
          fontWeight: 700,
          paddingBottom: "5px",

        }}

        onClick={() => {
          if (path) {
            navigate(path);
            setOpenDrawer(false);
          }
          if (onClick) {
            onClick();
          }
        }}
      >
        {title}
      </p>
    </>
  );
};

export default Button;
