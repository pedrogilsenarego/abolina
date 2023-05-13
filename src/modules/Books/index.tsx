import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { Box, Container, Grid, Typography } from "@mui/material";
import CardMedia from "../../components/CardMedia";
import { Title } from "../../styles";
import { i18n } from "../../translations/i18n";
import useBooks from "./useBooks";
import CollectionsItem from "./CollectionsItem";
import { Colors } from "../../constants/pallette";
import { FiShoppingCart } from "react-icons/fi";

const Books = () => {
  const Navigate = useNavigate();
  const { books, lang, collections, handleAddToCart } = useBooks();

  console.log(collections);

  return (
    <>
      <Container>
        <Grid
          container
          justifyContent='center'
          columnSpacing={2}
          style={{ marginTop: "60px" }}
        >
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
                  return <CollectionsItem pos={pos} item={item} />;
                })}
              </div>
            </div>
          </Grid>
          <Grid container columnSpacing='0px' rowSpacing='0px' item xs={8}>
            {books?.map((book, pos) => {
              return (
                <Grid item key={pos} xs={12} sm={6}>
                  <Box
                    style={{ backgroundColor: "lightGrey", padding: "15px", height: "100%" }}

                  >
                    <CardMedia
                      height='400'
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
                        padding: "20px",
                        height: "100%"
                      }}
                    >
                      <Typography
                        color={Colors.tealc}
                        style={{ fontWeight: 800 }}
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
                        }}
                      >
                        <Typography
                          color={Colors.tealc}
                          style={{ fontWeight: 800, fontSize: "23px" }}
                        >
                          {book?.price} €
                        </Typography>
                        {book?.newBook !== "soon" && <div
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
                        </div>}

                      </div>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Grid container item xs={2}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Books;
