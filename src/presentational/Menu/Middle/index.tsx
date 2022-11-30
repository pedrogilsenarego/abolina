import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import Button from "./Button";
import { ROUTE_PATHS } from "../../../constants/routes";

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const Middle = ({ setOpenDrawer }: Props) => {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))
  return (
    <>
      <Grid
        container
        rowSpacing={3}
        flexDirection={mobile ? "column" : "row"}
        justifyContent={mobile ? "center" : "space-between"}
        alignItems='center'
        style={{ width: "300px" }}
      >
        <Grid item>
          <Button
            title={i18n.t("menuBar.home")}
            path={ROUTE_PATHS.HOME}
            setOpenDrawer={setOpenDrawer}
          />
        </Grid>
        <Grid item>
          <Button
            title={i18n.t("menuBar.books")}
            path={ROUTE_PATHS.BOOKS}
            setOpenDrawer={setOpenDrawer}
          />
        </Grid>
        <Grid item>
          <Button
            title={i18n.t("menuBar.about")}
            path={ROUTE_PATHS.ABOUT}
            setOpenDrawer={setOpenDrawer}
          />
        </Grid>
        <Grid item>
          <Button
            title={i18n.t("menuBar.contacts")}
            path={ROUTE_PATHS.CONTACTS}
            setOpenDrawer={setOpenDrawer}
          />
        </Grid>


      </Grid>
    </>
  );
};
export default Middle;
