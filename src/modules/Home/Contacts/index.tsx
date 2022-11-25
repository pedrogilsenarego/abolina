import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { Box } from "@mui/material";
import Textfield from "../../../components/Inputs/TextField";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";

const Contacts = () => {

  const INITIAL_FORM_STATE = {
    reference: "",

  };


  return (
    <>
      <GStyled.Title>{i18n.t("modules.home.contacts")}</GStyled.Title>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={() => { }}
        validationSchema={FORM_VALIDATION}>
        <Form>
          <Box sx={{ mt: "40px" }}>

            <Textfield label="name" name="name" placeholder="Name" form />
          </Box>
        </Form>
      </Formik>
    </>
  );
};

export default Contacts;
