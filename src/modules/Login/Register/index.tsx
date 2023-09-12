import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Popup from "../../../components/BasicPopup";
import Button from "../../../components/Button";
import CheckBox from "../../../components/Inputs/CheckBoxForm";
import TextField from "../../../components/Inputs/TextFieldForm";
import { Colors } from "../../../constants/pallette";
import { ROUTE_PATHS } from "../../../constants/routes";
import { signUpUserStart } from "../../../slicer/user/user.actions";
import { Title } from "../../../styles";
import { i18n } from "../../../translations/i18n";
import ValidationHelper from "./ValidationHelper";
import { FORM_VALIDATION } from "./validation";

export interface FORM {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  acceptTerms: boolean;
}

const Register = () => {
  const navigate = useNavigate();
  const INITIAL_STATE: FORM = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    acceptTerms: false,
  };
  const dispatch = useDispatch();
  const handleSubmit = (values: FORM) => {
    dispatch(signUpUserStart(values));
    navigate(ROUTE_PATHS.HOME);
  };
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  // const [openPopup, setOpenPopup] = useState(true);

  return (
    <div style={{ width: mobile ? "90vw" : "450px" }}>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <ValidationHelper mobile={mobile} />
            <TextField label={i18n.t("modules.login.name")} name="name" />
            <TextField label={i18n.t("modules.login.email")} name="email" />
            <TextField
              password
              label={i18n.t("modules.login.password")}
              name="password"
            />
            <TextField
              password
              label={i18n.t("modules.login.confirmPassword")}
              name="confirmPassword"
            />
            <CheckBox
              name="acceptTerms"
              color={Colors.tealc}
              label={i18n.t("modules.login.acceptTerms")}
            />
            <Button formik label={i18n.t("modules.login.createAccount")} />
          </div>
        </Form>
      </Formik>
      {/*<Popup openPopup={openPopup} onClose={() => setOpenPopup(false)}>
        <div
          style={{
            display: "flex",
            padding: "10px 30px",
            flexDirection: "column",
            rowGap: "5px",
            justifyContent: "center",
          }}
        >
          <Title
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            {i18n.t("popups.readOnApp.title")}
          </Title>
          <div>
            <Typography fontWeight="bold" style={{ textAlign: "center" }}>
              {i18n.t("popups.readOnApp.first")}
            </Typography>
            <Typography
              style={{
                color: Colors.tealc,
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "18px",
              }}
            >
              {i18n.t("popups.readOnApp.second")}
            </Typography>
            <div
              style={{
                display: "flex",
                columnGap: "5px",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              <Typography style={{ fontWeight: "bold", lineHeight: "20px" }}>
                {i18n.t("popups.readOnApp.third")}
              </Typography>
              <Typography
                style={{
                  color: Colors.tealc,
                  textDecoration: "underline",
                  fontWeight: "bold",
                  cursor: "pointer",
                  lineHeight: "20px",
                }}
              >
                {i18n.t("popups.readOnApp.forth")}
              </Typography>
            </div>
          </div>
        </div>
              </Popup>*/}
    </div>
  );
};

export default Register;
