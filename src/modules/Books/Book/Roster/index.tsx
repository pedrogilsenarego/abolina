import {
  Grid,
  Container,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import CollectionBrowser from "./CollectionBrowser";
import CardMedia from "../../../../components/CardMedia";
import { Colors } from "../../../../constants/pallette";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Book } from "../../../../slicer/books/books.types";
import { State } from "../../../../slicer/types";

interface Props {
  setOpenViewBook: (openViewBook: boolean) => void;
}

const Roster = ({ setOpenViewBook }: Props) => {


  const storeBook = useSelector<State, Book>(
    (state) => state.books.book || {}
  );
  const [book, setBook] = useState<Book>();

  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  useEffect(() => {
    setBook(storeBook)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8} style={{ position: "relative" }}>
          <Box
            style={{
              position: "absolute",
              zIndex: 1000,
              backgroundColor: Colors.tealc,
              top: mobile ? -20 : 30,
              left: mobile ? 0 : -10,
              padding: mobile ? "5px" : "10px",
              borderRadius: "3px",
              cursor: "pointer",
              boxShadow: "2px 2px 2px #00000066",
            }}
          >
            <Typography
              onClick={() => setOpenViewBook(true)}
              style={{ color: "white", fontSize: "16px" }}
            >
              {i18n.t("modules.books.book.bookBrowser")}
            </Typography>
          </Box>
          <Box
            style={{
              position: "absolute",
              zIndex: 1000,
              backgroundColor: Colors.tealc,
              top: mobile ? 25 : 90,
              left: mobile ? 0 : -10,
              padding: "5px",
              borderRadius: "3px",
              boxShadow: "1px 1px 1px #00000066",
            }}
          >
            <Typography style={{ color: "white", fontSize: "12px" }}>
              {i18n.t("modules.books.book.new")}
            </Typography>
          </Box>
          <CardMedia image={book?.coverPage} height='auto' />
        </Grid>
        <Grid item xs={12} md={4} textAlign='start'>
          <GStyled.Title fontSize='18px' style={{ fontWeight: 700 }}>
            {book?.title}
          </GStyled.Title>
          <Typography style={{ marginTop: "10px" }}>{book?.price} $</Typography>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
            mt='10px'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.text")}
            </GStyled.SubTitle>
            <Typography>{book?.price}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.design")}
            </GStyled.SubTitle>
            <Typography>{book?.designer}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.translation")}
            </GStyled.SubTitle>
            <Typography>{book?.translator}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.pages")}
            </GStyled.SubTitle>
            <Typography>{book?.pages}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.language")}
            </GStyled.SubTitle>
            <Typography>{book?.lang}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
            mt='10px'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.weight")}
            </GStyled.SubTitle>
            <Typography>{book?.weight}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
          >
            <GStyled.SubTitle style={{ fontWeight: 700 }}>
              {i18n.t("modules.books.book.size")}
            </GStyled.SubTitle>
            <Typography>{book?.size}</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
            mt={mobile ? "40px" : "80px"}
          >
            <CollectionBrowser
              title={i18n.t("modules.books.book.collectionBrowser")}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Roster;
