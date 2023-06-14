import { Coupons, CurrentUser } from "../../../slicer/user/user.types";
import { State } from "../../../slicer/types";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Title } from "../../../styles";
import { i18n } from "../../../translations/i18n";



const CouponsAvailable = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate()




  return (
    <>
      <Title>{i18n.t("modules.clientManagement.coupons.title")}</Title>
      <div style={{ display: "flex", flexDirection: "column", rowGap: "20px", marginTop: "30px" }}>
        {currentUser?.coupons?.map((item: Coupons, pos: number) => {
          return (
            <div key={pos} >
              <Typography style={{ textAlign: "left", cursor: "pointer" }} onClick={() =>
                navigate(
                  ROUTE_PATHS.BOOKS_BOOK.replace(":id", item.bookId.toString())
                )
              }>
                {item?.title}
              </Typography>
              {item?.couponId?.map((coupon: string, pos: number) => {
                return (
                  <div>
                    <Typography key={pos} style={{ fontSize: "20px", fontWeight: 800, textAlign: "left" }}>
                      {coupon}
                    </Typography>
                  </div>
                )
              })}
            </div>
          )
        })}

      </div>
    </>
  );
};

export default CouponsAvailable;
