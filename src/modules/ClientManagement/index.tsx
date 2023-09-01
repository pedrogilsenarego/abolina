import {
  Card,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { i18n } from "../../translations/i18n";

import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BasicAccordeon from "../../components/BasicAccordeon";
import { Colors } from "../../constants/pallette";
import CouponsAvailable from "./CouponsAvailable";
import GeneralData from "./GeneralData";
import InvoiceData from "./InvoiceData";

const ClientManagement = () => {
  const [mode, setMode] = useState<
    "invoiceData" | "generalData" | "couponsAvailable"
  >("generalData");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  useEffect(() => {
    if (location.state) setMode(location.state);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMode = () => {
    switch (mode) {
      case "generalData":
        return <GeneralData />;
      case "invoiceData":
        return <InvoiceData />;
      case "couponsAvailable":
        return <CouponsAvailable />;
      default:
        return <GeneralData />;
    }
  };

  const renderLaptop = () => {
    return (
      <Container maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
            rowGap: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Typography
            style={{
              textTransform: "uppercase",
              fontSize: "28px",
              fontWeight: 800,
              color: Colors.tealc,
              textAlign: "start",
            }}
          >
            {i18n.t("modules.clientManagement.title")}
          </Typography>
          <div style={{ display: "flex", columnGap: "20px", width: "100%" }}>
            <div
              style={{
                width: "30%",
              }}
            >
              <Typography
                onClick={() => setMode("generalData")}
                style={{
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: mode === "generalData" ? 800 : 500,
                }}
              >
                {i18n.t("modules.clientManagement.generalSettings")}
              </Typography>
              <Typography
                onClick={() => setMode("invoiceData")}
                style={{
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: mode === "invoiceData" ? 800 : 500,
                }}
              >
                {i18n.t("modules.clientManagement.invoiceSettings")}
              </Typography>
              <Typography
                onClick={() => setMode("couponsAvailable")}
                style={{
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: mode === "couponsAvailable" ? 800 : 500,
                }}
              >
                {i18n.t("modules.clientManagement.couponsSettings")}
              </Typography>
            </div>
            <div
              style={{
                width: "70%",
                paddingLeft: "30px",
                paddingRight: "30px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <div style={{ width: mobile ? "90vw" : "450px" }}>
                {renderMode()}
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  };

  const renderMobile = () => {
    return (
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
      >
        <Typography
          style={{
            textTransform: "uppercase",
            fontSize: "28px",
            fontWeight: 800,
            color: Colors.tealc,
            textAlign: "start",
          }}
        >
          {i18n.t("modules.clientManagement.title")}
        </Typography>
        <BasicAccordeon
          title={i18n.t("modules.clientManagement.generalSettings")}
        >
          <GeneralData />
        </BasicAccordeon>
        <BasicAccordeon
          title={i18n.t("modules.clientManagement.invoiceSettings")}
        >
          <InvoiceData />
        </BasicAccordeon>
        <BasicAccordeon
          title={i18n.t("modules.clientManagement.couponsSettings")}
        >
          <CouponsAvailable />
        </BasicAccordeon>
      </Container>
    );
  };

  return mobile ? renderMobile() : renderLaptop();
};

export default ClientManagement;
