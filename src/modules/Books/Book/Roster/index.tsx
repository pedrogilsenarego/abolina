import {
  Grid,
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

interface Props {
  setOpenViewBook: (openViewBook: boolean) => void;
  book: any
}

const Roster = ({ setOpenViewBook, book }: Props) => {

  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));


  return (

    <Grid container columnSpacing={4} >
      <Grid item xs={12} md={8} style={{ position: "relative" }}>


        <Box display="flex" justifyContent="end">
          {!mobile && (<Box width="20%">
            <Box
              style={{

                zIndex: 1000,
                backgroundColor: Colors.tealc,
                marginTop: "20px",
                padding: "5px",
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

          </Box>)}

          <Box width={mobile ? "100%" : "80%"} style={{ position: "relative" }}>
            {mobile && (<Box width="20%">
              <Box
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  backgroundColor: Colors.tealc,
                  top: -24,
                  left: 16,
                  padding: "5px",
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

            </Box>)}

            {(book?.newBook ?? true) && (<Box
              style={{
                position: "absolute",
                zIndex: 1000,
                backgroundColor: Colors.tealc,
                top: mobile ? 40 : 90,
                left: "0px",
                padding: "5px",
                borderRadius: "3px",
                boxShadow: "1px 1px 1px #00000066",
              }}
            >
              <Typography style={{ color: "white", fontSize: "12px" }}>
                {i18n.t("modules.books.book.new")}
              </Typography>
            </Box>)}
            <CardMedia image={book?.coverPage} height='auto' />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} textAlign='start'>
        <GStyled.Title fontSize='18px' style={{ fontWeight: 700 }}>
          {book?.title}
        </GStyled.Title>

        <Box
          display='flex'
          flexDirection='row'
          columnGap={1}
          alignItems='center'
          mt='10px'
        >
          <GStyled.SubTitle style={{ fontWeight: 700 }}>
            {i18n.t("modules.books.book.price")}
          </GStyled.SubTitle>
          <Typography>{book?.price} €</Typography>
        </Box>
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
          <Typography>{book?.author}</Typography>
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
          <Typography>{book?.language}</Typography>
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

  );
};

export default Roster;
