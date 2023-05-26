import { Box, Card, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { ROUTE_PATHS } from "../../../constants/routes";
import { i18n } from "../../../translations/i18n";
import { useNavigate } from "react-router";
import TableList from "../../../components/TableList";
import { tableColumns } from "./Constants";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { mapBooksItems } from "./mapper";
import useList from "./useList";
import { Title } from "../../../styles";

const ManageBooks = () => {
  const navigate = useNavigate();
  const tableData = useSelector<State, any>(
    (state) => state.books.books.data || []
  );

  const { handleAction } = useList({ tableData });

  return (
    <>
      <Title fontSize='16px'>{i18n.t("adminSideBar.submitBook")}</Title>
      <Divider />

      <Box style={{ marginTop: "60px" }}>


        <Card style={{ padding: "20px" }}>
          <TableList
            columns={tableColumns}
            rows={mapBooksItems(tableData).rows}
            onAction={handleAction}
          />
        </Card>
        <Box
          display='flex'
          justifyContent='start'
          style={{ marginTop: "40px" }}
        >
          <Button

            label={i18n.t("modules.admin.manageBooks.createButton")}
            onClick={() => navigate(ROUTE_PATHS.ADMIN_BOOKS_CREATE)}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageBooks;
