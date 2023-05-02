import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import useChangeLang from "../../../../hooks/usechangeLang";
import { LANG } from "../../../../constants/lang";
import { State } from "../../../../slicer/types";
import { CurrentUser } from "../../../../slicer/user/user.types";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../../../../constants/routes";
import { useNavigate } from "react-router";
import { CartProduct } from "../../../../slicer/cart/cart.types";
import { Colors } from "../../../../constants/pallette";
import BasicPopover from "../../../../components/Popover";
import { useState } from "react";
import UserPopoverContent from "./UserPopoverContent";

const Right = () => {
  const { changeLanguage } = useChangeLang();

  const navigate = useNavigate();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state?.user?.currentUser
  );
  const cart = useSelector<State, CartProduct[]>(
    (state) => state?.cart.cartItems
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickPopover = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);

  function getCartTotal() {
    let total = 0;

    for (const item of cart) {
      total += item.value;
    }

    return total;
  }

  const handleUser = (e: any) => {
    if (!currentUser) navigate(ROUTE_PATHS.LOGIN)
    else handleClickPopover(e)
  }



  return (
    <>
      <Grid

        container
        alignItems='center'
        justifyContent={mobile ? "center" : "start"}
        columnGap={1.5}
      >
        {!mobile && (
          <>
            <Grid
              item
              style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <BiUser size='1.5rem' color='white' onMouseEnter={(e: any) => handleUser(e)} />
            </Grid>
            <Grid
              onClick={() => navigate(ROUTE_PATHS.CART)}
              item
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <FiShoppingCart size='1.5rem' color='white' />
              {cart.length !== 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    height: "17px",
                    aspectRatio: 1,
                    borderRadius: "50%",
                    backgroundColor: Colors.tealc,
                    border: "solid 1px white",
                  }}
                >
                  <Typography
                    style={{ color: "white", fontSize: "12px", fontWeight: 800 }}
                  >
                    {getCartTotal()}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid
              item
              style={{
                height: "30px",
                width: "1px",
                backgroundColor: "#ffffff66",
              }}
            ></Grid>
          </>
        )}
        <Grid item>
          <Box>
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
      <BasicPopover isOpen={isOpen} anchorEl={anchorEl} onClose={handleClose} >
        <UserPopoverContent handleClose={handleClose} />
      </BasicPopover>
    </>
  );
};

export default Right;
