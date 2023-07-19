import { Box, Card, Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../../components/Button";
import TableList from "../../../components/TableList";
import { ROUTE_PATHS } from "../../../constants/routes";
import { State } from "../../../slicer/types";
import { Title } from "../../../styles";
import { i18n } from "../../../translations/i18n";
import { tableColumns } from "./Constants";
import TestePage from "./TestePage";
import { mapBooksItems } from "./mapper";
import useList from "./useList";

const ManageBooks = () => {
  const navigate = useNavigate();
  const tableData = useSelector<State, any>(
    (state) => state.books.books.data || []
  );
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const { handleAction } = useList({ tableData });

  return (
    <>
      <Title fontSize="16px">{i18n.t("adminSideBar.submitBook")}</Title>
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
          display="flex"
          justifyContent="start"
          style={{ marginTop: "40px" }}
        >
          <Button
            label={i18n.t("modules.admin.manageBooks.createButton")}
            onClick={() => navigate(ROUTE_PATHS.ADMIN_BOOKS_CREATE)}
          />
        </Box>
      </Box>
      <TestePage fullScreen={fullScreen} setFullScreen={setFullScreen} />
    </>
  );
};

export default ManageBooks;
