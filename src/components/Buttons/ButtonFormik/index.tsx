import { Button as MuiButton, Typography } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import { useFormikContext } from "formik";

interface Props {
  label: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;

}

const Button = ({ label, backgroundColor, borderColor, color }: Props) => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <MuiButton
        style={{
          backgroundColor: backgroundColor || Colors.tealc,
          color: color || "white",
          border: borderColor ? `solid 2px ${borderColor}` : "auto",
          borderRadius: "6px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "10px"

        }}
        onClick={() => {

          submitForm()
        }}
      >
        <Typography style={{
          textTransform: "uppercase",
          fontSize: "16px", fontWeight: 800,
        }}>
          {label}
        </Typography>
      </MuiButton>
    </>
  );
};

export default Button;
