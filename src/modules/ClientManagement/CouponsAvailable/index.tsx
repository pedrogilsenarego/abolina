import { Coupons, CurrentUser } from "../../../slicer/user/user.types";
import { State } from "../../../slicer/types";
import { useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";
import { Title } from "../../../styles";
import { i18n } from "../../../translations/i18n";
import ToolTip from "../../../components/Tooltip/Tooltip";
import { Pallette } from "../../../constants/pallette";
import { BiCopy } from "react-icons/bi";

const CouponsAvailable = () => {
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();

  return (
    <>
      <Title>{i18n.t("modules.clientManagement.coupons.title")}</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          marginTop: "30px",
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
              {item?.couponId?.map((coupon: string, pos: number) => {
                const handleClick = async () => {
                  try {
                    await navigator.clipboard.writeText(coupon);
                  } catch (error) {
                    console.error("Failed to copy text: ", error);
                  }
                };
                return (
                  <div style={{display:"flex", columnGap:"10px"}}>
                    <Typography
                     
                      key={pos}
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        fontWeight: 800,
                        textAlign: "left",
                        userSelect: "text",
                      }}
                    >
                      {coupon}
                    </Typography>
                   
                    <ToolTip title={i18n.t("modules.clientManagement.coupons.tooltipCopy")}>
                      <IconButton  onClick={handleClick}>
                        <BiCopy
                          color={Pallette.text}
                          size="1.2rem"
                          style={{ marginTop: "-3px", cursor: "pointer" }}
                        />
                      </IconButton>
                    </ToolTip>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CouponsAvailable;
