import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import livroOndas from "../../assets/images/livroOndas.svg";
import MyAlbum from "../../components/LeafThrough";
import Loader from "../../components/Loader";
import Popup from "../../components/Popup";
import { Colors } from "../../constants/pallette";
import { fetchBookThenCollection } from "../../slicer/books/books.actions";
import { Book } from "../../slicer/books/books.types";
import { State } from "../../slicer/types";
import PeekDigital from "./PeekDigital";
import Roster from "./Roster";
import TheCollection from "./TheCollection";
import TheHistory from "./TheHistory";

const BookC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [openViewBook, setOpenViewBook] = useState<boolean>(false);
  const [openPeekDigital, setOpenPeekDigital] = useState<boolean>(false);
  const [infoState, setInfoState] = useState<"story" | "collection">("story");
  const [fullScreen, setFullScreen] = useState(false);
  const { id } = useParams();
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("md"));

  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );

  const book = useSelector<State, Book>((state) => state.books.book || {});
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  useEffect(() => {
    dispatch(fetchBookThenCollection(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (book.documentID === id || id === "preview") setLoading(false);
  }, [book.documentID, id]);

  const renderPopup = () => {
    return (
      <Popup
        openPopup={openViewBook}
        setOpenPopup={setOpenViewBook}
        onClose={() => setOpenViewBook(false)}
        fullScreen={fullScreen}
        title={lang === "PT" ? book?.title : book?.titleEN}
      >
        <MyAlbum fullScreen={fullScreen} setFullScreen={setFullScreen} />
      </Popup>
    );
  };

  const renderPeekDigital = () => {
    return (
      <Popup
        openPopup={openPeekDigital}
        setOpenPopup={setOpenPeekDigital}
        onClose={() => setOpenPeekDigital(false)}
        fullScreen={fullScreen}
      >
        <PeekDigital fullScreen={fullScreen} setFullScreen={setFullScreen} />
      </Popup>
    );
  };

  return loading ? (
    <Loader customMessage={i18n.t("modules.books.book.loading")} />
  ) : (
    <>
      <Box
        mt={vertical ? "0px" : "20px"}
        style={{
          paddingLeft: vertical ? "8px" : "0px",
          paddingRight: vertical ? "8px" : "0px",
        }}
      >
        <Container maxWidth="lg">
          <Roster
            book={book}
            setOpenViewBook={setOpenViewBook}
            setOpenPeekDigital={setOpenPeekDigital}
          />
          <Box
            display="flex"
            justifyContent="start"
            mt="40px"
            style={{ columnGap: "20px" }}
          >
            <GStyled.Title
              onClick={() => setInfoState("story")}
              color={infoState === "story" ? Colors.tealc : "black"}
              fontSize="24px"
              style={{
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: infoState === "story" ? "underline" : "none",
              }}
            >
              {i18n.t("modules.books.book.title")}
            </GStyled.Title>
            {book?.collections && (
              <GStyled.Title
                onClick={() => setInfoState("collection")}
                color={infoState === "collection" ? Colors.tealc : "black"}
                fontSize="24px"
                style={{
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration:
                    infoState === "collection" ? "underline" : "none",
                }}
              >
                {i18n.t("modules.books.book.collection")}
              </GStyled.Title>
            )}
          </Box>
          {infoState === "story" ? (
            <TheHistory />
          ) : (
            <>
              <TheCollection />
            </>
          )}
        </Container>
        <Box
          style={{
            pointerEvents: "none",
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
      {renderPeekDigital()}
    </>
  );
};

export default BookC;
