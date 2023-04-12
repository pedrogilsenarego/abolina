import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import TextField from "../../../components/Inputs/TextField";
import { i18n } from "../../../translations/i18n";
import Button from "../../../components/Buttons/ButtonFormik";
import { Colors } from "../../../constants/pallette";
import CheckBox from "../../../components/Inputs/CheckBox";
import { useDispatch } from "react-redux";
import { signUpUserStart } from "../../../slicer/user/user.actions";

export interface FORM {
  email: string;
  password: string;
  name: string;
  acceptTerms: boolean;
}

const Register = () => {
  const INITIAL_STATE: FORM = {
    email: "",
    password: "",
    name: "",
    acceptTerms: false,
  };
  const dispatch = useDispatch();
  const handleSubmit = (values: FORM) => {
    dispatch(signUpUserStart(values));
  };
  return (
    <div style={{ width: "450px" }}>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <TextField label={i18n.t("modules.login.name")} name='name' />
            <TextField label={i18n.t("modules.login.email")} name='email' />
            <TextField
              password
              label={i18n.t("modules.login.password")}
              name='password'
            />
            <CheckBox
              name='acceptTerms'
              color={Colors.tealc}
              label={i18n.t("modules.login.acceptTerms")}
            />
            <Button
              backgroundColor='white'
              color={Colors.tealc}
              borderColor={Colors.tealc}
              label={i18n.t("modules.login.createAccount")}
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
