import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import TextField from "../../../../components/Inputs/TextField";
import { i18n } from "../../../../translations/i18n";
import Button from "../../../../components/Buttons/ButtonFormik";
import { Colors } from "../../../../constants/pallette";

interface FORM {
  email: string;
  password: string;

}

const EmailPass = () => {
  const INITIAL_STATE: FORM = {
    email: "",
    password: "",

  };
  const handleSubmit = (values: FORM) => {
    console.log(values);
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

            <TextField label={i18n.t("modules.login.email")} name='email' />
            <TextField
              password
              label={i18n.t("modules.login.password")}
              name='password'
            />
            <Button
              backgroundColor='white'
              color={Colors.tealc}
              borderColor={Colors.tealc}
              label={i18n.t("modules.login.startSession")}
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default EmailPass;
