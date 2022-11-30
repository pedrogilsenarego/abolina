import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Colors } from "../../../constants/pallette";
import { i18n } from "../../../translations/i18n";
import InstaAvatar from "../../../components/InstaAvatar";

const Right = () => {

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    window.location.reload();
  }

  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  return (
    <Grid container justifyContent={mobile ? "center" : "start"}>
      {!mobile && <Grid item>
        <Box style={{ borderRight: "solid 2px", paddingRight: "10px", borderColor: "white" }}>
          <InstaAvatar backgroundColor="white" color={Colors.tealc} />
        </Box>
      </Grid>}
      <Grid>
        <Box style={{ paddingLeft: "10px", borderColor: "white" }}>
          <Typography fontSize={mobile ? "24px" : "auto"} color="white" onClick={() => changeLanguage('pt')} style={{ cursor: "pointer" }}>PT</Typography>
          <Typography fontSize={mobile ? "24px" : "auto"} color="white" onClick={() => changeLanguage('en')} style={{ cursor: "pointer" }}>EN</Typography>
        </Box>
      </Grid>
    </Grid>

  )
}

export default Right