import { Box, Divider, Grid } from "@mui/material";
import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import { useParams } from "react-router";

import { fetchBook } from "../../../../services/adminServices";
import { useQuery } from "react-query";
import Loader from "../../../../components/Loader";
import { useMemo } from "react";
import { mapInitialForm } from "./mapper";
import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import { useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import ButtonForm from "../../../../components/Buttons/ButtonFormik";
import SelectWrapper from "../../../../components/Inputs/SelectFormValue";
import { newBookTypes2 } from "../../../../constants/admin";
import Textfield from "../../../../components/Inputs/TextFieldForm";

const Settings = () => {
  const { id } = useParams<Record<string, string | undefined>>();
  const documentID = id || "";
  const loading = useSelector<State, boolean>((state) => state.general.loading);
  const {
    isLoading: loadingBook,
    error: errorBook,
    data: bookData,
  } = useQuery<[string, string]>(["book", documentID], fetchBook, {
    enabled: !!documentID,
  });

  const initialValues = useMemo(() => {
    if (bookData) {
      return mapInitialForm(bookData);
    }
  }, [bookData]);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  console.log(initialValues);

  if (loadingBook) {
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
          customMessage='fetching the book for settings'
        />
      </Box>
    );
  }

  return (
    <>
      <Title fontSize='16px'>
        {i18n.t("modules.admin.manageBooks.settingsBook.breadCrumbs")}
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
                      <SelectWrapper
                        initialValue={initialValues?.newBook}
                        options={newBookTypes2}
                        label='New Book Status'
                        name='newBook'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box style={{ width: "350px" }}>
                      <Textfield
                        label="Discount"
                        name='discount'
                      />
                    </Box>
                  </Grid>
                  <Grid xs={12}>
                    <Box
                      display='flex'
                      justifyContent='start'
                      sx={{ mt: "20px", columnGap: "10px" }}
                    >
                      <ButtonForm label='Save Data' />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default Settings;
