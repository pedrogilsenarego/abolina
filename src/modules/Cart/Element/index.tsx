import { Grid, Typography } from "@mui/material"
import { CartProduct } from "../../../slicer/cart/cart.types"
import { Colors } from "../../../constants/pallette"
import { AiOutlineClose } from "react-icons/ai"
import CheckBox from "../../../components/Inputs/CheckBox"
import { i18n } from "../../../translations/i18n"
import { CgSmartphone } from "react-icons/cg"
import Incrementor from "../../../components/Incrementor"
import { useState } from "react"

interface Props {
  item: CartProduct
  pos: number
}

const Element = ({ item, pos }: Props) => {
  const [subtotal, setSubtotal] = useState<number>(item.value * item.product.price)
  const [forOffer, setForOffer] = useState<boolean>(false)

  const handleUpdateSubtotal = (value: number) => {
    setSubtotal(value * item.product.price)
  }

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
        xs={1}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AiOutlineClose size='1.5rem' color='black' />
      </Grid>
      <Grid
        item
        xs={5}
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
              height: "200px",
              objectFit: "contain",
            }}
            src={item.product.coverPage}
            alt={item.product.title}
          />
          <CheckBox
            color={Colors.tealc}
            value={forOffer}
            setValue={setForOffer}
            label={
              <div>
                <Typography style={{ fontSize: "18px" }}>
                  {i18n.t("modules.cart.table.offerThisBook")}
                </Typography>
                <Typography
                  style={{
                    marginTop: "-5px",
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: Colors.tealc,
                  }}
                >
                  {i18n.t("modules.cart.table.offerCode")}
                </Typography>
              </div>
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            height: "200px",


          }}
        >
          <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
            {item.product.title}
          </Typography>
          <Typography>Nome da coleção</Typography>
          <Typography>NºX</Typography>
          <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
            <CgSmartphone size='2rem' color={Colors.tealc} style={{ marginLeft: "-8px" }} />
            <Typography style={{ textTransform: "uppercase", color: Colors.tealc, fontSize: "12px" }}>
              {i18n.t("modules.cart.table.readOnApp")}
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
        <Typography>€{item?.product?.price}</Typography>
      </Grid>
      <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
        <Incrementor initialValue={item.value} updateValue={handleUpdateSubtotal} />
      </Grid>
      <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Typography>€{subtotal}</Typography>
      </Grid>
    </Grid>
  )
}

export default Element