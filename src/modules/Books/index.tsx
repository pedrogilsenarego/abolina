import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../slicer/books/books.actions";
import { State } from "../../slicer/types";
import { Book } from "../../slicer/books/books.types";
import { Card, Container, Grid, Typography } from "@mui/material";
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
        <Grid container justifyContent='center' columnSpacing={2}>
          {books?.map((book, pos) => {
            return (
              <Grid item key={pos} xs={12} sm={4}>
                <Card
                  onClick={() =>
                    Navigate(
                      ROUTE_PATHS.BOOKS_BOOK.replace(
                        ":id",
                        book?.documentID.toString()
                      )
                    )
                  }
                >
                  <CardMedia image={book?.coverPage} />
                  <Typography>{book?.title}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Books;
