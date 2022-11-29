import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Box } from "@mui/material";
import * as GStyled from "../../../../../styles";
import { i18n } from "../../../../../translations/i18n";
import { Colors } from "../../../../../constants/pallette";

const CollectionBrowser = () => {
  return (
    <Box display="flex" columnGap={1} alignItems="center">
      <Box style={{ backgroundColor: Colors.tealc, borderRadius: "3px", cursor: "pointer" }} display="flex" justifyContent="center" alignItems="center">
        <FiChevronLeft size="2em" color="white" />
      </Box>
      <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
        {i18n.t("modules.books.book.collectionBrowser")}
      </GStyled.Title>
      <Box style={{ backgroundColor: Colors.tealc, borderRadius: "3px", cursor: "pointer" }} display="flex" justifyContent="center" alignItems="center">
        <FiChevronRight size="2em" color="white" />
      </Box>
    </Box>
  );
};

export default CollectionBrowser;
