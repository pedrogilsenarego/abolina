import { Container, Box, useTheme, useMediaQuery } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";

import Roster from "./Roster";
import livroOndas from "../../../assets/images/livroOndas.svg";
import Popup from "../../../components/Popup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook, fetchBookThenCollection } from "../../../slicer/books/books.actions";
import { useParams } from "react-router";
import { Book } from "../../../slicer/books/books.types";
import { State } from "../../../slicer/types";
import LeafThrough from "./LeafThrough";
import TheHistory from "./TheHistory";
import { Colors } from "../../../constants/pallette";
import TheCollection from "./TheCollection";

const BookC = () => {
  const dispatch = useDispatch();
  const [openViewBook, setOpenViewBook] = useState<boolean>(false);
  const [infoState, setInfoState] = useState<"story" | "collection">("story");
  const [fullScreen, setFullScreen] = useState(false);
  const { id } = useParams();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("md"));

  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );

  useEffect(() => {
    dispatch(fetchBookThenCollection(id));
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
    );
  };

  return (
    <>
      <Box
        mt={vertical ? "0px" : "20px"}
        style={{
          paddingLeft: vertical ? "8px" : "0px",
          paddingRight: vertical ? "8px" : "0px",
        }}
      >
        <Container maxWidth='md'>
          <Roster book={book} setOpenViewBook={setOpenViewBook} />
          <Box
            display='flex'
            justifyContent='start'
            mt='40px'
            style={{ columnGap: "20px" }}
          >
            <GStyled.Title
              onClick={() => setInfoState("story")}
              color={infoState === "story" ? Colors.tealc : "black"}
              fontSize='24px'
              style={{
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: infoState === "story" ? "underline" : "none",
              }}
            >
              {i18n.t("modules.books.book.title")}
            </GStyled.Title>
            {book?.collections && (<GStyled.Title
              onClick={() => setInfoState("collection")}
              color={infoState === "collection" ? Colors.tealc : "black"}
              fontSize='24px'
              style={{
                fontWeight: 700,
                cursor: "pointer",
                textDecoration:
                  infoState === "collection" ? "underline" : "none",
              }}
            >
              {i18n.t("modules.books.book.collection")}
            </GStyled.Title>)}

          </Box>
          {infoState === "story" ? <TheHistory /> : <><TheCollection /></>}
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
