import { Box, Typography } from "@mui/material";
import { i18n } from "../../translations/i18n";

import { Colors } from "../../constants/pallette";
import { useState } from "react";



const ClientManagement = () => {
  const [mode, setMode] = useState<"enter" | "register" | "recoverPwd">("enter");

  return (
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
      <Box
        style={{ display: "flex", columnGap: "10px", justifyContent: "center" }}
      >
        <Typography
          onClick={() => setMode("enter")}
          style={{
            cursor: "pointer",
            fontWeight: 800,
            fontSize: "24px",
            color: mode === "enter" ? "black" : "#00000066",
          }}
        >
          {i18n.t("modules.login.startSession")}
        </Typography>
        <Box
          style={{ height: "30px", width: "1px", backgroundColor: "#00000066" }}
        />
        <Typography
          onClick={() => setMode("register")}
          style={{
            cursor: "pointer",
            fontWeight: 800,
            fontSize: "24px",
            color: mode === "register" ? "black" : "#00000066",
          }}
        >
          {i18n.t("modules.login.register")}
        </Typography>
      </Box>


    </div>
  );
};

export default ClientManagement;
