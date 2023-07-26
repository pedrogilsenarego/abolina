import { useFormikContext } from "formik";
import ButtonComponent from "./ButtonComponent";

interface Props {
  formik?: boolean;
  label: string;
  onClick?: () => void;
  invertColors?: boolean;
  children?: any;
}

const Button = ({ formik, label, onClick, invertColors, children }: Props) => {
  const RenderButtonFormik = () => {
    const { submitForm } = useFormikContext();

    return (
      <ButtonComponent
        onClick={submitForm}
        label={label}
        invertColors={invertColors}
      />
    );
  };

  const RenderButton = () => {
    return (
      <ButtonComponent
        onClick={onClick}
        label={label}
        invertColors={invertColors}
      />
    );
  };
  return formik ? RenderButtonFormik() : RenderButton();
};

export default Button;
