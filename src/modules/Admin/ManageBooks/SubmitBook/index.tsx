import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { Box, Container } from "@mui/material";
import Textfield from "../../../../components/Inputs/TextField";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../../components/Buttons/ButtonFormik";
import { useDispatch } from "react-redux";
import { addBook } from "../../../../slicer/books/books.actions";
import FileUploader from "../../../../components/Inputs/FileUploader";

const SubmitBook = () => {
  const INITIAL_FORM_STATE = {
    title: "",
    author: "",
    authorResume: "",
    designer: "",
    designerResume: "",
    translator: "",
    translatorResume: "",
    language: "",
    weight: "",
    size: "",
    resume: "",
    price: null,
    coverPage2: undefined,
    content: []
  };

  const dispatch = useDispatch();

  const handleSubmit = (values: any) => {
    dispatch(addBook({ ...values }));
  };

  return (
    <>
      <Title fontSize="24px">{i18n.t("adminSideBar.submitBook")}</Title>
      <Container maxWidth={"md"} style={{ marginTop: "60px" }}>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={FORM_VALIDATION}
        >
          <Form>
            <Box
              rowGap={2}
              display='flex'
              flexDirection='column'
              sx={{ mt: "20px" }}
            >
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.title")}
                  name='title'
                />
              </Box>

              <FileUploader
                name='coverPage2'
                fieldTitle={i18n.t("modules.admin.manageBooks.submitBook.coverPage")}
                acceptType='image/jpeg,image/jpg'
              />
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.author")}
                  name='author'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.authorResume")}
                  name='authorResume'
                  multiline
                  rows={6}
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.designer")}
                  name='designer'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.designerResume")}
                  name='designerResume'
                  multiline
                  rows={6}
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.translator")}
                  name='translator'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.translatorResume")}
                  name='translatorResume'
                  multiline
                  rows={6}
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.language")}
                  name='language'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.weight")}
                  name='weight'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.size")}
                  name='size'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.price")}
                  name='price'
                />
              </Box>
              <Box>
                <Textfield
                  label={i18n.t("modules.admin.manageBooks.submitBook.resume")}
                  name='resume'
                  multiline
                  rows={6}
                />
              </Box>
              <FileUploader
                name='content'
                multiple
                fieldTitle={i18n.t("modules.admin.manageBooks.submitBook.content")}
                acceptType='image/jpeg,image/jpg'
              />
            </Box>

            <Box display='flex' justifyContent='start' sx={{ mt: "20px" }}>
              <ButtonForm label={i18n.t("modules.home.contacts.form.send")} />
            </Box>
          </Form>
        </Formik>
      </Container>
    </>
  );
};

export default SubmitBook;
