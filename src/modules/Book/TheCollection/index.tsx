import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { Title } from "../../../styles";
import { Book, Collection } from "../../../slicer/books/books.types";
import Tile from "../Tile";
import { i18n } from "../../../translations/i18n";

const TheCollection = () => {
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );
  const collection = useSelector<State, Collection>(
    (state) => state.books.collection
  );

  const book = useSelector<State, Book>((state) => state.books.book || {});


  return (
    <>
      <Title align="left" style={{ marginTop: "20px" }}>
        {" "}
        {(lang === "PT" ? collection?.title : collection?.titleEN) || ""}
      </Title>
      <Typography
        align='justify'
        style={{ marginTop: "10px", whiteSpace: "pre-line" }}
      >
        {(lang === "PT" ? collection?.resume : collection?.resumeEN) || ""}
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
    </>

  );
};

export default TheCollection;
