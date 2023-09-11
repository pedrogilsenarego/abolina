import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import TextField from "../../../components/Inputs/TextFieldForm";
import { i18n } from "../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

import { Typography } from "@mui/material";
import { useState } from "react";
import Popup from "../../../components/BasicPopup";
import { Icons } from "../../../components/Icons";
import { Colors } from "../../../constants/pallette";
import { State } from "../../../slicer/types";
import {
  mutateUserSettings,
  recoverPassword,
} from "../../../slicer/user/user.actions";
import { CurrentUser } from "../../../slicer/user/user.types";
import * as Styled from "../../../styles";
import { Title } from "../../../styles";

interface FORM {
  displayName: string;
}

const GeneralData = () => {
  const [disableForm, setDisableForm] = useState<boolean>(true);
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const INITIAL_STATE: FORM = {
    displayName: currentUser.displayName,
  };
  const dispatch = useDispatch();

  const changePasswordPopup = () => {
    const handleChangePassword = () => {
      dispatch(recoverPassword(currentUser.email));
      setChangePassword(false);
    };
    return (
      <Popup
        openPopup={changePassword}
        onClose={() => setChangePassword(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <Title align="center" fontSize="20px" fontWeight="bold">
            {i18n.t("modules.clientManagement.general.changePasswordTitle")}
          </Title>
          <Typography
            style={{
              color: Colors.darkGrey,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {i18n.t(
              "modules.clientManagement.general.changePasswordHelperText"
            )}
            <b style={{ color: Colors.tealc, textDecoration: "underline" }}>
              {currentUser.email}
            </b>
            {i18n.t(
              "modules.clientManagement.general.changePasswordHelperText2"
            )}
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleChangePassword}
              label={i18n.t(
                "modules.clientManagement.general.confirmChangePassword"
              )}
            />
          </div>
        </div>
      </Popup>
    );
  };

  const handleSubmit = (values: FORM) => {
    const payload = {
      userFields: values,
      id: currentUser.id,
    };
    dispatch(mutateUserSettings(payload));
  };
  return (
    <>
      <Formik
        initialValues={{ ...INITIAL_STATE }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <Styled.SubTitle style={{ fontWeight: 800 }}>
            {i18n.t("modules.clientManagement.generalSettings")}
          </Styled.SubTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              alignItems: "start",
              marginTop: "20px",
            }}
          >
            <TextField
              disabled={disableForm}
              fullWidth
              label={i18n.t("modules.clientManagement.general.name")}
              name="displayName"
            />
            <Typography
              onClick={() => setChangePassword(true)}
              style={{
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.clientManagement.general.changePassword")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                columnGap: "25px",

                width: "100%",
              }}
            >
              <Button
                fullWidth
                leftIcon={<Icons.Edit />}
                onClick={() => setDisableForm(!disableForm)}
                label={i18n.t("modules.clientManagement.general.edit")}
              />
              <Button
                fullWidth
                leftIcon={<Icons.Save />}
                formik
                label={i18n.t("modules.clientManagement.general.submit")}
              />
            </div>
          </div>
        </Form>
      </Formik>
      {changePasswordPopup()}
    </>
  );
};

export default GeneralData;
