import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { CgSmartphone } from "react-icons/cg";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Popup from "../../../../components/BasicPopup";
import Tooltip from "../../../../components/Tooltip/Tooltip";
import { Colors, Pallette } from "../../../../constants/pallette";
import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";

const ReadOnApp = () => {
  const [openReadPopup, setOpenReadPopup] = useState<boolean>(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const renderLaptop = () => {
    return (
      <Tooltip
        title={i18n.t("modules.cart.table.readOnAppTooltip")}
        placement="bottom"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setOpenReadPopup(true)}
        >
          <CgSmartphone
            size="2rem"
            color={Colors.tealc}
            style={{ marginLeft: "-8px" }}
          />
          <Typography
            style={{
              textTransform: "uppercase",
              color: Colors.tealc,
              fontSize: "12px",
            }}
          >
            {i18n.t("modules.cart.table.readOnApp")}
          </Typography>
          <IoMdInformationCircleOutline color={Pallette.primary} size="1rem" />
        </div>
      </Tooltip>
    );
  };
  const renderMobile = () => {
    return (
      <div
        onClick={() => setOpenReadPopup(true)}
        style={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CgSmartphone size="1.2rem" color={Colors.tealc} />
        <Typography
          style={{
            textTransform: "uppercase",
            color: Colors.tealc,
            fontSize: "10px",
          }}
        >
          {i18n.t("modules.cart.table.readOnApp")}
        </Typography>
      </div>
    );
  };
  return (
    <>
      {mobile ? renderMobile() : renderLaptop()}
      <Popup openPopup={openReadPopup} onClose={() => setOpenReadPopup(false)}>
        <div
          style={{
            display: "flex",
            padding: "10px 30px",
            flexDirection: "column",
            rowGap: "5px",
            justifyContent: "center",
          }}
        >
          <Title
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            {i18n.t("popups.readOnApp.title")}
          </Title>
          <div>
            <Typography fontWeight="bold" style={{ textAlign: "center" }}>
              {i18n.t("popups.readOnApp.first")}
            </Typography>
            <Typography
              style={{
                color: Colors.tealc,
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "18px",
              }}
            >
              {i18n.t("popups.readOnApp.second")}
            </Typography>
            <div
              style={{
                display: "flex",
                columnGap: "5px",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              <Typography style={{ fontWeight: "bold", lineHeight: "20px" }}>
                {i18n.t("popups.readOnApp.third")}
              </Typography>
              <Typography
                style={{
                  color: Colors.tealc,
                  textDecoration: "underline",
                  fontWeight: "bold",
                  cursor: "pointer",
                  lineHeight: "20px",
                }}
              >
                {i18n.t("popups.readOnApp.forth")}
              </Typography>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default ReadOnApp;
