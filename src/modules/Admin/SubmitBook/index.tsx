import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { Container, Box } from "@mui/material";
import Textfield from "../../../components/Inputs/TextField";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../components/Buttons/ButtonFormik";

const SubmitBook = () => {
  const INITIAL_FORM_STATE = {
    title: "",
    email: "",
    subject: "",
    description: ""
  };

  const handleSubmit = (values: any) => {
    console.log("teste", values)
  }

  return (
    <Container maxWidth='md' style={{ justifyContent: "center" }}>
      <GStyled.Title>
        {i18n.t("modules.home.contacts.contactsTitle")}
      </GStyled.Title>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <Box rowGap={2} display="flex" flexDirection="column" sx={{ mt: "20px" }}>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.title")}
                name='title'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.home.contacts.form.email")}
                name='email'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.home.contacts.form.subject")}
                name='subject'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.home.contacts.form.description")}
                name='description'
                multiline
                rows={6}
              />
            </Box>
          </Box>
          <Box display='flex' justifyContent='start' sx={{ mt: "20px" }}>
            <ButtonForm label={i18n.t("modules.home.contacts.form.send")} />
          </Box>
        </Form>
      </Formik>
    </Container >
  );
};

export default SubmitBook;
