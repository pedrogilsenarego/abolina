import { useFormikContext } from "formik"
import ButtonComponent from "./ButtonComponent"

interface Props {
  formik?: boolean
  label: string
  onClick?: () => void
}

const Button = ({ formik, label, onClick }: Props) => {

  const RenderButtonFormik = () => {
    const { submitForm } = useFormikContext()

    return <ButtonComponent onClick={submitForm} label={label} />
  }
  const RenderButton = () => {

    return <ButtonComponent onClick={onClick} label={label} />
  }
  return formik ? RenderButtonFormik() : RenderButton()
}

export default Button