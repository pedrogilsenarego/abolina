import { Avatar, Box, Grid, Typography } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
import { Colors } from "../../../constants/pallette";
import { i18n } from "../../../translations/i18n";

const Right = () => {

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  return (
    <Grid container>
      <Grid item>
        <Box style={{ borderRight: "solid 2px", paddingRight: "10px", borderColor: "white" }}>
          <Avatar style={{ backgroundColor: "white" }}><InstagramIcon style={{ color: Colors.tealc }} /></Avatar>
        </Box>
      </Grid>
      <Grid>
        <Box style={{ paddingLeft: "10px", borderColor: "white" }}>
          <Typography color="white" onClick={() => changeLanguage('pt')} style={{ cursor: "pointer" }}>PT</Typography>
          <Typography color="white" onClick={() => changeLanguage('en')} style={{ cursor: "pointer" }}>EN</Typography>
        </Box>
      </Grid>
    </Grid>

  )
}

export default Right