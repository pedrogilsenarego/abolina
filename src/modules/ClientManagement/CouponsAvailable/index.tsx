import { IconButton, Typography } from "@mui/material";
import { BiCopy } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ToolTip from "../../../components/Tooltip/Tooltip";
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
          rowGap: "20px",
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
                  marginTop: "10px",
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
                        paddingLeft: "10px",
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

                      <ToolTip
                        title={i18n.t(
                          "modules.clientManagement.coupons.tooltipCopy"
                        )}
                      >
                        <IconButton onClick={handleClick}>
                          <BiCopy
                            color={Pallette.text}
                            size="1.2rem"
                            style={{ cursor: "pointer" }}
                          />
                        </IconButton>
                      </ToolTip>
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
