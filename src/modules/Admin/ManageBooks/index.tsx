import { Box } from "@mui/material";
import Button from "../../../components/Buttons/Button";
import { ROUTE_PATHS } from "../../../constants/routes";
import { i18n } from "../../../translations/i18n";
import { useNavigate } from "react-router";
import TableList from "../../../components/TableList";
import { tableColumns } from "./Constants";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { mapBooksItems } from "./mapper";


const ManageBooks = () => {
  const navigate = useNavigate();
  const tableData = useSelector<State, any>(
    (state) => state.books.books.data || []
  );

  console.log(tableData)

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Button
          label={i18n.t("modules.admin.manageBooks.createButton")}
          onClick={() => navigate(ROUTE_PATHS.ADMIN_BOOKS_CREATE)}
        />
      </Box>
      <TableList columns={tableColumns} rows={mapBooksItems(tableData).rows} onAction={() => null} />
    </>
  );
};

export default ManageBooks;
