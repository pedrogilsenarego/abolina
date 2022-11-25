import * as Styled from "./styles";
import { useField } from "formik";
import { Typography } from "@mui/material";

interface Props {
  placeholder?: string;
  onChange?: (value: string) => void;
  name?: string;
  form?: boolean;
  label?: string;
}

const Textfield = ({ placeholder, onChange, name, form, label }: Props) => {
  const [field, meta] = useField(name ?? "");

  const configTextField = form
    ? {
      ...field,
      error: false,
      helperText: "",
    }
    : {
      error: false,
      helperText: null,
      onChange: (e: any) => onChange && onChange(e.target.value),
    };

  if (form && meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <>
      <Typography>{label}</Typography>
      <Styled.TextField
        size='small'
        placeholder={placeholder}
        {...configTextField}
      />
    </>
  );
};

export default Textfield;
