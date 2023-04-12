import { Button, Typography } from "@mui/material";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa"
import { i18n } from "../../../translations/i18n";
import { useDispatch } from "react-redux";
import { googleSignInStart } from "../../../slicer/user/user.actions";
import EmailPass from "./EmailPass";

const Enter = () => {
  const dispatch = useDispatch();
  const handleGoogleSigniIn = () => {
    dispatch(googleSignInStart());
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "40px" }}>
      <div
        style={{
          width: "450px",
          display: "flex",
          flexDirection: "column",
          rowGap: "25px",
        }}
      >
        <Button
          onClick={handleGoogleSigniIn}
          style={{
            backgroundColor: "#de5246",
            color: "#FFFFFF",
            display: "flex",
            columnGap: "6px",
            borderRadius: "14px",
            width: "100%",
          }}
        >
          <BsGoogle color='white' size={"1.8em"} /> &nbsp;
          <Typography
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            {i18n.t("modules.login.google")}
          </Typography>
        </Button>
        <Button

          style={{
            backgroundColor: "#4267B2",
            color: "#FFFFFF",
            display: "flex",
            columnGap: "6px",
            borderRadius: "14px",
            width: "100%",
          }}
        >
          <FaFacebookF color='white' size={"1.8em"} /> &nbsp;
          <Typography
            style={{
              fontSize: "16px",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            {i18n.t("modules.login.facebook")}
          </Typography>
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ height: "1px", width: "45%", backgroundColor: "#00000066" }} />
        <Typography>{i18n.t("modules.login.or")}</Typography>
        <div style={{ height: "1px", width: "45%", backgroundColor: "#00000066" }} />
      </div>
      <EmailPass />
    </div>
  );
};

export default Enter;
