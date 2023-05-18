import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { Box, Divider, Grid } from "@mui/material";
import Textfield from "../../../../components/Inputs/TextFieldForm";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../../components/Buttons/ButtonFormik";
import { useDispatch, useSelector } from "react-redux";
import {

  addCollection,
  editBook,
  editCollection,

} from "../../../../slicer/books/books.actions";
import { useQuery } from "react-query";
import { State } from "../../../../slicer/types";
import Loader from "../../../../components/Loader";
import { useEffect, useMemo, useState } from "react";
import { disableLoading } from "../../../../slicer/general/general.actions";
import { mapInitialForm } from "./mapper";
import { useNavigate, useParams } from "react-router";
import { fetchCollection } from "../../../../services/admin/adminServices";
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

  const [edited, setEdited] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector<State, boolean>((state) => state.general.loading);
  const progress = useSelector<State, number>((state) => state.books.progress);

  const {
    isLoading: loadingBook,
    error: errorBook,
    data: bookData,
  } = useQuery<[string, string]>(["collection", documentID], fetchCollection, {
    enabled: edit && !!documentID,
  });



  const initialValues = useMemo(() => {
    if (edit && bookData) {
      return mapInitialForm(bookData);
    } else {
      return {
        title: "",
        titleEN: "",
        resume: "",
        resumeEN: "",

        caracteristics: [],

      };
    }
  }, [edit, bookData]);

  useEffect(() => {
    if (!loading && edit && edited) navigate(ROUTE_PATHS.ADMIN_COLLECTION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);



  useEffect(() => {
    dispatch(disableLoading());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: any) => {
    if (edit) {
      const payload = {
        values: getObjectDifferences(initialValues, { ...values }),
        documentID: documentID,

      };
      console.log(payload)
      dispatch(editCollection(payload));
      setEdited(true)
    } else dispatch(addCollection({ ...values }));
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
                    <Box style={{ width: "350px" }}>
                      <MultiSelectInput
                        disableDefaultLabel
                        multiple
                        defaultValue={initialValues.caracteristics}
                        chips
                        label="Caracteristics"
                        items={caracteristics}
                        name="caracteristics"
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
