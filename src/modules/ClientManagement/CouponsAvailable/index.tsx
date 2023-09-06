import { Typography } from "@mui/material";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Colors, Pallette } from "../../../constants/pallette";
import { ROUTE_PATHS } from "../../../constants/routes";
import { State } from "../../../slicer/types";
import { Coupons, CurrentUser } from "../../../slicer/user/user.types";
import * as Styled from "../../../styles";
import { i18n } from "../../../translations/i18n";

const CouponsAvailable = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();

  return (
    <>
      <Styled.SubTitle style={{ fontWeight: 800 }}>
        {i18n.t("modules.clientManagement.couponsSettings")}
      </Styled.SubTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginTop: "20px",
        }}
      >
        {currentUser?.coupons?.map((item: Coupons, pos: number) => {
          return (
            <div key={pos}>
              <Typography
                style={{ textAlign: "left", cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    ROUTE_PATHS.BOOKS_BOOK.replace(
                      ":id",
                      item.bookId.toString()
                    )
                  )
                }
              >
                {item?.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                  marginTop: "5px",
                }}
              >
                {item?.couponId?.map((coupon: string, pos: number) => {
                  const handleClick = async () => {
                    try {
                      await navigator.clipboard.writeText(coupon);
                    } catch (error) {
                      console.error("Failed to copy text: ", error);
                    }
                  };
                  return (
                    <div
                      style={{
                        display: "flex",
                        columnGap: "10px",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: `solid 2px ${Colors.darkGrey}`,
                        borderRadius: "12px",
                        padding: "4px 10px 4px 10px",
                      }}
                    >
                      <Typography
                        key={pos}
                        style={{
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: 800,
                          textAlign: "left",
                          userSelect: "text",
                        }}
                      >
                        {coupon}
                      </Typography>
                      <BiCopy
                        onClick={handleClick}
                        color={Pallette.primaryTransparent}
                        size="1.2rem"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CouponsAvailable;
