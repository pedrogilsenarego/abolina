import { Container, Box, Typography, Grid } from "@mui/material";
import * as GStyled from "../../../styles";
import { i18n } from "../../../translations/i18n";
import Tile from "./Tile";
import Roster from "./Roster";

const Book = () => {
  return (
    <Container maxWidth='md'>
      <Roster />
      <Box display='flex' justifyContent='start' mt="40px">
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
  );
};

export default Book;
