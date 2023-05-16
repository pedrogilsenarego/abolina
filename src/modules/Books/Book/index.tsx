import {
  Container,
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import Tile from "./Tile";
import Roster from "./Roster";
import livroOndas from "../../../assets/images/livroOndas.svg";
import Popup from "../../../components/Popup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook } from "../../../slicer/books/books.actions";
import { useParams } from "react-router";
import { Book } from "../../../slicer/books/books.types";
import { State } from "../../../slicer/types";
import LeafThrough from "./LeafThrough";

const BookC = () => {
  const dispatch = useDispatch();
  const [openViewBook, setOpenViewBook] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState(false);
  const { id } = useParams();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("md"));

  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const vertical = useSelector<State, boolean>((state) => state.general.positionVertical)

  useEffect(() => {
    dispatch(fetchBook(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const book = useSelector<State, Book>((state) => state.books.book || {});

  const renderPopup = () => {
    return (
      <Popup
        openPopup={openViewBook}
        setOpenPopup={setOpenViewBook}
        onClose={() => setOpenViewBook(false)}
        fullScreen={fullScreen}
      // actions={
      //   [
      //     {
      //       title: "Close Book",
      //       onClick: () => setOpenViewBook(false)
      //     }
      //   ]
      // }
      >

        <LeafThrough fullScreen={fullScreen} setFullScreen={setFullScreen} />
      </Popup>
    )
  }

  return (
    <>
      <Box mt={vertical ? "0px" : '20px'} style={{ paddingLeft: vertical ? "8px" : "0px", paddingRight: vertical ? "8px" : "0px", }}>
        <Container maxWidth='md'>
          <Roster book={book} setOpenViewBook={setOpenViewBook} />
          <Box display='flex' justifyContent='start' mt='40px'>
            <GStyled.Title fontSize='24px' style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.title")}
            </GStyled.Title>
          </Box>
          <Typography
            align='justify'
            style={{ marginTop: "20px", whiteSpace: "pre-line" }}
          >
            {(lang === "PT" ? book?.resume : book?.resumeEN) || ""}
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
                text={(lang === "PT" ? book?.authorResume : book?.authorResumeEN) || ""}
              />
            </Grid>
            {book?.designer && (
              <Grid item xs={12} md={4}>
                <Tile
                  title={i18n.t("modules.books.book.designer")}
                  name={book?.designer || ""}
                  text={(lang === "PT" ? book?.designerResume : book?.designerResumeEN) || ""}
                />
              </Grid>
            )}
            {book?.translator && (
              <Grid item xs={12} md={4}>
                <Tile
                  title={i18n.t("modules.books.book.translator")}
                  name={book?.translator || ""}
                  text={(lang === "PT" ? book?.translatorResume : book?.translatorResumeEN) || ""}
                />
              </Grid>
            )}
          </Grid>
        </Container>
        <Box
          style={{
            marginTop: mobile ? "-60px" : "20px",
            marginBottom: mobile ? "-20px" : "0px",
            backgroundImage: `url(${livroOndas})`,
            backgroundSize: mobile ? "150%" : "contain",
            backgroundRepeat: "no-repeat",
            minHeight: "30vh",
            transform: mobile ? "scaleY(2)" : "scaleY(1)",
            backgroundPosition: "center center",
          }}
        />
      </Box>

      {renderPopup()}


    </>
  );
};

export default BookC;
