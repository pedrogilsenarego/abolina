import { Divider, Grid, Typography, Paper, Box, Card } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addNewCarroussell,
  fetchCarroussell,
} from "../../../slicer/books/books.actions";
import useManageCarroussel from "./useManageCarroussel";
import Button from "../../../components/Buttons/Button";
import FileUploader from "../../../components/Inputs/FileUploader";
import { Formik, Form } from "formik";
import { FORM_VALIDATION } from "./validation";
import ButtonForm from "../../../components/Buttons/ButtonFormik";

const ManageCarrousell = () => {
  const dispatch = useDispatch();

  const INITIAL_FORM_STATE = {
    newImage: "",
  };

  const { handleDragEnter, dragging, list, handleDragStart, handleSubmit } =
    useManageCarroussel();

  useEffect(() => {
    dispatch(fetchCarroussell());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewImage = (values) => {
    const newValues = { ...values, list };
    dispatch(addNewCarroussell(newValues));
    // setList([...list], list[0].data.push() );
  };

  return (
    <>
      <GStyled.Title fontSize='16px'>
        {i18n.t("modules.admin.manageCarroussell.submitTitle")}
      </GStyled.Title>
      <Divider />
      <Card style={{ padding: "20px", marginTop: "60px" }}>
        <Grid container rowSpacing={2}>
          {list?.map((grp, grpI) => (
            <Grid item xs={12}>
              <Paper
                style={{
                  marginTop: "5px",
                  minHeight: grpI === 0 ? "200px" : "100px",
                }}
              >
                <Typography>{grp?.title}</Typography>
                <Box
                  key={grpI}
                  onDragEnter={
                    dragging && !grp?.data?.length
                      ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                      : null
                  }
                >
                  <Grid container>
                    <Grid xs={12} style={{ display: "flex" }}>
                      {grp?.data?.map((item, itemI) => (
                        <Box
                          onDragStart={(e) => {
                            handleDragStart(e, { grpI, itemI });
                          }}
                          onDragEnter={
                            dragging
                              ? (e) => handleDragEnter(e, { grpI, itemI })
                              : null
                          }
                          key={itemI}
                          style={{
                            cursor: "pointer",
                            maxWidth: "100px",
                            margin: "5px",
                            padding: "0px",
                            borderRadius: "8px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            draggable={itemI === 0 && grpI === 1 ? false : true}
                            src={item}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              padding: "5px",
                            }}
                            alt=''
                          />
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box
          display='flex'
          justifyContent='start'
          style={{ marginTop: "30px" }}
        >
          <Button label='Submit' onClick={handleSubmit} />
        </Box>
      </Card>

      <Paper
        style={{
          padding: "15px",
          borderRadius: "6px",
          marginTop: "50px",
        }}
      >
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          onSubmit={(values) => {
            handleNewImage(values);
          }}
          validationSchema={FORM_VALIDATION}
        >
          <Form>
            <FileUploader
              fieldTitle='New image'
              name='newImage'
              multiple
              acceptType='image/jpeg,image/jpg'
            />
            <Box display='flex' justifyContent='start' sx={{ mt: "20px" }}>
              <ButtonForm label={i18n.t("modules.home.contacts.form.send")} />
            </Box>
          </Form>
        </Formik>
      </Paper>
    </>
  );
};

export default ManageCarrousell;
