import { Ellipsis } from "react-spinners-css";
import { Colors } from "../../constants/pallette";
import { Typography } from "@mui/material";

interface Props {
  size?: number;
  color?: string;
  customMessage?: string;
  progress?: number;
}

const Loader = ({ size = 100, color, customMessage, progress }: Props) => {
  const progressW = progress ? `${progress}%` : ""
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >

      <Typography>{customMessage} {progressW}</Typography>
      <Ellipsis

        size={size || 100}
        color={Colors.tealc}
      />
    </div>
  );
};

export default Loader;
