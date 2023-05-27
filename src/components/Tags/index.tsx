import { Typography } from "@mui/material";
import { Colors, Pallette } from "../../constants/pallette";

interface Props {
  label: string;
  disabled?: boolean;
}

const Tag = ({ label, disabled }: Props) => {
  return (
    <div
      style={{
        padding: "5px 10px 5px 10px",
        backgroundColor: disabled ? "transparent" : Pallette.primary,
        border: disabled ? `dashed 2px ${Colors.darkGrey}` : undefined,
        borderRadius: "30px",

      }}
    >
      <Typography style={{ color: disabled ? "inherit" : Pallette.constrast }}>{label}</Typography>

    </div>
  );
};

export default Tag;
