import { Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { Book, Collection } from "../../../../slicer/books/books.types";
import Tile from "../Tile";
import { i18n } from "../../../../translations/i18n";

const TheCollection = () => {
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );
  const book = useSelector<State, Book>((state) => state.books.book || {});
  const collection = useSelector<State, Collection>((state) => state.books.collection)

  return (
    <>
      <Typography
        align='justify'
        style={{ marginTop: "20px", whiteSpace: "pre-line" }}
      >
        {(lang === "PT" ? collection?.resume : collection?.resumeEN) || ""}
      </Typography>
    </>
  )
}

export default TheCollection