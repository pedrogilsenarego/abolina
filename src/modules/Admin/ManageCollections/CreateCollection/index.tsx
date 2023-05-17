import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { Box, Divider, Grid } from "@mui/material";
import Textfield from "../../../../components/Inputs/TextFieldForm";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../../components/Buttons/ButtonFormik";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  editBook,
  updateProgress,
} from "../../../../slicer/books/books.actions";
import FileUploader from "../../../../components/Inputs/FileUploader";
import PreviewWrapper from "./PreviewWrapper";
import { useQuery } from "react-query";
import { fetchCollections } from "../../../../services/admin/adminServices";
import SelectWithPlus from "../../../../groupComponents/SelectWithPlus";
import { State } from "../../../../slicer/types";
import Loader from "../../../../components/Loader";
import { useEffect, useMemo, useState } from "react";
import { disableLoading } from "../../../../slicer/general/general.actions";
import { mapInitialForm } from "./mapper";
import { useNavigate, useParams } from "react-router";
import { fetchBook } from "../../../../services/admin/adminServices";
import { ROUTE_PATHS } from "../../../../constants/routes";
import { getObjectDifferences } from "../../../../utils/compareObjects";
import MultiSelectInput from "../../../../components/Inputs/MultiSelect/MultiSelectInput";
import { caracteristics } from "../../../../constants/admin";

interface Props {
  edit?: boolean;
}

const CreateCollection = ({ edit = false }: Props) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const documentID = id || "";
  const [contentLoader, setContentLoader] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [contentValue, setContentValue] = useState<any>(undefined);
  const [coverPageLoader, setCoverPageLoader] = useState<boolean>(false);
  const [coverPageValue, setCoverPageValue] = useState<any>(undefined);
  const [touchedContent, setTouchedContent] = useState<boolean>(false);
  const [touchedCoverPage, setTouchedCoverPage] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector<State, boolean>((state) => state.general.loading);
  const progress = useSelector<State, number>((state) => state.books.progress);

  const {
    isLoading: loadingBook,
    error: errorBook,
    data: bookData,
  } = useQuery<[string, string]>(["book", documentID], fetchBook, {
    enabled: edit && !!documentID,
  });

  const {
    isLoading: loadingCollections,
    error,
    data: collectionsData,
    refetch,
  } = useQuery("collections", fetchCollections, {
    // staleTime: 3600000, // 1 hour in milliseconds
    // cacheTime: 3600000, // 10 minutes in milliseconds
  });

  const initialValues = useMemo(() => {
    if (edit && bookData) {
      return mapInitialForm(bookData);
    } else {
      return {
        title: "",
        titleEN: "",
        collections: "",
        number: 0,
        author: "",
        caracteristics: [],
        authorResume: "",
        authorResumeEN: "",
        designer: "",
        designerResume: "",
        designerResumeEN: "",
        translator: "",
        translatorResume: "",
        translatorResumeEN: "",
        language: "",
        weight: "",
        size: "",
        resume: "",
        resumeEN: "",
        price: null,
        coverPage2: undefined,
        content: [],
        pages: null,
      };
    }
  }, [edit, bookData]);

  const handleConvertStringIntoFile = async (
    images: string[],
    setLoader: (signal: boolean) => void,
    setValue: (value: any) => void
  ) => {
    setLoader(true);
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();

    // Function to convert base64 string to a file
    const base64StringToFile = async (
      base64String: string,
      filename: string
    ): Promise<File> => {
      const response = await fetch(base64String);
      const data = await response.blob();
      return new File([data], filename, { type: "image/webp" });
    };

    // Iterate through the images array and add each file to the DataTransfer object
    for (let i = 0; i < images.length; i++) {
      const file = await base64StringToFile(images[i], `image${i}.webp`); // You can replace the filename with any naming scheme you prefer
      dataTransfer.items.add(file);
    }
    setValue(dataTransfer.files);
    setLoader(false);
  };

  useEffect(() => {
    if (!loading && edit && edited) navigate(ROUTE_PATHS.ADMIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (!loadingBook && edit) {
      if (initialValues.content.length > 0)
        handleConvertStringIntoFile(
          initialValues.content,
          setContentLoader,
          setContentValue
        );
      if (initialValues.coverPage2.length > 0)
        handleConvertStringIntoFile(
          initialValues.coverPage2,
          setCoverPageLoader,
          setCoverPageValue
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingBook, initialValues.content, initialValues.coverPage2]);

  useEffect(() => {
    dispatch(disableLoading());
    dispatch(updateProgress(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: any) => {
    if (edit) {
      if (
        !touchedContent &&
        !touchedCoverPage &&
        initialValues.title === values.title
      ) {
        delete values.content;
        delete values.coverPage2;
      }

      const payload = {
        values: getObjectDifferences(initialValues, { ...values }),
        documentID: documentID,
        title: initialValues.title,
      };
      console.log(payload)
      dispatch(editBook(payload));
      setEdited(true)
    } else dispatch(addBook({ ...values }));
  };

  if (edit && loadingBook) {
    return (
      <Box
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader
          size={200}
          color='darkGrey'
          customMessage='fetching the book for edition'
        />
      </Box>
    );
  }

  return (
    <>
      <Title fontSize='16px'>
        Manage Collections - Submit Collection
      </Title>
      <Divider />

      <Formik
        initialValues={{ ...initialValues }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          {loading ? (
            <Box
              style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader
                size={200}
                color='darkGrey'
                customMessage='Your Data is being send'
                progress={progress}
              />
            </Box>
          ) : (
            <>
              <Box
                rowGap={2}
                display='flex'
                flexDirection='column'
                sx={{ mt: "20px" }}
              >
                <Grid container columnSpacing={2} rowSpacing={6}>
                  <Grid item xs={6}>
                    <Box style={{ width: "350px" }}>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.title"
                        )}
                        name='title'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box style={{ width: "350px" }}>
                      <Textfield
                        label={`${i18n.t(
                          "modules.admin.manageBooks.submitBook.title"
                        )} EN`}
                        name='titleEN'
                      />
                    </Box>
                  </Grid>





                  <Grid item xs={12}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.resume"
                        )}
                        name='resume'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box>
                      <Textfield
                        label={`${i18n.t(
                          "modules.admin.manageBooks.submitBook.resume"
                        )} EN`}
                        name='resumeEN'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box
                display='flex'
                justifyContent='start'
                sx={{ mt: "20px", columnGap: "10px" }}
              >
                <PreviewWrapper />
                <ButtonForm label={i18n.t("modules.home.contacts.form.send")} />
              </Box>
            </>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default CreateCollection;
