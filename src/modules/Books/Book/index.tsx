import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Book } from "../../../slicer/books/books.types";
import { BsCartPlus, BsStars } from "react-icons/bs";
import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";
import { i18n } from "../../../translations/i18n";
import CardMedia from "../../../components/CardMedia";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Colors } from "../../../constants/pallette";
import useBooks from "../useBooks";
import { useState } from "react";
import Icon from "../../../components/Icon";

interface Props {
  book: Book;
}

const BookComponent = ({ book }: Props) => {
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const theme = useTheme();
  const [hover, setHover] = useState<boolean>();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { lang, handleAddToCart } = useBooks();

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        height: "100%",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        boxShadow:
          hover && !mobile
            ? "0 12px 30px 0px #00000026"
            : "0 4px 16px 0px #00000040",
        transform:
          hover && !mobile
            ? "translate(0px,-6px) scale(1.005)"
            : "translate(0px,0px) scale(1)",
      }}
    >
      {book?.newBook !== "available" && (
        <Box
          style={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: Colors.tealc,
            top: "10%",
            left: vertical ? "0px" : "-5px",
            padding: "3px 20px 3px 20px",
            borderRadius: "3px",
            boxShadow: "1px 1px 1px #00000066",
          }}
        >
          <BsStars
            size='1.2rem'
            color='yellow'
            style={{
              position: "absolute",
              left: "-10%",
              top: "-40%",
            }}
          />
          <Typography style={{ color: "white", fontSize: "12px" }}>
            {book?.newBook === "new"
              ? i18n.t("modules.books.book.new")
              : i18n.t("modules.books.book.soon")}
          </Typography>
        </Box>
      )}
      <CardMedia
        height={mobile ? "170" : "200"}
        borderRadius='0px'
        image={book?.coverPage}
        onClick={() =>
          navigate(
            ROUTE_PATHS.BOOKS_BOOK.replace(":id", book?.documentID.toString())
          )
        }
      />
      <Box
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: mobile ? "5px" : "10px",
          position: "relative",
        }}
      >
        {book?.discount && (
          <div
            style={{
              position: "absolute",
              top: mobile ? "-17.5px" : "-25px",
              right: mobile ? "-5px" : "-10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              padding: mobile ? "5px" : "10px",
              height: mobile ? "35px" : "50px",
              aspectRatio: 1,
              backgroundColor: Colors.tealc,
            }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: mobile ? "14px" : "18px",
              }}
            >
              {book?.discount}%
            </Typography>
          </div>
        )}
        <Typography
          color={Colors.tealc}
          style={{
            fontWeight: 800,
            fontSize: mobile ? "12px" : "16px",
          }}
        >
          Nº {book?.number}
        </Typography>
        <Typography style={{ fontWeight: 800, textAlign: "left" }}>
          {(lang === "PT" ? book?.title : book?.titleEN) || ""}
        </Typography>
        <div
          style={{
            marginTop: "0px",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: mobile ? "0px" : "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              columnGap: "10px",
              alignItems: "center",
            }}
          >
            {book?.discount && (
              <Typography
                style={{
                  textDecoration: "line-through",
                  fontWeight: 800,
                }}
              >
                €{book?.price}
              </Typography>
            )}
            <Typography
              color={Colors.tealc}
              style={{
                fontWeight: 800,
                fontSize: mobile ? "18px" : "23px",
              }}
            >
              €
              {book?.discount
                ? (book?.price * (book?.discount / 100)).toFixed(2)
                : book?.price}
            </Typography>
            <Typography
              color={Colors.tealc}
              style={{
                textTransform: "uppercase",
                fontWeight: 800,
                fontSize: mobile ? "12px" : "14px",
                marginLeft: "-5px",
              }}
            >
              {i18n.t("modules.books.book.digital")}
            </Typography>
          </div>
          {book?.newBook !== "soon" && (
            <div
              onClick={() => handleAddToCart(book)}
              style={{ paddingRight: "5px", cursor: "pointer" }}
            >
              <Icon
                colorHover={Colors.tealc}
                icon={
                  <BsCartPlus
                    color={Colors.darkGrey}
                    size={mobile ? "1.5rem" : "2rem"}
                  />
                }
              />
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default BookComponent;
