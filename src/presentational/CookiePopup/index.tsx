import { Typography, useMediaQuery, useTheme } from "@mui/material";
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
      position={mobile ? "bottom" : "left"}
      openDrawer={cookiePolicySignal}
      fullHeight={!mobile}
      backgroundColor="#f6f7f8;"
      width={mobile ? "100%" : "30vw"}
      borderRadius="none"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          alignItems: "start",
          padding: "0px 20px",
        }}
      >
        <Title style={{ fontWeight: "bold" }}>
          {i18n.t("cookiePolicy.title")}
        </Title>
        <Typography
          style={{
            fontSize: mobile ? "0.6rem" : "1.2rem",
            textAlign: "left",
          }}
        >
          Este website utiliza cookies que permitem personalizar a sua
          experiência. Pode obter mais informação sobre os cookies utilizados e
          como geri‑los consulte a área{" "}
          <b
            onClick={() => navigate(ROUTE_PATHS.POLICIES)}
            onMouseEnter={() => setCookiePolicyClick(true)}
            onMouseLeave={() => setCookiePolicyClick(false)}
            style={{
              cursor: "pointer",
              color: cookiePolicyClick ? Colors.tealcTransparent : Colors.tealc,
            }}
          >
            Política de Privacidade
          </b>
          .
        </Typography>
        <Typography
          style={{
            fontSize: mobile ? "0.6rem" : "1.2rem",
            textAlign: "left",
          }}
        >
          Apenas cookies estritamente necessários para o correto funcionamento
          do website são guardados. Sem a presença destes cookies não é possível
          navegar corretamente nem aceder a áreas seguras. Estes cookies só
          podem ser desabilitados alterando as preferências do seu navegador.
        </Typography>
        <b
          onClick={() => navigate(ROUTE_PATHS.POLICIES)}
          onMouseEnter={() => setCookiePolicyClick(true)}
          onMouseLeave={() => setCookiePolicyClick(false)}
          style={{
            fontSize: mobile ? "0.6rem" : "1.2rem",
            cursor: "pointer",
            color: cookiePolicyClick ? Colors.tealcTransparent : Colors.tealc,
          }}
        >
          Autentificação
        </b>
        <Typography
          style={{
            fontSize: mobile ? "0.6rem" : "1.2rem",
            textAlign: "left",
          }}
        >
          Existem ainda cookies essenciais ligados a utilizadores que utilizem a
          autentificação, sem os mesmos não é possível a mesma, ao utílizar o
          nosso serviço de autentificação está a aceitar os mesmos.
        </Typography>
        <div style={{ marginTop: "20px", width: "100%" }}>
          <Button
            fullWidth
            onClick={() => dispatch(setCookiePolicy(false))}
            label={i18n.t("cookiePolicy.acceptTerms")}
          />
        </div>
      </div>
    </DrawerMine>
  );
};

export default CookiePolicy;
