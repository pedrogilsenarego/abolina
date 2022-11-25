import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Container, Box } from "@mui/material";
import Textfield from "../../components/Inputs/TextField";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";

const Contacts = () => {

  const INITIAL_FORM_STATE = {
    reference: "",

  };


  return (
    <Container maxWidth='md' style={{ justifyContent: "center" }}>
      <GStyled.Title>{i18n.t("menuBar.contacts")}</GStyled.Title>
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
    </Container>
  );
};

export default Contacts;
