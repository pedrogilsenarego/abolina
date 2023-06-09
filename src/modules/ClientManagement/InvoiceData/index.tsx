import { Form, Formik } from "formik";
import { FORM_VALIDATION } from "./validation";
import TextField from "../../../components/Inputs/TextFieldForm";
import { i18n } from "../../../translations/i18n";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";

import { CurrentUser, InvoiceSettings } from "../../../slicer/user/user.types";
import { State } from "../../../slicer/types";
import { mutateUserSettings } from "../../../slicer/user/user.actions";
import SelectWrapper from "../../../components/Inputs/SelectFormValue";
import { countryList } from "../../../constants/forms";

const InvoiceData = () => {
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
    const payload = {
      userFields: {
        invoiceSettings: { ...values }
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
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
          >
            <TextField
              label={i18n.t("modules.clientManagement.invoice.name")}
              name='name'
            />
            <TextField
              label={i18n.t("modules.clientManagement.invoice.surname")}
              name='surname'
            />
            <SelectWrapper options={countryList} label={i18n.t("modules.clientManagement.invoice.country")} name="country" />
            <TextField
              label={i18n.t("modules.clientManagement.invoice.address")}
              name='address'
            />
            <TextField
              label={i18n.t("modules.clientManagement.invoice.postalCode")}
              name='postalCode'
            />
            <TextField
              label={i18n.t("modules.clientManagement.invoice.city")}
              name='city'
            />
            <TextField
              label={i18n.t("modules.clientManagement.invoice.taxId")}
              name='taxId'
            />
            <Button
              formik
              label={i18n.t("modules.clientManagement.general.submit")}
            />
          </div>

        </Form>
      </Formik>

    </>
  );
};

export default InvoiceData;
