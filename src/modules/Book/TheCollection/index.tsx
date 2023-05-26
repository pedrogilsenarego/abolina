import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { Title } from "../../../styles";
import { Collection } from "../../../slicer/books/books.types";

const TheCollection = () => {
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );
  const collection = useSelector<State, Collection>(
    (state) => state.books.collection
  );

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
    </>
  );
};

export default TheCollection;
