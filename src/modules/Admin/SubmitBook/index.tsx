import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { Container, Box, Typography } from "@mui/material";
import Textfield from "../../../components/Inputs/TextField";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../components/Buttons/ButtonFormik";
import { useDispatch } from "react-redux";
import { addBook } from "../../../slicer/books/books.actions";
import { useState } from "react";
import { storage } from "../../../firebase/utils";
import FileUploader from "../../../components/Inputs/FileUploader";

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
    coverPage2: null
  };

  const dispatch = useDispatch();


  const [imageUpload, setImageUpload] = useState<any>(null);
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState("")
  const [coverPage, setCoverPage] = useState("")

  const handleSubmit = (values: any) => {
    dispatch(addBook({ ...values, coverPage }));
  };

  const uploadImage = (title: string) => {
    if (imageUpload == null) return;
    const storageRef = storage
      .ref(`books/${title}/${imageUpload.name}`)
      .put(imageUpload);
    storageRef.on(
      "state_changed",
      (snapshot) => {
        const progressD = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgress(progressD)
      },
      (error) => console.log(error),
      () => {
        storage.ref("books").child(title).child(imageUpload.name).getDownloadURL().then(url => {
          setCoverPage(url)
        });
      }
    );
  };

  return (
    <Container maxWidth='md' style={{ justifyContent: "center" }}>
      <GStyled.Title>
        {i18n.t("modules.admin.submitBook.submitTitle")}
      </GStyled.Title>
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
                label={i18n.t("modules.admin.submitBook.title")}
                name='title'
                getvalue={setTitle}
              />
            </Box>
            <Box>
              <Typography>Cover Image</Typography>
              <input
                type='file'
                onChange={(e: any) => setImageUpload(e?.target?.files[0])}
              />
              <button disabled={!title} onClick={() => uploadImage(title)}>Upload Image</button>
              <h2>Upload: {progress}%</h2>
            </Box>
            <FileUploader name="coverPage2" title={title} setImage={setCoverPage} fieldTitle={i18n.t("modules.admin.submitBook.coverPage")} />
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.author")}
                name='author'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.authorResume")}
                name='authorResume'
                multiline
                rows={6}
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.designer")}
                name='designer'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.designerResume")}
                name='designerResume'
                multiline
                rows={6}
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.translator")}
                name='translator'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.translatorResume")}
                name='translatorResume'
                multiline
                rows={6}
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.language")}
                name='language'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.weight")}
                name='weight'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.size")}
                name='size'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.price")}
                name='price'
              />
            </Box>
            <Box>
              <Textfield
                label={i18n.t("modules.admin.submitBook.resume")}
                name='resume'
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

    </Container>
  );
};

export default SubmitBook;
