import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CgSmartphone } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { Colors } from "../../../constants/pallette";
import { updateCart } from "../../../slicer/cart/cart.actions";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { State } from "../../../slicer/types";
import { i18n } from "../../../translations/i18n";

interface Props {
  item: CartProduct;
  pos: number;
}

const Element = ({ item, pos }: Props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );
  const handleUpdateSubtotal = (value: number) => {
    dispatch(updateCart(value, item.product.documentID));
  };

  const renderLaptop = () => {
    return (
      <Grid
        container
        key={pos}
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          borderBottom: `solid 2px ${Colors.tealc}`,
        }}
      >
        <Grid
          item
          key={pos}
          xs={vertical ? 4 : 5}
          style={{
            display: "flex",
            columnGap: "20px",
            alignItems: "start",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              alignItems: "start",
              height: "100%",
            }}
          >
            <img
              style={{
                width: vertical ? "120px" : "200px",
                aspectRatio: 1,
                objectFit: "cover",
              }}
              src={item.product.coverPage}
              alt={item.product.title}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={vertical ? 8 : 7}
          style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}
        >
          <div>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              {item.product.title}
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              {item.product.collections}
            </Typography>
            <Typography style={{ textAlign: "left" }}>
              Nº{item.product.number}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <CgSmartphone
                size="2rem"
                color={Colors.tealc}
                style={{ marginLeft: "-8px" }}
              />
              <Typography
                style={{
                  textTransform: "uppercase",
                  color: Colors.tealc,
                  fontSize: "12px",
                }}
              >
                {i18n.t("modules.cart.table.readOnApp")}
              </Typography>
            </div>
            <Typography style={{ textAlign: "left" }}>
              €{item?.product?.price}
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  };

  const renderMobile = () => {
    return (
      <div
        key={pos}
        style={{
          width: "92vw",

          borderBottom: `solid 2px ${Colors.tealc}`,
        }}
      >
        <div>
          <Grid
            container
            columnSpacing="10px"
            alignItems="center"
            style={{
              width: "auto",
              height: "150px",
              backgroundColor: "white",
            }}
          >
            <Grid
              item
              xs={4}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  aspectRatio: 1,
                  width: "100%",
                  objectFit: "cover",
                }}
                src={item.product.coverPage}
                alt={item.product.title}
              />
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",

                height: "100%",
                padding: "20px 10px",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{}}>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {item.product.title}
                </Typography>
                <Typography style={{ textAlign: "left", fontSize: "12px" }}>
                  {item.product.collections}
                </Typography>
                <Typography style={{ textAlign: "left", fontSize: "12px" }}>
                  Nº{item.product.number}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Typography>teste</Typography>
                </div>
                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CgSmartphone size="1.2rem" color={Colors.grey} />
                  <Typography
                    style={{
                      textTransform: "uppercase",
                      color: Colors.grey,
                      fontSize: "10px",
                    }}
                  >
                    {i18n.t("modules.cart.table.readOnApp")}
                  </Typography>
                </div>
                <div>
                  <Typography fontWeight={800}>
                    €{item?.product?.price}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };

  return mobile ? renderMobile() : renderLaptop();
};

export default Element;
