import { useMediaQuery, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import TextField from "../../../components/Inputs/TextFieldForm";
import { i18n } from "../../../translations/i18n";
import Button from "../../../components/Button";

import { useDispatch } from "react-redux";
import { recoverPassword } from "../../../slicer/user/user.actions";

const RecoverPwd = () => {

  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  interface FORM {
    email: string;
  }

  const INITIAL_STATE: FORM = {
    email: "",
  };
  const dispatch = useDispatch()
  const handleSubmit = (values: FORM) => {
    dispatch(recoverPassword(values.email))
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "40px" }}>

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
            <Button
              formik
              label={i18n.t("modules.login.retrievePassword")}
            />
          </div>
        </Form>
      </Formik>



    </div>
  );
};

export default RecoverPwd;
