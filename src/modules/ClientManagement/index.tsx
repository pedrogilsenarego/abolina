import { Card, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { i18n } from "../../translations/i18n";

import { Colors } from "../../constants/pallette";
import { useState } from "react";
import GeneralData from "./GeneralData";
import InvoiceData from "./InvoiceData";
import CouponsAvailable from "./CouponsAvailable";



const ClientManagement = () => {
  const [mode, setMode] = useState<"invoiceData" | "generalData" | "couponsAvailable">("generalData");
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  const renderMode = () => {
    switch (mode) {
      case "generalData": return <GeneralData />
      case "invoiceData": return <InvoiceData />
      case "couponsAvailable": return <CouponsAvailable />
      default: return <GeneralData />
    }
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
          }}
        >
          {i18n.t("modules.clientManagement.title")}
        </Typography>
        <div style={{ display: "flex", columnGap: "20px", width: "100%" }}>
          <Card style={{ width: "30%", padding: "30px" }}>
            <Typography onClick={() => setMode("generalData")} style={{ cursor: "pointer", textAlign: "left", fontWeight: mode === "generalData" ? 800 : 500 }}>{i18n.t("modules.clientManagement.generalSettings")}</Typography>
            <Typography onClick={() => setMode("invoiceData")} style={{ cursor: "pointer", textAlign: "left", fontWeight: mode === "invoiceData" ? 800 : 500 }}>{i18n.t("modules.clientManagement.invoiceSettings")}</Typography>
            <Typography onClick={() => setMode("couponsAvailable")} style={{ cursor: "pointer", textAlign: "left", fontWeight: mode === "couponsAvailable" ? 800 : 500 }}>{i18n.t("modules.clientManagement.couponsSettings")}</Typography>
          </Card>
          <Card style={{ width: "70%", padding: "30px", justifyContent: "center", display: "flex" }}>
            <div style={{ width: mobile ? "90vw" : "450px", }}>
              {renderMode()}
            </div>
          </Card>
        </div>


      </div>
    </Container>
  );
};

export default ClientManagement;
