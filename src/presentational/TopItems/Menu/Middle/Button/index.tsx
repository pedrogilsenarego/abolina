import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useSelector } from "react-redux";
import { State } from "../../../../../slicer/types";
import { Colors } from "../../../../../constants/pallette";

interface Props {
  title: string;
  path?: string;
  setOpenDrawer: (openDrawer: boolean) => void;
  onClick?: () => void;
  selected?: boolean;
}

const Button = ({ title, path, setOpenDrawer, onClick, selected }: Props) => {
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const navigate = useNavigate();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        backgroundColor: vertical && selected ? Colors.tealc : "auto",
        paddingLeft: vertical ? "40px" : "0px",
      }}
    >
      <p
        className={selected && !vertical ? "menu-text-selected" : "menu-text"}
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: vertical ? "5px" : "0px",

          color: vertical && !selected ? "black" : "whiteSmoke",
          cursor: "pointer",
          fontSize: mobile ? "20px" : "18px",
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
    </div>
  );
};

export default Button;
