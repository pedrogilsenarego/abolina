import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import InstaAvatar from "../../../components/InstaAvatar";
import useChangeLang from "../../../hooks/usechangeLang";
import { LANG } from "../../../constants/lang";

const Right = () => {

  const { changeLanguage } = useChangeLang()


  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  return (
    <Grid container alignItems="center" justifyContent={mobile ? "center" : "start"}>
      {!mobile && (
        <Grid item>
          <Box
            style={{
              borderRight: "solid 2px #ffffffB3",
              paddingRight: "10px",

            }}
          >
            <InstaAvatar size="1em" backgroundColor='white' color={Colors.tealc} />
          </Box>
        </Grid>
      )}
      <Grid item>
        <Box style={{ paddingLeft: "10px" }}>
          <Typography
            fontSize={mobile ? "24px" : "12px"}
            color='white'
            fontWeight={800}
            onClick={() => {
              changeLanguage(LANG.pt);

            }}
            style={{ cursor: "pointer" }}
          >
            PT
          </Typography>
          <Typography
            fontSize={mobile ? "24px" : "12px"}
            color='white'
            fontWeight={800}
            onClick={() => {
              changeLanguage(LANG.en);
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
