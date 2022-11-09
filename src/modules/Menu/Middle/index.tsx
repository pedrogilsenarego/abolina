import { Grid } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import Button from "./Button";

const Middle = () => {
  return (
    <>
      <Grid container justifyContent="space-between" style={{ width: "300px" }}>
        <Grid item><Button title={i18n.t('menuBar.home')} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.books')} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.about')} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.contacts')} /></Grid>
      </Grid>
    </>
  );
};
export default Middle;
