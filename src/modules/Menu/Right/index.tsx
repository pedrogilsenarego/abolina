import { Avatar, Box, Grid, Typography } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
import { Colors } from "../../../constants/pallette";

const Right = () => {
  return (
    <Grid container>
      <Grid item>
        <Box style={{ borderRight: "solid 2px", paddingRight: "10px", borderColor: "white" }}>
          <Avatar style={{ backgroundColor: "white" }}><InstagramIcon style={{ color: Colors.tealc }} /></Avatar>
        </Box>
      </Grid>
      <Grid>
        <Box style={{ paddingLeft: "10px", borderColor: "white" }}>
          <Typography color="white">PT</Typography>
          <Typography color="white">EN</Typography>
        </Box>
      </Grid>
    </Grid>

  )
}

export default Right