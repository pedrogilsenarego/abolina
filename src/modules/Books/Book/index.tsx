import { Container, Box, Typography, Grid } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import Tile from "./Tile";
import Roster from "./Roster";
import livroOndas from "../../../assets/images/livroOndas.svg";
import Popup from "../../../components/Popup";
import { useState, useEffect } from "react";
import ViewBook from "./ViewBook";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../../slicer/books/books.actions";
import { useParams } from "react-router";
import { Book } from "../../../slicer/books/books.types";
import { State } from "../../../slicer/types";


const BookC = () => {
  const dispatch = useDispatch()
  const [openViewBook, setOpenViewBook] = useState<boolean>(false);
  const { id } = useParams()


  useEffect(() => {
    dispatch(fetchBook(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const book = useSelector<State, Book>(
    (state) => state.books.book || {}
  );

  return (
    <>
      <Box>
        <Container maxWidth='md'>
          <Roster book={book} setOpenViewBook={setOpenViewBook} />
          <Box display='flex' justifyContent='start' mt='40px'>
            <GStyled.Title>{i18n.t("modules.books.book.title")}</GStyled.Title>
          </Box>
          <Typography
            align='justify'
            style={{ marginTop: "20px", whiteSpace: "pre-line" }}
          >
            {book?.resume || ""}
          </Typography>
          <Grid
            container
            columnSpacing={4}
            rowSpacing={4}
            style={{ marginTop: "40px" }}
          >
            <Grid item xs={12} md={4}>
              <Tile
                title={i18n.t("modules.books.book.writer")}
                name={book?.author || ""}
                text={book?.authorResume || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Tile
                title={i18n.t("modules.books.book.designer")}
                name={book?.designer || ""}
                text={book?.designerResume || ""}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Tile
                title={i18n.t("modules.books.book.translator")}
                name={book?.translator || ""}
                text={book?.translatorResume || ""}
              />
            </Grid>
          </Grid>
        </Container>
        <Box
          style={{
            marginTop: "20px",
            backgroundImage: `url(${livroOndas})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            minHeight: "30vh",
            backgroundPosition: "center center",
          }}
        />
      </Box>
      <Popup
        openPopup={openViewBook}
        setOpenPopup={setOpenViewBook}
        title='Teste'
        actions={
          [
            {
              title: "Close Book",
              onClick: () => setOpenViewBook(false)
            }
          ]
        }
      >
        <ViewBook />
      </Popup>
    </>
  );
};

export default BookC;
