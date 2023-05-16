import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import * as GStyled from "../../../../styles";
import { i18n } from "../../../../translations/i18n";
import CardMedia from "../../../../components/CardMedia";
import { Colors } from "../../../../constants/pallette";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { FiShoppingCart } from "react-icons/fi";
import { Book } from "../../../../slicer/books/books.types";
import { addProductToCart } from "../../../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../../../slicer/general/general.actions";
import { BsBook, BsPlayCircle } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { caracteristics, formatTypes } from "../../../../constants/admin";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../../constants/routes";

interface Props {
  setOpenViewBook: (openViewBook: boolean) => void;
  book: Book;
}

const Roster = ({ setOpenViewBook, book }: Props) => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [format, setFormat] = useState<string>(
    book?.format ? book?.format[0] : ""
  );
  const navigate = useNavigate()
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );

  const handleAddToCart = () => {
    dispatch(addProductToCart([book]));
    dispatch(
      updateSuccessNotification(`${i18n.t("notifications.success.addedCart")}`)
    );
  };

  return (
    <div>
      {" "}

      <div>
        <div
          onClick={() => navigate(ROUTE_PATHS.BOOKS, { state: { collection: book?.collections || "" } })}
          style={{
            display: "flex",
            columnGap: "5px",
            alignItems: "center",
            position: "relative",
          }}
        >
          <AiOutlineArrowLeft
            color={Colors.tealc}
            size='0.8rem'
            style={{ position: "absolute", left: "-15px" }}
          />
          <Typography
            style={{
              paddingTop: "5px",
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "18px",
              cursor: "pointer",

            }}
          >
            {i18n.t("modules.books.book.backCollection")}
          </Typography>
        </div>
        {vertical && (
          <GStyled.Title
            fontSize='18px'
            style={{ fontWeight: 700, textAlign: "start", marginTop: "6px" }}
          >
            {(lang === "PT" ? book?.title : book?.titleEN) || ""}
          </GStyled.Title>

        )}
      </div>
      <Grid container columnSpacing={4} style={{ marginTop: vertical ? "0px" : "20px" }}>
        <Grid item xs={12} md={8}>
          <Box display='flex' justifyContent='end'>
            {!mobile && (
              <Box width='20%' style={{ position: "relative" }}>
                <Box
                  style={{
                    display: "flex",
                    columnGap: "6px",
                    backgroundColor: Colors.tealc,
                    marginTop: "20px",
                    position: "absolute",
                    padding: "5px 12px 5px 12px",
                    borderRadius: "3px",
                    right: "-5px",
                    width: "calc(100% + 5px)",
                    zIndex: 900,
                    cursor: "pointer",
                    alignItems: "center",
                    boxShadow: "2px 2px 2px #00000066",
                  }}
                >
                  <BsBook size='1.2rem' color='white' />
                  <Typography
                    onClick={() => setOpenViewBook(true)}
                    style={{
                      color: "white",
                      fontSize: "14px",
                      lineHeight: "14px",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {i18n.t("modules.books.book.bookBrowser")}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              width={mobile ? "100%" : "80%"}
              style={{
                position: "relative",
                marginTop: vertical ? "40px" : "0px",
              }}
            >
              {mobile && (
                <Box
                  width='20%'
                  style={{
                    position: "absolute",
                    top: -24,
                    left: 16,
                    zIndex: 1000,
                    display: "flex",
                    columnGap: "15px",
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: Colors.tealc,
                      padding: "8px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      boxShadow: "2px 2px 2px #00000066",
                    }}
                  >
                    <BsBook size='1.2rem' color='white' />
                    <Typography
                      onClick={() => setOpenViewBook(true)}
                      style={{
                        color: "white",
                        fontSize: "14px",
                        whiteSpace: "pre-line",
                        lineHeight: "14px",
                      }}
                    >
                      {i18n.t("modules.books.book.bookBrowser")}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      backgroundColor: Colors.tealc,

                      padding: "8px",
                      borderRadius: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      columnGap: "5px",
                      boxShadow: "2px 2px 2px #00000066",
                    }}
                  >
                    <BsPlayCircle size='1.2rem' color='white' />
                    <Typography
                      onClick={() => setOpenViewBook(true)}
                      style={{
                        color: "white",
                        fontSize: "14px",
                        whiteSpace: "pre-line",
                        lineHeight: "14px",
                      }}
                    >
                      {i18n.t("modules.books.book.peakDigital")}
                    </Typography>
                  </Box>
                </Box>
              )}

              {book?.newBook !== "undefined" && (
                <Box
                  style={{
                    position: "absolute",
                    zIndex: 1000,
                    backgroundColor: Colors.tealc,
                    top: "88%",
                    left: vertical ? "-5px" : "-50px",
                    padding: "3px 20px 3px 20px",
                    borderRadius: "3px",
                    boxShadow: "1px 1px 1px #00000066",
                  }}
                >
                  <BsStars
                    size='1.2rem'
                    color='yellow'
                    style={{ position: "absolute", left: "-10%", top: "-40%" }}
                  />
                  <Typography style={{ color: "white", fontSize: "12px" }}>
                    {book?.newBook === "new"
                      ? i18n.t("modules.books.book.new")
                      : i18n.t("modules.books.book.soon")}
                  </Typography>
                </Box>
              )}
              <CardMedia image={book?.coverPage} height='auto' />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          textAlign='start'
          style={{ display: "flex", flexDirection: "column" }}
        >
          {!vertical && (
            <GStyled.Title
              fontSize='18px'
              style={{ fontWeight: 700, marginTop: mobile ? "20px" : "0px" }}
            >
              {(lang === "PT" ? book?.title : book?.titleEN) || ""}
            </GStyled.Title>
          )}

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
            <Typography
              style={{
                textDecoration: book?.discount ? "line-through" : "none",
              }}
            >
              {book?.price} €
            </Typography>
            {book?.discount !== 0 && book?.discount && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <Typography style={{ color: Colors.tealc, fontWeight: 800 }}>
                  {(Number(book?.price) * (1 - book?.discount / 100)).toFixed(
                    2
                  )}{" "}
                  €
                </Typography>
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: Colors.tealc,
                    borderRadius: "50%",
                    color: "white",
                    fontWeight: 800,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "14px",
                    position: "relative",
                    marginTop: "-3px",
                  }}
                >
                  <BsStars
                    size='1.2rem'
                    color='yellow'
                    style={{ position: "absolute", left: "-10%", top: "-40%" }}
                  />
                  <Typography style={{ fontSize: "14px" }}>
                    {book?.discount}%
                  </Typography>
                </div>
              </div>
            )}
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
          {book?.caracteristics && (
            <Box
              display='flex'
              flexDirection='row'
              columnGap={1}
              alignItems='center'
            >
              <GStyled.SubTitle style={{ fontWeight: 700 }}>
                {i18n.t("modules.books.book.caracteristics")}
              </GStyled.SubTitle>
              <div style={{ display: "flex", columnGap: "8px" }}>
                {book?.caracteristics?.map((item, pos) => (
                  <div
                    key={pos}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px 10px 2px 10px",
                      borderRadius: "4px",
                      color: "white",
                      backgroundColor: Colors.tealc,
                    }}
                  >
                    <Typography style={{}}>
                      {lang === "EN"
                        ? caracteristics.find((obj) => obj["value"] === item)
                          ?.title
                        : caracteristics.find((obj) => obj["value"] === item)
                          ?.titlePT}
                    </Typography>
                  </div>
                ))}
              </div>
            </Box>
          )}
          {book?.format && (
            <div
              style={{ display: "flex", marginTop: "20px", columnGap: "10px" }}
            >
              {book?.format.map((item, pos) => (
                <Typography
                  onClick={() => setFormat(item)}
                  style={{
                    paddingLeft: pos > 0 ? "10px" : "0px",
                    borderLeft: pos > 0 ? `3px solid ${Colors.tealc}` : "none",

                    textDecoration: format === item ? "underline" : "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: format === item ? Colors.tealc : "black",
                    fontWeight: 800,
                  }}
                  key={pos}
                >
                  {lang === "EN"
                    ? formatTypes.find((obj) => obj["value"] === item)?.title
                    : formatTypes.find((obj) => obj["value"] === item)?.titlePT}
                </Typography>
              ))}
            </div>
          )}
          <div
            onClick={handleAddToCart}
            style={{
              cursor: "pointer",
              marginTop: "30px",
              columnGap: "10px",
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              color: "white",
              backgroundColor: Colors.tealc,
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <FiShoppingCart size='1.5rem' color='white' />
            <Typography
              fontSize='18px'
              style={{ textTransform: "uppercase", fontWeight: 800 }}
            >
              {i18n.t("modules.books.book.addToCart")}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Roster;
