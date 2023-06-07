import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { i18n } from "../../../../translations/i18n";
import Button from "./Button";
import { ROUTE_PATHS } from "../../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { scrollToContacts } from "../../../../slicer/general/general.actions";
import { useNavigate, useLocation } from "react-router";
import { State } from "../../../../slicer/types";
import { BiHomeAlt, BiSmile, BiUser, BiWorld } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Languages } from "../../../../constants/lang";
import useChangeLang from "../../../../hooks/usechangeLang";
import { CurrentUser } from "../../../../slicer/user/user.types";
import { signOutUserStart } from "../../../../slicer/user/user.actions";

interface Props {
  setOpenDrawer: (openDrawer: boolean) => void;
}

const Middle = ({ setOpenDrawer }: Props) => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const [openMyAccountSubMenu, setOpenMyAccountSubMenu] =
    useState<boolean>(false);
  const [openMyLanguageSubMenu, setOpenMyLanguageSubMenu] =
    useState<boolean>(false);

  const { changeLanguage } = useChangeLang();

  const handleContacts = () => {
    if (loc.pathname !== ROUTE_PATHS.HOME) {
      navigate(ROUTE_PATHS.HOME);
      setOpenDrawer(false);
    } else setOpenDrawer(false);
    dispatch(scrollToContacts(true));
  };

  return (
    <>
      <Grid
        container
        rowSpacing={mobile ? 1 : 3}
        columnGap={vertical ? "0px" : "26px"}
        flexDirection={mobile ? "column" : "row"}
        justifyContent={mobile ? "start" : "space-between"}
        alignItems={mobile ? "start" : "center"}
        style={{ paddingTop: mobile ? "80px" : "8px" }}
      >
        <Grid item style={{ width: vertical ? "100%" : "auto" }}>
          <Button
            selected={loc.pathname === ROUTE_PATHS.HOME}
            title={i18n.t("menuBar.home")}
            path={ROUTE_PATHS.HOME}
            setOpenDrawer={setOpenDrawer}
            icon={
              vertical ? (
                <BiHomeAlt
                  size='1.5rem'
                  color={
                    loc.pathname === ROUTE_PATHS.HOME ? "whiteSmoke" : "black"
                  }
                />
              ) : null
            }
          />
        </Grid>
        <Grid item style={{ width: vertical ? "100%" : "auto" }}>
          <Button
            selected={loc.pathname === ROUTE_PATHS.BOOKS}
            title={i18n.t("menuBar.books")}
            path={ROUTE_PATHS.BOOKS}
            setOpenDrawer={setOpenDrawer}
            icon={
              vertical ? (
                <BsBook
                  size='1.5rem'
                  color={
                    loc.pathname === ROUTE_PATHS.BOOKS ? "whiteSmoke" : "black"
                  }
                />
              ) : null
            }
          />
        </Grid>
        <Grid item style={{ width: vertical ? "100%" : "auto" }}>
          <Button
            selected={loc.pathname === ROUTE_PATHS.ABOUT}
            title={i18n.t("menuBar.about")}
            path={ROUTE_PATHS.ABOUT}
            setOpenDrawer={setOpenDrawer}
            icon={
              vertical ? (
                <BiSmile
                  size='1.5rem'
                  color={
                    loc.pathname === ROUTE_PATHS.ABOUT ? "whiteSmoke" : "black"
                  }
                />
              ) : null
            }
          />
        </Grid>
        <Grid item style={{ width: vertical ? "100%" : "auto" }}>
          <Button
            title={i18n.t("menuBar.contacts")}
            onClick={handleContacts}
            setOpenDrawer={setOpenDrawer}
            icon={
              vertical ? <HiOutlineMail size='1.5rem' color='black' /> : null
            }
          />
        </Grid>
        {vertical && (
          <Grid
            item
            style={{
              width: vertical ? "100%" : "auto",
              display: "flex",
              alignItems: "center",
              columnGap: "20px",
              justifyContent: "space-between",
              paddingRight: "20px",
            }}
            onClick={() =>
              currentUser
                ? setOpenMyAccountSubMenu(!openMyAccountSubMenu)
                : navigate(ROUTE_PATHS.LOGIN)
            }
          >
            <Button
              title={
                currentUser
                  ? i18n.t("menuBar.account")
                  : i18n.t("menuBar.userPopover.login")
              }
              setOpenDrawer={setOpenDrawer}
              icon={vertical ? <BiUser size='1.5rem' color='black' /> : null}
            />
            {!openMyAccountSubMenu && currentUser ? (
              <RiArrowDownSLine size='1.5rem' />
            ) : currentUser ? (
              <RiArrowUpSLine size='1.5rem' />
            ) : null}
          </Grid>
        )}
        {vertical && openMyAccountSubMenu && (
          <Grid
            item
            style={{
              paddingLeft: "55px",
              boxShadow: "inset -2px 2px 7px rgba(0, 0, 0, 0.25)", // Adjust the values as needed
              paddingTop: "10px",
              paddingBottom: "10px",
              width: "100%",
            }}
          >
            <Typography
              onClick={() => {
                setOpenDrawer(false);
                navigate(ROUTE_PATHS.CLIENT_MANAGEMENT);
              }}
              style={{ fontSize: "20px" }}>
              {i18n.t("menuBar.userPopover.user")}
            </Typography>
            <Typography
              style={{ fontSize: "20px" }}
              onClick={() => {
                setOpenDrawer(false);
                dispatch(signOutUserStart());
              }}
            >
              {i18n.t("menuBar.userPopover.logout")}
            </Typography>
            {currentUser?.userRoles?.includes("admin") && (
              <Typography
                style={{ fontSize: "20px" }}
                onClick={() => navigate(ROUTE_PATHS.ADMIN)}
              >
                {i18n.t("menuBar.userPopover.admin")}
              </Typography>
            )}
          </Grid>
        )}
        {vertical && (
          <Grid item style={{ width: vertical ? "100%" : "auto" }}>
            <Button
              selected={loc.pathname === ROUTE_PATHS.CART}
              title={i18n.t("menuBar.cart")}
              path={ROUTE_PATHS.CART}
              setOpenDrawer={setOpenDrawer}
              icon={
                vertical ? (
                  <FiShoppingCart
                    size='1.5rem'
                    color={
                      loc.pathname === ROUTE_PATHS.CART ? "whiteSmoke" : "black"
                    }
                  />
                ) : null
              }
            />
          </Grid>
        )}

        {vertical && (
          <Grid
            item
            style={{
              width: vertical ? "100%" : "auto",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              alignItems: "center",
              columnGap: "20px",
            }}
            onClick={() => setOpenMyLanguageSubMenu(!openMyLanguageSubMenu)}
          >
            <Button
              title={i18n.t("menuBar.language")}
              setOpenDrawer={setOpenDrawer}
              icon={vertical ? <BiWorld size='1.5rem' color='black' /> : null}
            />
            {!openMyLanguageSubMenu ? (
              <RiArrowDownSLine size='1.5rem' />
            ) : (
              <RiArrowUpSLine size='1.5rem' />
            )}
          </Grid>
        )}
        {vertical && openMyLanguageSubMenu && (
          <Grid
            item
            style={{
              paddingLeft: "55px",
              boxShadow: "inset -2px 2px 7px rgba(0, 0, 0, 0.25)", // Adjust the values as needed
              paddingTop: "10px",
              paddingBottom: "10px",
              width: "100%",
            }}
          >
            {Languages.map((item, pos) => {
              return (
                <Typography
                  key={pos}
                  style={{ fontSize: "20px" }}
                  onClick={() => changeLanguage(item.value)}
                >
                  {item.title}
                </Typography>
              );
            })}
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default Middle;
