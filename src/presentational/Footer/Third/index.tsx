import { Grid } from "@mui/material";
import * as Styled from "../styles";
import { i18n } from "../../../translations/i18n";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";

const Third = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      alignItems="flex-end"
      justifyContent="center"
      style={{ minHeight: "100%" }}
    >
      <Styled.STypography
        style={{ cursor: "pointer" }}
        onClick={() => navigate(ROUTE_PATHS.POLICIES)}
      >
        {i18n.t("footer.second.second")}
      </Styled.STypography>
    </Grid>
  );
};

export default Third;
