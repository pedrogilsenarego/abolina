import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Container } from "@mui/material";

const Contacts = () => {
  return (
    <Container maxWidth='md' style={{ justifyContent: "center" }}>
      <GStyled.Title>{i18n.t("menuBar.contacts")}</GStyled.Title>

    </Container>
  );
};

export default Contacts;
