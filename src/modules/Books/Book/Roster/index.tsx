import { Grid, Container, Box, Typography } from "@mui/material";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import CollectionBrowser from "./CollectionBrowser";
import CardMedia from "../../../../components/CardMedia";
import { Colors } from "../../../../constants/pallette";

const Roster = () => {
  const NO_IMAGE =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbh3GAPtK7QrdkExHGr4LIms8QEOrFJytFvA&usqp=CAU";

  return (
    <Container>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8} style={{ position: "relative" }}>
          <Box
            style={{
              position: "absolute",
              zIndex: 1000,
              backgroundColor: Colors.tealc,
              top: 30,
              left: -10,
              padding: "10px",
              borderRadius: "3px",
              cursor: "pointer"
            }}
          >

            <Typography style={{ color: "white", fontSize: "16px" }}>
              {i18n.t("modules.books.book.bookBrowser")}
            </Typography>
          </Box>
          <Box
            style={{
              position: "absolute",
              zIndex: 1000,
              backgroundColor: Colors.tealc,
              top: 90,
              left: -10,
              padding: "5px",
              borderRadius: "3px",

            }}
          >

            <Typography style={{ color: "white", fontSize: "12px" }}>
              {i18n.t("modules.books.book.new")}
            </Typography>
          </Box>
          <CardMedia image={NO_IMAGE} height='auto' />
        </Grid>
        <Grid item xs={12} md={4} textAlign='start'>
          <GStyled.Title fontSize='18px' style={{ fontWeight: 700 }}>
            {i18n.t("modules.books.book.bookTitle")}
          </GStyled.Title>
          <Typography style={{ marginTop: "10px" }}>Custo $</Typography>
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
            <Typography>Texto</Typography>
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
            <Typography>Design</Typography>
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
            <Typography>Translation</Typography>
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
            <Typography>20</Typography>
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
            <Typography>PT</Typography>
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
            <Typography>Peso</Typography>
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
            <Typography>Dim</Typography>
          </Box>
          <Box
            display='flex'
            flexDirection='row'
            columnGap={1}
            alignItems='center'
            mt='80px'
          >
            <CollectionBrowser />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Roster;
