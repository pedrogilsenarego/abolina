import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import { LANG } from "../../../constants/lang";
import { Colors } from "../../../constants/pallette";
import useChangeLang from "../../../hooks/usechangeLang";
import { State } from "../../../slicer/types";
import Left from "./Left";
import Middle from "./Middle";
import MobileMainDrawer from "./MobileMainDrawer";
import Right from "./Right";

const Menu = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const { changeLanguage } = useChangeLang();

  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const laptopRender = () => {
    return (
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: Colors.tealc,
          boxShadow: `0px 12px 18px #00000033`,
        }}
      >
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ height: "80px" }}
          >
            <Grid item>
              <Left />
            </Grid>
            <Grid item>
              <Middle setOpenDrawer={setOpenDrawer} />
            </Grid>
            <Grid item>
              <Right />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  const handleChangeLang = () => {
    if (lang === LANG.pt.toUpperCase()) {
      changeLanguage(LANG.en);
    } else changeLanguage(LANG.pt);
  };

  const mobileRender = () => {
    return (
      <Box
        sx={{
          backgroundColor: Colors.tealc,
          boxShadow: `0px 5px 5px #00000033`,
        }}
      >
        <Container>
          <Grid
            container
            columnSpacing={1}
            justifyContent="center"
            alignItems="center"
            style={{ height: "65px" }}
          >
            <Grid item xs={2}>
              <Box display="flex">
                <FiMenu
                  size="2em"
                  color="white"
                  onClick={() => setOpenDrawer(!openDrawer)}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Left height="auto" />
            </Grid>
            <Grid item xs={2} textAlign="right" onClick={handleChangeLang}>
              <Typography color="whitesmoke" fontSize="18px" fontWeight={700}>
                {lang}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  return (
    <>
      {mobile ? mobileRender() : laptopRender()}
      <MobileMainDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default Menu;
