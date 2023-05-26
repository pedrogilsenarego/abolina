import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { Container, Box } from "@mui/material";
import Textfield from "../../../../components/Inputs/TextFieldForm";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../../components/Button/ButtonFormik";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../../slicer/types";
import { scrollToContacts, updateFailNotification } from "../../../../slicer/general/general.actions";
import { Colors } from "../../../../constants/pallette";
import { api } from "../../../../constants/backend";
import { enableLoading } from "../../../../slicer/general/general.actions";
import { disableLoading } from "../../../../slicer/general/general.actions";
import Loader from "../../../../components/Loader";

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
  const loading = useSelector<State, boolean>((state) => state.general.loading)
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
    dispatch(enableLoading())
    await fetch(api.sendEmailLocal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        dispatch(updateFailNotification("Error Sending the message"))
        dispatch(disableLoading())
        console.error("Error:", error);
      })
      .finally(() => {
        dispatch(disableLoading())
      })
  };

  return (
    <Container
      maxWidth='md'
      style={{ justifyContent: "center" }}
      ref={contactsRef}
    >
      <GStyled.Title>
        {i18n.t("modules.home.contacts.contactsTitle")}
      </GStyled.Title>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm()
        }}
        validationSchema={FORM_VALIDATION}
      >
        {loading ? <Loader color="white" customMessage="Sending the message" /> : <Form>
          <Box
            rowGap={2}
            display='flex'
            flexDirection='column'
            sx={{ mt: "20px" }}
          >
            <Box>
              <Textfield
                label={i18n.t("modules.home.contacts.form.name")}
                name='name'
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
            <ButtonForm
              backgroundColor='white'
              borderColor={Colors.darkGrey}
              color={Colors.tealc}
              label={i18n.t("modules.home.contacts.form.send")}
            />
          </Box>
        </Form>}

      </Formik>
    </Container>
  );
};

export default Contacts;
