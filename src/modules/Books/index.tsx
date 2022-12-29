import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../slicer/books/books.actions";
import { State } from "../../slicer/types";
import { Book } from "../../slicer/books/books.types";
import { Box, Container, Grid, Typography } from "@mui/material";
import CardMedia from "../../components/CardMedia";

const Books = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const books = useSelector<State, Book[]>(
    (state) => state.books.books.data || []
  );

  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Grid container justifyContent='center' columnSpacing={2} style={{ marginTop: "60px" }}>
          <Grid container item xs={3}></Grid>
          <Grid container columnSpacing="1px" rowSpacing="1px" item xs={9}>
            {books?.map((book, pos) => {
              return (
                <Grid item key={pos} xs={12} sm={4}>
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
                    <CardMedia height="300" borderRadius="0px" image={book?.coverPage} />
                    <Box style={{ backgroundColor: "white" }}>
                      <Typography>{book?.title}</Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Books;
