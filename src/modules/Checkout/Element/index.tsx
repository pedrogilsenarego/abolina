import { Grid, Typography } from "@mui/material";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { Colors } from "../../../constants/pallette";
import { AiOutlineClose } from "react-icons/ai";
import CheckBox from "../../../components/Inputs/CheckBox";
import { i18n } from "../../../translations/i18n";
import { CgSmartphone } from "react-icons/cg";
import Incrementor from "../../../components/Incrementor";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  updateCart,
} from "../../../slicer/cart/cart.actions";
import { State } from "../../../slicer/types";

interface Props {
  item: CartProduct;
  pos: number;
}

const Element = ({ item, pos }: Props) => {

  const dispatch = useDispatch();
  const vertical = useSelector<State, boolean>((state) => state.general.positionVertical)
  const handleUpdateSubtotal = (value: number) => {
    dispatch(updateCart(value, item.product.documentID));
  };



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

              width: vertical ? "100px" : "200px",
              objectFit: "contain",
            }}
            src={item.product.coverPage}
            alt={item.product.title}
          />
        </div>
      </Grid>
      <Grid item xs={vertical ? 8 : 7} style={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
        <Typography
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "left" }}
        >
          {item.product.title}
        </Typography>
        <Typography style={{ textAlign: "left" }}>
          {item.product.collections}
        </Typography>
        <Typography style={{ textAlign: "left" }}>
          Nº{item.product.number}
        </Typography>


        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <CgSmartphone
              size='2rem'
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
    </Grid >
  );
};

export default Element;
