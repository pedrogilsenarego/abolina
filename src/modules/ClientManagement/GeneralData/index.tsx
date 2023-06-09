import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import TextField from "../../../components/Inputs/TextFieldForm";
import { i18n } from "../../../translations/i18n";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";

import { CurrentUser } from "../../../slicer/user/user.types";
import { State } from "../../../slicer/types";
import { mutateUserSettings, recoverPassword } from "../../../slicer/user/user.actions";
import { Typography } from "@mui/material";
import { useState } from "react";
import Popup from "../../../components/BasicPopup";
import { Title } from "../../../styles";

interface FORM {
  displayName: string;
}

const GeneralData = () => {
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
      dispatch(recoverPassword(currentUser.email))
      setChangePassword(false)
    }
    return (
      <Popup
        openPopup={changePassword}
        setOpenPopup={setChangePassword}
        onClose={() => setChangePassword(false)}
      >
        <div style={{ display: "flex", flexDirection: "column", rowGap: "30px" }}>
          <Title>
            {i18n.t("modules.clientManagement.general.changePasswordTitle")}
          </Title>
          <Typography>
            {i18n.t(
              "modules.clientManagement.general.changePasswordHelperText"
            )}
            <b>{currentUser.email}</b>
          </Typography>
          <Button
            onClick={handleChangePassword}
            label={i18n.t(
              "modules.clientManagement.general.confirmChangePassword"
            )}
          />
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
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <TextField
              label={i18n.t("modules.clientManagement.general.name")}
              name='displayName'
            />

            <Button
              formik
              label={i18n.t("modules.clientManagement.general.submit")}
            />
          </div>
          <Typography
            onClick={() => setChangePassword(true)}
            style={{ cursor: "pointer", textAlign: "left", marginTop: "20px" }}
          >
            {i18n.t("modules.clientManagement.general.changePassword")}
          </Typography>
        </Form>
      </Formik>
      {changePasswordPopup()}
    </>
  );
};

export default GeneralData;
