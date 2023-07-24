import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import TextField from "../../../components/Inputs/TextFieldForm";
import { i18n } from "../../../translations/i18n";
import { FORM_VALIDATION } from "./validation";

import { Grid } from "@mui/material";
import { useState } from "react";
import SelectWrapper from "../../../components/Inputs/SelectFormValue";
import { countryList } from "../../../constants/forms";
import { State } from "../../../slicer/types";
import { mutateUserSettings } from "../../../slicer/user/user.actions";
import { CurrentUser, InvoiceSettings } from "../../../slicer/user/user.types";
import * as Styled from "../../../styles";

const InvoiceData = () => {
  const [disableForm, setDisableForm] = useState<boolean>(true);
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const INITIAL_STATE: InvoiceSettings = {
    name: currentUser?.invoiceSettings?.name || "",
    surname: currentUser?.invoiceSettings?.surname || "",
    country: currentUser?.invoiceSettings?.country || "",
    address: currentUser?.invoiceSettings?.address || "",
    postalCode: currentUser?.invoiceSettings?.postalCode || "",
    city: currentUser?.invoiceSettings?.city || "",
    taxId: currentUser?.invoiceSettings?.taxId || "",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values: InvoiceSettings) => {
    if (disableForm) return;
    const payload = {
      userFields: {
        invoiceSettings: { ...values },
      },
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
            {i18n.t("modules.clientManagement.invoiceSettings")}
          </Styled.SubTitle>
          <Grid container columnSpacing="20px" rowSpacing="20px" mt="20px">
            <Grid item xs={6}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.name")}
                name="name"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.surname")}
                name="surname"
              />
            </Grid>
            <Grid item xs={12}>
              <SelectWrapper
                disabled={disableForm}
                initialValue={currentUser?.invoiceSettings?.country || ""}
                options={countryList}
                label={i18n.t("modules.clientManagement.invoice.country")}
                name="country"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.address")}
                name="address"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.postalCode")}
                name="postalCode"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.city")}
                name="city"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={disableForm}
                label={i18n.t("modules.clientManagement.invoice.taxId")}
                name="taxId"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "start",
                columnGap: "20px",
              }}
            >
              <Button
                onClick={() => setDisableForm(false)}
                label={i18n.t("modules.clientManagement.general.edit")}
              />
              <Button
                formik
                label={i18n.t("modules.clientManagement.general.submit")}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  );
};

export default InvoiceData;
