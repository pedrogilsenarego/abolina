import { Grid, Container, Box, Typography } from "@mui/material";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import CollectionBrowser from "./CollectionBrowser";

const Roster = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8}>
          Teste
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
