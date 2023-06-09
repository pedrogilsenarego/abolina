import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";




export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(`${i18n.t("forms.required")}`),
  surname: Yup.string().required(`${i18n.t("forms.required")}`),
  country: Yup.string().required(`${i18n.t("forms.required")}`),
  address: Yup.string().required(`${i18n.t("forms.required")}`),
  postalCode: Yup.string().required(`${i18n.t("forms.required")}`),
  city: Yup.string().required(`${i18n.t("forms.required")}`),
  taxId: Yup.string().required(`${i18n.t("forms.required")}`)
});
