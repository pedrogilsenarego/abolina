import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import CollectionBrowser from "./CollectionBrowser";
import CardMedia from "../../../../components/CardMedia";
import { Colors } from "../../../../constants/pallette";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { FiShoppingCart } from "react-icons/fi";
import { Book } from "../../../../slicer/books/books.types";
import { addProductToCart } from "../../../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../../../slicer/general/general.actions";


interface Props {
  setOpenViewBook: (openViewBook: boolean) => void;
  book: Book;
}


const Roster = ({ setOpenViewBook, book }: Props) => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch()
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const handleAddToCart = () => {
    dispatch(addProductToCart([book]))
    dispatch(updateSuccessNotification(`${i18n.t("notifications.success.addedCart")}`))
  }


  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12} md={8}>
        <Box display='flex' justifyContent='end'>
          {!mobile && (
            <Box width='20%' style={{ position: "relative" }}>
              <Box
                style={{
                  backgroundColor: Colors.tealc,
                  marginTop: "20px",
                  position: "absolute",
                  padding: "5px 15px 5px 15px",
                  borderRadius: "3px",
                  right: "-5px",
                  width: "calc(100% + 5px)",
                  zIndex: 1000,
                  cursor: "pointer",
                  boxShadow: "2px 2px 2px #00000066",
                }}
              >
                <Typography
                  onClick={() => setOpenViewBook(true)}
                  style={{
                    color: "white",
                    fontSize: "14px",
                    lineHeight: "14px",
                    whiteSpace: "pre-line"
                  }}
                >
                  {i18n.t("modules.books.book.bookBrowser")}
                </Typography>
              </Box>
            </Box>
          )}

          <Box width={mobile ? "100%" : "80%"} style={{ position: "relative" }}>
            {mobile && (
              <Box width='20%'>
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

                    style={{ color: "white", fontSize: "16px", }}
                  >
                    {i18n.t("modules.books.book.bookBrowser")}
                  </Typography>
                </Box>
              </Box>
            )}

            {(book?.newBook ?? true) && (
              <Box
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  backgroundColor: Colors.tealc,
                  top: mobile ? 40 : 90,
                  left: "-5px",
                  padding: "3px 20px 3px 20px",
                  borderRadius: "3px",
                  boxShadow: "1px 1px 1px #00000066",
                }}
              >
                <Typography style={{ color: "white", fontSize: "12px" }}>
                  {i18n.t("modules.books.book.new")}
                </Typography>
              </Box>
            )}
            <CardMedia image={book?.coverPage} height='auto' />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} textAlign='start' style={{ display: "flex", flexDirection: "column", }}>
        <GStyled.Title
          fontSize='18px'
          style={{ fontWeight: 700, marginTop: mobile ? "20px" : "0px" }}
        >
          {(lang === "PT" ? book?.title : book?.titleEN) || ""}
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
        <div onClick={handleAddToCart} style={{ cursor: "pointer", marginTop: "30px", columnGap: "10px", justifyContent: "center", textAlign: "center", display: "flex", color: "white", backgroundColor: Colors.tealc, borderRadius: "10px", padding: "10px" }}>
          <FiShoppingCart size='1.5em' color='white' />
          <Typography fontSize="18px" style={{ textTransform: "uppercase", fontWeight: 800 }}>
            {i18n.t("modules.books.book.addToCart")}
          </Typography>
        </div>
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
