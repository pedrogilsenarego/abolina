import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Title } from "../../styles";
import { i18n } from "../../translations/i18n";
import useBooks from "./useBooks";
import CollectionsItem from "./CollectionsItem";

import { Book } from "../../slicer/books/books.types";
import { useSelector } from "react-redux";
import { State } from "../../slicer/types";
import BookComponent from "./Book";
import Tag from "../../components/Tags";

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
  } = useBooks();

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent='center'
          columnSpacing='50px'
          style={{
            marginTop: vertical ? "20px" : "60px",
            paddingLeft: vertical ? "8px" : "0px",
            paddingRight: vertical ? "8px" : "0px",
          }}
        >
          {!vertical && (
            <Grid container item xs={2.5}>
              <div style={{ width: "100%" }}>
                <Title
                  style={{ textDecoration: "underline", textAlign: "left" }}
                >
                  {i18n.t("modules.books.collections")}
                </Title>
                <div
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    rowGap: "10px",
                  }}
                >
                  {collections.map((item, pos) => {
                    return (
                      <CollectionsItem
                        pos={pos}
                        item={item}
                        collection={collection}
                        setCollection={setCollection}
                      />
                    );
                  })}
                </div>
              </div>
            </Grid>
          )}

          <Grid
            container
            columnSpacing='0px'
            rowSpacing='0px'
            item
            xs={vertical ? 12 : 7}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
              }}
            >
              <Title style={{}}>{collection}</Title>
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
      </Container>
    </>
  );
};

export default Books;
