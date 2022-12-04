import { Container, Box, Typography, Grid } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import Tile from "./Tile";
import Roster from "./Roster";
import livroOndas from "../../../assets/images/livroOndas.svg";
import Popup from "../../../components/Popup";
import { useState, useEffect } from "react";
import ViewBook from "./ViewBook";
import { useDispatch } from "react-redux";
import { fetchBook } from "../../../slicer/books/books.actions";
import { useParams } from "react-router";


const BookC = () => {
  const dispatch = useDispatch()
  const [openViewBook, setOpenViewBook] = useState<boolean>(false);
  const { id } = useParams()


  useEffect(() => {
    dispatch(fetchBook(id))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <Box>
        <Container maxWidth='md'>
          <Roster setOpenViewBook={setOpenViewBook} />
          <Box display='flex' justifyContent='start' mt='40px'>
            <GStyled.Title>{i18n.t("modules.books.book.title")}</GStyled.Title>
          </Box>
          <Typography
            align='justify'
            style={{ marginTop: "20px", whiteSpace: "pre-line" }}
          >
            {i18n.t("modules.about.mainText")}
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
                name='Nome Autor'
                text={i18n.t("modules.about.third")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Tile
                title={i18n.t("modules.books.book.designer")}
                name='Nome Ilustrador'
                text={i18n.t("modules.about.third")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Tile
                title={i18n.t("modules.books.book.translator")}
                name='Nome Tradutor'
                text={i18n.t("modules.about.third")}
              />
            </Grid>
          </Grid>
        </Container>
        <Box
          style={{
            marginTop: "100px",
            backgroundImage: `url(${livroOndas})`,
            backgroundSize: "cover",
            minHeight: "30vh",
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
