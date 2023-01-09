import { Button as MuiButton, Typography } from "@mui/material";
import { Colors } from "../../../constants/pallette";

interface Props {
  label: string;
  onClick?: () => void
  borderRadius?: string
}

const Button = ({ label, onClick, borderRadius }: Props) => {
  return (
    <>
      <MuiButton
        style={{
          backgroundColor: Colors.tealc,
          color: "white",
          borderRadius: borderRadius || "40px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        onClick={onClick}
      >
        <Typography style={{ fontSize: "16px", fontWeight: 700 }}>
          {label}
        </Typography>
      </MuiButton>
    </>
  );
};

export default Button;
