import { Grid } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import Button from "./Button";
import { ROUTE_PATHS } from "../../../constants/routes";

const Middle = () => {
  return (
    <>
      <Grid container justifyContent="space-between" style={{ width: "300px" }}>
        <Grid item><Button title={i18n.t('menuBar.home')} path={ROUTE_PATHS.HOME} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.books')} path={ROUTE_PATHS.BOOKS} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.about')} path={ROUTE_PATHS.HOME} /></Grid>
        <Grid item><Button title={i18n.t('menuBar.contacts')} path={ROUTE_PATHS.HOME} /></Grid>
      </Grid>
    </>
  );
};
export default Middle;
