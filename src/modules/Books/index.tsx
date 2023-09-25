import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { FiSliders } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import DrawerMine from "../../components/Drawer";
import Tag from "../../components/Tags";
import { Colors } from "../../constants/pallette";
import { Book } from "../../slicer/books/books.types";
import { State } from "../../slicer/types";
import { Title } from "../../styles";

import BookComponent from "./Book";
import Collections from "./Collections";

import useBooks from "./useBooks";

const Books = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const {
    filteredBooks,
    collections,
    setCollection,
    collection,
    collectionData,
    openCollectionsDrawer,
    setOpenCollectionsDrawer,
  } = useBooks();

  return (
    <>
      <Container>
        {vertical && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                columnGap: "6px",
              }}
            >
              <FiSliders
                color={Colors.tealc}
                onClick={() => setOpenCollectionsDrawer(true)}
              />
              <HiOutlineInformationCircle color={Colors.tealc} />
            </div>
          </div>
        )}
        <Grid
          container
          justifyContent="center"
          columnSpacing="30px"
          style={{
            marginTop: vertical ? "20px" : "0px",
            paddingLeft: vertical ? "8px" : "0px",
            paddingRight: vertical ? "8px" : "0px",
          }}
        >
          {!vertical && (
            <Grid container item xs={2.5}>
              <Collections
                collection={collection}
                setCollection={setCollection}
                collections={collections}
              />
            </Grid>
          )}

          <Grid
            container
            columnSpacing="0px"
            rowSpacing="0px"
            item
            mt="30px"
            xs={vertical ? 12 : 7}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <Title style={{ color: Colors.darkGrey, fontWeight: "bold" }}>
                {collection}
              </Title>
              <div style={{ display: "flex", columnGap: "10px" }}>
                {collectionData?.caracteristics?.map(
                  (item: string, pos: number) => {
                    return <Tag inverted label={item} key={pos} />;
                  }
                )}
              </div>
            </div>
            <Grid
              container
              columnSpacing={mobile ? "10px" : "20px"}
              rowSpacing={mobile ? "10px" : "20px"}
              style={{ marginTop: "1px" }}
            >
              {filteredBooks?.map((book: Book, pos: number) => {
                return (
                  <Grid item key={pos} xs={mobile ? 6 : 4}>
                    <BookComponent book={book} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container item xs={2.5}></Grid>
        </Grid>
        {vertical && (
          <DrawerMine
            position="bottom"
            openDrawer={openCollectionsDrawer}
            setOpenDrawer={setOpenCollectionsDrawer}
          >
            <div style={{ marginBottom: "50px", padding: "0px 10px" }}>
              <Collections
                collection={collection}
                setCollection={setCollection}
                collections={collections}
              />
            </div>
          </DrawerMine>
        )}
      </Container>
    </>
  );
};

export default Books;
