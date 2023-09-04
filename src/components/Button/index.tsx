import { useFormikContext } from "formik";
import { CSSProperties } from "react";
import ButtonComponent from "./ButtonComponent";

interface Props {
  formik?: boolean;
  label: string;
  onClick?: () => void;
  invertColors?: boolean;
  children?: any;
  leftIcon?: React.ReactElement<{
    color: string;
    size: string;
    style: CSSProperties;
  }>;
}

const Button = ({
  formik,
  label,
  onClick,
  invertColors,
  children,
  leftIcon,
}: Props) => {
  const RenderButtonFormik = () => {
    const { submitForm } = useFormikContext();

    return (
      <ButtonComponent
        leftIcon={leftIcon}
        onClick={submitForm}
        label={label}
        invertColors={invertColors}
      />
    );
  };

  const RenderButton = () => {
    return (
      <ButtonComponent
        leftIcon={leftIcon}
        onClick={onClick}
        label={label}
        invertColors={invertColors}
      />
    );
  };
  return formik ? RenderButtonFormik() : RenderButton();
};

export default Button;
