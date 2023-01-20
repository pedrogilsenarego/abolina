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
          border: borderColor ? `solid 1px ${borderColor}` : "auto",
          borderRadius: "40px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "10px"

        }}
        onClick={() => {

          submitForm()
        }}
      >
        <Typography style={{
          fontSize: "12px", fontWeight: 700,
        }}>
          {label}
        </Typography>
      </MuiButton>
    </>
  );
};

export default Button;
