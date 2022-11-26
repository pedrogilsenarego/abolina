import { Button as MuiButton, Typography } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import { useFormikContext } from "formik";

interface Props {
  label: string;

}

const Button = ({ label }: Props) => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <MuiButton
        style={{
          backgroundColor: Colors.tealc,
          color: "white",
          borderRadius: "40px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        onClick={() => {

          submitForm()
        }}
      >
        <Typography style={{ fontSize: "12px", fontWeight: 700 }}>
          {label}
        </Typography>
      </MuiButton>
    </>
  );
};

export default Button;
