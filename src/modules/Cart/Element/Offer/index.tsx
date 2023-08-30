import { Typography } from "@mui/material";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Popup from "../../../../components/BasicPopup";
import { Colors, Pallette } from "../../../../constants/pallette";
import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";

const Offer = () => {
  const [openOfferPopup, setOpenOfferPopup] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setOpenOfferPopup(true)}
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          columnGap: "5px",
          cursor: "pointer",
        }}
      >
        <Typography color={Pallette.primary} style={{ marginTop: "-2px" }}>
          {i18n.t("modules.cart.table.offer")}
        </Typography>
        <IoMdInformationCircleOutline color={Pallette.primary} size="1rem" />
      </div>
      <Popup
        maxWidth="300px"
        openPopup={openOfferPopup}
        onClose={() => setOpenOfferPopup(false)}
      >
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
            {i18n.t("popups.offer.title")}
          </Title>
          <div>
            <Typography fontWeight="bold" style={{ textAlign: "center" }}>
              {i18n.t("popups.offer.first")}
            </Typography>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Offer;
