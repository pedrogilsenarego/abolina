import { Box, Divider } from "@mui/material";
import { AiTwotoneCreditCard, AiTwotoneHome } from "react-icons/ai";
import { SiBookstack } from "react-icons/si";
import { Pallette } from "../../../../constants/pallette";
import { ROUTE_PATHS } from "../../../../constants/routes";
import { i18n } from "../../../../translations/i18n";
import Button from "./Button";

const AdminSideBar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      rowGap={2}
      style={{
        width: "200px",
        position: "fixed",
        height: "100vh",
        backgroundColor: Pallette.primary,
        borderRight: `solid 1px ${Pallette.textTransparent}`,
        padding: "50px 0px 0px 10px",
      }}
    >
      <Button
        label={i18n.t("adminSideBar.submitBook")}
        icon={<SiBookstack />}
        path={ROUTE_PATHS.ADMIN}
      />
      <Button
        label="Manage Collections"
        icon={<AiTwotoneCreditCard />}
        path={ROUTE_PATHS.ADMIN_COLLECTION}
      />
      <Button
        label={i18n.t("adminSideBar.manageCarroussel")}
        icon={<AiTwotoneCreditCard />}
        path={ROUTE_PATHS.ADMIN_CARROUSEL}
      />

      <Divider />
      <Button
        label={i18n.t("adminSideBar.back")}
        icon={<AiTwotoneHome />}
        path={ROUTE_PATHS.HOME}
      />
    </Box>
  );
};

export default AdminSideBar;
