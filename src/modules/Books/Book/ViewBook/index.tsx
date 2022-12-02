import { Box } from "@mui/material";
import CardMedia from "../../../../components/CardMedia";
import CollectionBrowser from "../Roster/CollectionBrowser";
import { useState } from "react";

const ViewBook = () => {
  const [page, setPage] = useState<number>(1);
  const listImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1k5wmbMaMZn0Iavojp73bttd5YGfu3c4sQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpomfK96gWxeSSCV7VcbPd2bvDf8yhcdC_w&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9JInBuCGtKHKLNrm8hUE2RFppP6iGZzxhNg&usqp=CAU",
  ];

  const handleRight = () => {
    if (page < listImages.length) {
      setPage(page + 1);
    } else return;
  };

  const handleLeft = () => {
    if (page > 0 + 1) {
      setPage(page - 1);
    } else return;
  };

  return (
    <>
      <CardMedia image={listImages[page - 1]} height='auto' />
      <Box display='flex' justifyContent='center' mt='30px' mb='30px'>
        <CollectionBrowser
          handleRight={handleRight}
          handleLeft={handleLeft}
          title={`${page}/${listImages.length}`}
        />
      </Box>
    </>
  );
};

export default ViewBook;
