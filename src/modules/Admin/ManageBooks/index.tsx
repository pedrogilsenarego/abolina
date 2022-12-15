import { Box, Card, Divider } from "@mui/material";
import Button from "../../../components/Buttons/Button";
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

  const { handleAction } = useList({ tableData })

  return (
    <>

      <Title fontSize="24px">{i18n.t("adminSideBar.submitBook")}</Title>

      <Card style={{ padding: "40px", marginTop: "60px" }}>
        <Box display='flex' justifyContent='end'>
          <Button
            borderRadius="6px"
            label={i18n.t("modules.admin.manageBooks.createButton")}
            onClick={() => navigate(ROUTE_PATHS.ADMIN_BOOKS_CREATE)}
          />
        </Box>
        <Divider style={{ marginTop: "50px", marginBottom: "50px" }} />

        <TableList columns={tableColumns} rows={mapBooksItems(tableData).rows} onAction={handleAction} />

      </Card >
    </>
  );
}

export default ManageBooks;
