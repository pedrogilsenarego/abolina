import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardMedia from "../../components/CardMedia";
import { Title } from "../../styles";
import { i18n } from "../../translations/i18n";
import useBooks from "./useBooks";
import CollectionsItem from "./CollectionsItem";
import { Colors } from "../../constants/pallette";
import { FiShoppingCart } from "react-icons/fi";
import { BsCartPlus, BsStars } from "react-icons/bs";
import { Book } from "../../slicer/books/books.types";
import { useSelector } from "react-redux";
import { State } from "../../slicer/types";

const Books = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const {
    filteredBooks,
    lang,
    collections,
    handleAddToCart,
    setCollection,
    collection,
  } = useBooks();

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent='center'
          columnSpacing={2}
          style={{ marginTop: vertical ? "20px" : "60px", paddingLeft: vertical ? "8px" : "0px", paddingRight: vertical ? "8px" : "0px", }}
        >
          {!vertical && (
            <Grid container item xs={2}>
              <div>
                <Title style={{ textDecoration: "underline" }}>
                  {i18n.t("modules.books.collections")}
                </Title>
                <div
                  style={{
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
            xs={vertical ? 12 : 8}
          >
            <Title style={{}}>{collection}</Title>
            <Grid container columnSpacing={mobile ? "10px" : "20px"} rowSpacing={mobile ? "10px" : "20px"} style={{ marginTop: "20px" }}>
              {filteredBooks?.map((book: Book, pos: number) => {
                return (
                  <Grid item key={pos} xs={6}>
                    <Box
                      style={{

                        height: "100%",
                        position: "relative",
                      }}
                    >
                      {book?.newBook !== "undefined" && (
                        <Box
                          style={{
                            position: "absolute",
                            zIndex: 1000,
                            backgroundColor: Colors.tealc,
                            top: "10%",
                            left: vertical ? "0px" : "10px",
                            padding: "3px 20px 3px 20px",
                            borderRadius: "3px",
                            boxShadow: "1px 1px 1px #00000066",
                          }}
                        >
                          <BsStars
                            size='1.2rem'
                            color='yellow'
                            style={{
                              position: "absolute",
                              left: "-10%",
                              top: "-40%",
                            }}
                          />
                          <Typography
                            style={{ color: "white", fontSize: "12px" }}
                          >
                            {book?.newBook === "new"
                              ? i18n.t("modules.books.book.new")
                              : i18n.t("modules.books.book.soon")}
                          </Typography>
                        </Box>
                      )}
                      <CardMedia
                        height={mobile ? "170" : "400"}
                        borderRadius='0px'
                        image={book?.coverPage}
                        onClick={() =>
                          Navigate(
                            ROUTE_PATHS.BOOKS_BOOK.replace(
                              ":id",
                              book?.documentID.toString()
                            )
                          )
                        }
                      />
                      <Box
                        style={{
                          backgroundColor: "white",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          padding: mobile ? "5px" : "20px",
                          position: "relative",
                        }}
                      >
                        {book?.discount && (
                          <div
                            style={{
                              position: "absolute",
                              top: mobile ? "-17.5px" : "-25px",
                              right: mobile ? "-5px" : "-10px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "50%",
                              padding: mobile ? "5px" : "10px",
                              height: mobile ? "35px" : "50px",
                              aspectRatio: 1,
                              backgroundColor: Colors.tealc,
                            }}
                          >
                            <Typography
                              style={{
                                color: "white",
                                fontSize: mobile ? "14px" : "18px",
                              }}
                            >
                              {book?.discount}%
                            </Typography>
                          </div>
                        )}
                        <Typography
                          color={Colors.tealc}
                          style={{
                            fontWeight: 800,
                            fontSize: mobile ? "12px" : "16px",
                          }}
                        >
                          Nº {book?.number}
                        </Typography>
                        <Typography style={{ fontWeight: 800 }}>
                          {(lang === "PT" ? book?.title : book?.titleEN) || ""}
                        </Typography>
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            minHeight: mobile ? "0px" : "50px",
                          }}
                        >
                          <Typography
                            color={Colors.tealc}
                            style={{
                              fontWeight: 800,
                              fontSize: mobile ? "18px" : "23px",
                            }}
                          >
                            {book?.price} €
                          </Typography>
                          {book?.newBook !== "soon" && (
                            <>
                              {vertical ? (
                                <div style={{ paddingRight: "5px" }}>
                                  <BsCartPlus size='1.5rem' />
                                </div>
                              ) : (
                                <div
                                  onClick={() => handleAddToCart(book)}
                                  style={{
                                    cursor: "pointer",
                                    columnGap: "10px",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    display: "flex",
                                    color: "white",
                                    backgroundColor: Colors.tealc,
                                    borderRadius: "10px",
                                    padding: "10px",
                                  }}
                                >
                                  <FiShoppingCart size='1.5rem' color='white' />
                                  <Typography
                                    fontSize='18px'
                                    style={{
                                      textTransform: "uppercase",
                                      fontWeight: 800,
                                    }}
                                  >
                                    {i18n.t("modules.books.book.addToCart")}
                                  </Typography>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container item xs={2}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Books;
