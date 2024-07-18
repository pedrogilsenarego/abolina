import { Box, Container } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonForm from "../../../../components/Button";
import Textfield from "../../../../components/Inputs/TextFieldForm";
import Loader from "../../../../components/Loader";
import { api } from "../../../../constants/backend";
import { Colors } from "../../../../constants/pallette";
import {
  disableLoading,
  enableLoading,
  scrollToContacts,
  updateFailNotification,
  updateSuccessNotification,
} from "../../../../slicer/general/general.actions";
import { State } from "../../../../slicer/types";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

const Contacts = () => {
  const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    subject: "",
    description: "",
  };
  const dispatch = useDispatch();
  const contactsRef = useRef<HTMLDivElement>(null);
  const scrollToContactsL = useSelector<State>(
    (state) => state.general.scrollToContacts
  );
  const loading = useSelector<State, boolean>((state) => state.general.loading);
  const handleScrollToContacts = () => {
    if (null !== contactsRef.current) {
      window.scrollTo({
        top: contactsRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollToContactsL) {
      handleScrollToContacts();
      dispatch(scrollToContacts(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToContactsL]);

  const handleSubmit = async (values: any) => {
    dispatch(enableLoading());

    try {
      const response = await fetch(api.sendEmailHosted, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the successful response here
      console.log("Success:", data);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Failed to parse JSON response:", error);
        //dispatch(updateFailNotification("Error parsing server response"));
      } else {
        console.error("Error:", error);
        //dispatch(updateFailNotification("Error Sending the message"));
      }
    } finally {
      dispatch(updateSuccessNotification("E-mail sent"));
      dispatch(disableLoading());
    }
  };

  return (
    <Container
      maxWidth="md"
      style={{ justifyContent: "center" }}
      ref={contactsRef}
    >
      <GStyled.Title style={{ textAlign: "center" }}>
        {i18n.t("modules.home.contacts.contactsTitle")}
      </GStyled.Title>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={FORM_VALIDATION}
      >
        {loading ? (
          <Loader color="white" customMessage="Sending the message" />
        ) : (
          <Form>
            <Box
              rowGap={2}
              display="flex"
              flexDirection="column"
              sx={{ mt: "20px" }}
            >
              <Box>
                <Textfield
                  label={i18n.t("modules.home.contacts.form.name")}
                  name="name"
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.home.contacts.form.email")}
                  name="email"
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.home.contacts.form.subject")}
                  name="subject"
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.home.contacts.form.description")}
                  name="description"
                  multiline
                  rows={6}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="start" sx={{ mt: "20px" }}>
              <ButtonForm
                formik
                label={i18n.t("modules.home.contacts.form.send")}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Contacts;
