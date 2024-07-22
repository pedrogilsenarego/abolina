import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";

import { Colors } from "../../../constants/pallette";

import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";
import Left from "./Left";
import Middle from "./Middle";
import MobileMainDrawer from "./MobileMainDrawer";
import Right from "./Right";

const Menu = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const Theme = useTheme();

  const mobile = useMediaQuery(Theme.breakpoints.down("md"));
  const navigate = useNavigate();

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

  const mobileRender = () => {
    return (
      <Box
        sx={{
          backgroundColor: Colors.tealc,
          boxShadow: `0px 5px 14px #00000033`,
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
                  size="1.5em"
                  color="white"
                  onClick={() => setOpenDrawer(!openDrawer)}
                />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Left height="auto" />
            </Grid>
            <Grid
              item
              xs={2}
              textAlign="right"
              onClick={() => navigate(ROUTE_PATHS.CART)}
            >
              <Box display="flex" justifyContent="end">
                <FiShoppingCart size="1.5rem" color="white" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  return (
    <>
      {mobile ? mobileRender() : laptopRender()}
      {mobile && (
        <MobileMainDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
        />
      )}
    </>
  );
};

export default Menu;
