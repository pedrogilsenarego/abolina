import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import TextField from "../../../../components/Inputs/TextFieldForm";
import { Colors } from "../../../../constants/pallette";
import { emailSignInStart } from "../../../../slicer/user/user.actions";
import { i18n } from "../../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

interface FORM {
  email: string;
  password: string;
}

const EmailPass = () => {
  const INITIAL_STATE: FORM = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const handleSubmit = (values: FORM) => {
    dispatch(emailSignInStart(values));
  };
  return (
    <>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <TextField label={i18n.t("modules.login.email")} name="email" />
            <TextField
              password
              label={i18n.t("modules.login.password")}
              name="password"
            />
            <Button formik label={i18n.t("modules.login.startSession")} />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default EmailPass;
