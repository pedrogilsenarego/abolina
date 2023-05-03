import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { Box, Divider, Grid } from "@mui/material";
import Textfield from "../../../../components/Inputs/TextFieldForm";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../../components/Buttons/ButtonFormik";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateProgress } from "../../../../slicer/books/books.actions";
import FileUploader from "../../../../components/Inputs/FileUploader";

import { useQuery } from "react-query";
import { fetchCollections } from "../../../../services/adminServices";
import SelectWithPlus from "../../../../groupComponents/SelectWithPlus";
import { State } from "../../../../slicer/types";
import Loader from "../../../../components/Loader";
import { useEffect } from "react";
import { disableLoading } from "../../../../slicer/general/general.actions";
import { mapInitialForm } from "../mapper";
import { useParams } from "react-router";
import { fetchBook } from "../../../../services/adminServices";

interface Props {
  edit?: boolean
}

const SubmitBook = ({ edit = false }: Props) => {
  const { id } = useParams<Record<string, string | undefined>>();
  const documentID = id || "";

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
    refetch
  } = useQuery("collections", fetchCollections, {
    staleTime: 3600000, // 1 hour in milliseconds
    cacheTime: 3600000, // 10 minutes in milliseconds
  });

  const INITIAL_FORM_STATE = edit ? mapInitialForm(bookData) :
    {
      title: "",
      titleEN: "",
      collections: "",
      number: 0,
      author: "",
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
    }

  useEffect(() => {
    dispatch(disableLoading())
    dispatch(updateProgress(0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch();
  const loading = useSelector<State, boolean>((state) => state.general.loading);
  const progress = useSelector<State, number>((state) => state.books.progress);
  const handleSubmit = (values: any) => {

    dispatch(addBook({ ...values }));
  };

  return (
    <>
      <Title fontSize='16px'>
        {i18n.t("modules.admin.manageBooks.submitBook.breadCrumbs")}
      </Title>
      <Divider />

      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          {loading || loadingBook ? (
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
                customMessage={edit ? "fetching the book for edition" : 'Your Data is being send'}
                progress={edit ? undefined : progress}
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
                        label={i18n.t("modules.admin.manageBooks.submitBook.title")}
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

                  <Grid item xs={6}>
                    <Box style={{ width: "350px" }}>
                      <SelectWithPlus loading={loadingCollections} options={collectionsData} refetch={refetch} />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box style={{ width: "350px" }}>
                      <Textfield
                        label="Number of Book"
                        name='number'
                      />  </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.author"
                        )}
                        name='author'
                      />
                      <Box>
                        <Textfield
                          label={i18n.t(
                            "modules.admin.manageBooks.submitBook.authorResume"
                          )}
                          name='authorResume'
                          multiline
                          rows={6}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.designer"
                        )}
                        name='designer'
                      />
                    </Box>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.designerResume"
                        )}
                        name='designerResume'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.translator"
                        )}
                        name='translator'
                      />
                    </Box>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.translatorResume"
                        )}
                        name='translatorResume'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={`${i18n.t(
                          "modules.admin.manageBooks.submitBook.authorResume"
                        )} EN`}
                        name='authorResumeEN'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={`${i18n.t(
                          "modules.admin.manageBooks.submitBook.designerResume"
                        )} EN`}
                        name='designerResumeEN'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <Textfield
                        label={`${i18n.t(
                          "modules.admin.manageBooks.submitBook.translatorResume"
                        )} EN`}
                        name='trasnlatorResumeEN'
                        multiline
                        rows={6}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.language"
                        )}
                        name='language'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <Textfield
                        label={i18n.t(
                          "modules.admin.manageBooks.submitBook.weight"
                        )}
                        name='weight'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <Textfield
                        label={i18n.t("modules.admin.manageBooks.submitBook.size")}
                        name='size'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <Textfield
                        label={i18n.t("modules.admin.manageBooks.submitBook.price")}
                        name='price'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <Textfield
                        label={i18n.t("modules.admin.manageBooks.submitBook.pages")}
                        name='pages'
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
                  <Grid item xs={6}>
                    <FileUploader
                      name='coverPage2'
                      fieldTitle={i18n.t(
                        "modules.admin.manageBooks.submitBook.coverPage"
                      )}
                      acceptType='image/webp'
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FileUploader
                      name='content'
                      multiple
                      fieldTitle={i18n.t(
                        "modules.admin.manageBooks.submitBook.content"
                      )}
                      acceptType='webp'
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box display='flex' justifyContent='start' sx={{ mt: "20px" }}>
                <ButtonForm label={i18n.t("modules.home.contacts.form.send")} />
              </Box></>)}
        </Form>
      </Formik>
    </>
  );
};

export default SubmitBook;
