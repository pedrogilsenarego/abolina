import { Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { Book } from "../../../slicer/books/books.types";
import Tile from "../Tile";
import { i18n } from "../../../translations/i18n";

const TheHistory = () => {
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );
  const book = useSelector<State, Book>((state) => state.books.book || {});

  return (
    <>
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
    </>
  )
}

export default TheHistory