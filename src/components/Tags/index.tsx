import { Typography } from "@mui/material";
import { Colors, Pallette } from "../../constants/pallette";

interface Props {
  label: string;
  inverted?: boolean;
}

const Tag = ({ label, inverted }: Props) => {
  return (
    <div
      style={{
        padding: "0px 10px",
        backgroundColor: inverted ? "transparent" : Pallette.primary,
        border: inverted ? `dashed 2px ${Colors.darkGrey}` : undefined,
        borderRadius: "30px",
      }}
    >
      <Typography
        style={{
          color: inverted ? "inherit" : Pallette.constrast,
          lineHeight: "18px",
        }}
      >
        {label}
      </Typography>
    </div>
  );
};

export default Tag;
