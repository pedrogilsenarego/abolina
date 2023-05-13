import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { Box, Container, Grid, Typography } from "@mui/material";
import CardMedia from "../../components/CardMedia";
import { Title } from "../../styles";
import { i18n } from "../../translations/i18n";
import useBooks from "./useBooks";
import CollectionsItem from "./CollectionsItem";

const Books = () => {
  const Navigate = useNavigate();
  const { books, lang, collections } = useBooks();

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
                  rowGap: "10px"
                }}
              >
                {collections.map((item, pos) => {
                  return (
                    <CollectionsItem pos={pos} item={item} />
                  );
                })}
              </div>
            </div>
          </Grid>
          <Grid container columnSpacing='0px' rowSpacing='0px' item xs={8}>
            {books?.map((book, pos) => {
              return (
                <Grid item key={pos} xs={12} sm={6}>
                  <Box
                    style={{ backgroundColor: "lightGrey", padding: "10px" }}
                    onClick={() =>
                      Navigate(
                        ROUTE_PATHS.BOOKS_BOOK.replace(
                          ":id",
                          book?.documentID.toString()
                        )
                      )
                    }
                  >
                    <CardMedia
                      height='300'
                      borderRadius='0px'
                      image={book?.coverPage}
                    />
                    <Box style={{ backgroundColor: "white" }}>
                      <Typography>
                        {(lang === "PT" ? book?.title : book?.titleEN) || ""}
                      </Typography>
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
