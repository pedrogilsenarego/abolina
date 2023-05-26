import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Colors } from "../../constants/pallette";
import Button from "../../components/Button";
import { i18n } from "../../translations/i18n";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { setCookiePolicy } from "../../slicer/general/general.actions";
import { ROUTE_PATHS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import DrawerMine from "../../components/Drawer";
import { Title } from "../../styles";

const CookiePolicy = () => {
  const [cookiePolicyClick, setCookiePolicyClick] = useState<boolean>(false);
  const cookiePolicySignal = useSelector<State, boolean>(
    (state) => state?.general?.cookiePolicy
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DrawerMine
      position='left'
      openDrawer={cookiePolicySignal}
      fullHeight
      backgroundColor='#f6f7f8;'
      width="30vw"
      borderRadius="none"
    >
      <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
        <Title>
          {i18n.t("cookiePolicy.title")}
        </Title>
        <Typography style={{ fontSize: mobile ? "0.6rem" : "1.2rem" }}>
          {i18n.t("cookiePolicy.mainText")}
          <b
            onClick={() => navigate(ROUTE_PATHS.PRIVACY_POLICY)}
            onMouseEnter={() => setCookiePolicyClick(true)}
            onMouseLeave={() => setCookiePolicyClick(false)}
            style={{
              cursor: "pointer",
              color: cookiePolicyClick ? Colors.tealcTransparent : Colors.tealc,
            }}
          >
            {i18n.t("cookiePolicy.cookiePolicy")}
          </b>
          {i18n.t("cookiePolicy.secondText")}
        </Typography>

        <Button
          onClick={() => dispatch(setCookiePolicy(false))}
          label={i18n.t("cookiePolicy.acceptTerms")}
        />
      </div>
    </DrawerMine>
  );
};

export default CookiePolicy;
