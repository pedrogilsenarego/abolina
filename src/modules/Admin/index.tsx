import { Box } from "@mui/material";
import Button from "../../components/Buttons/Button";
import { ROUTE_PATHS } from "../../constants/routes";
import { i18n } from "../../translations/i18n";
import { useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box display='flex' justifyContent='center'>
      <Button
        label={i18n.t("modules.admin.manageBooks.createButton")}
        onClick={() => navigate(ROUTE_PATHS.ADMIN_BOOKS_CREATE)}
      />
      {/* <ListingPage
        loading={loading}
        {...tableListProps}
        {...createBoxProps}
        {...searchSelectProps}
        {...filtersProps}
        {...auditInfoProps}
        showSearchInput
        multipleActions={selectedBrands.length >= 2 && getMultipleActionBar()}
        showCustomSearchinputSide
        customSearchinputSideRole={ROLES.ADMIN}
        customSearchinputSidePermissions={[
          PERMISSIONS.BO_SPONSORED_BRANDS_ACCESS,
        ]}
        customSearchinputSide={renderFilters()}
      /> */}
    </Box>
  );
};

export default Admin;
