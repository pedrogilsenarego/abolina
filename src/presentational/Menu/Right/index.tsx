import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import { i18n } from "../../../translations/i18n";
import InstaAvatar from "../../../components/InstaAvatar";
import { useDispatch } from "react-redux";
import { updateLang } from "../../../slicer/general/general.actions";

const Right = () => {
  const changeLanguage = (lng: string) => {
    dispatch(updateLang(lng.toUpperCase()));
    i18n.changeLanguage(lng);
    setTimeout(() => { window.location.reload(); }, 200)

  };

  const dispatch = useDispatch();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <Grid container justifyContent={mobile ? "center" : "start"}>
      {!mobile && (
        <Grid item>
          <Box
            style={{
              borderRight: "solid 2px",
              paddingRight: "10px",
              borderColor: "white",
            }}
          >
            <InstaAvatar size="1.5em" backgroundColor='white' color={Colors.tealc} />
          </Box>
        </Grid>
      )}
      <Grid>
        <Box style={{ paddingLeft: "10px", borderColor: "white" }}>
          <Typography
            fontSize={mobile ? "24px" : "auto"}
            color='white'
            onClick={() => {
              changeLanguage("pt");

            }}
            style={{ cursor: "pointer" }}
          >
            PT
          </Typography>
          <Typography
            fontSize={mobile ? "24px" : "auto"}
            color='white'
            onClick={() => {
              changeLanguage("en");
            }}
            style={{ cursor: "pointer" }}
          >
            EN
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Right;
