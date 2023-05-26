import { Box, Card, Divider } from "@mui/material";
import Button from "../../../components/Button";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useNavigate } from "react-router";
import TableList from "../../../components/TableList";
import { tableColumns } from "./Constants";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { mapCollectionsItems } from "./CreateCollection/mapper";
import useList from "./useList";
import { Title } from "../../../styles";
import { Collection } from "../../../slicer/books/books.types";

const ManageCollections = () => {
  const navigate = useNavigate();
  const tableData = useSelector<State, Collection[]>(
    (state) => state?.books?.collections?.data || []
  );

  const { handleAction } = useList({ tableData });



  return (
    <>
      <Title fontSize='16px'>Manage Collections</Title>
      <Divider />

      <Box style={{ marginTop: "60px" }}>


        <Card style={{ padding: "20px" }}>
          <TableList
            columns={tableColumns}
            rows={mapCollectionsItems(tableData).rows}
            onAction={handleAction}
          />
        </Card>
        <Box
          display='flex'
          justifyContent='start'
          style={{ marginTop: "40px" }}
        >
          <Button

            label="Add Collection"
            onClick={() => navigate(ROUTE_PATHS.ADMIN_COLLECTION_CREATE)}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageCollections;
