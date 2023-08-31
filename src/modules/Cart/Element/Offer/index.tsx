import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Popup from "../../../../components/BasicPopup";
import { Pallette } from "../../../../constants/pallette";
import { Title } from "../../../../styles";
import { i18n } from "../../../../translations/i18n";

interface Props {
  value?: number;
  forOffer?: boolean;
}

const Offer = ({ value = 0, forOffer }: Props) => {
  const [openOfferPopup, setOpenOfferPopup] = useState<boolean>(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const renderLaptop = () => {
    return (
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
    );
  };

  const renderMobile = () => {
    return (
      <div
        onClick={() => setOpenOfferPopup(true)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "5px",
          position: "absolute",

          right: "5px",
          bottom: "15px",
        }}
      >
        <Typography style={{ fontSize: "12px" }}>
          {forOffer ? value : value - 1}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color={Pallette.primary} fontSize="12px">
            {i18n.t("modules.cart.table.offer")}
          </Typography>
        </div>
      </div>
    );
  };
  return (
    <>
      {mobile ? renderMobile() : renderLaptop()}
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
