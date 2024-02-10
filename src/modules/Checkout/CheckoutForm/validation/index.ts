import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";

const phoneRegExp = /^(\+351)?[3-9][0-9]{8}$/;

export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(`${i18n.t("forms.required")}`),
  surname: Yup.string().required(`${i18n.t("forms.required")}`),
  country: Yup.string().required(`${i18n.t("forms.required")}`),
  address: Yup.string().required(`${i18n.t("forms.required")}`),
  postalCode: Yup.string().required(`${i18n.t("forms.required")}`),
  city: Yup.string().required(`${i18n.t("forms.required")}`),
  taxId: Yup.string().required(`${i18n.t("forms.required")}`),
  email: Yup.string()
    .email(`${i18n.t("forms.emailVal")}`)
    .required(`${i18n.t("forms.required")}`),
  phone: Yup.string().matches(phoneRegExp, `${i18n.t("forms.phoneVal")}`),
  terms: Yup.boolean()
    .oneOf([true], `${i18n.t("forms.required")}`)
    .required(`${i18n.t("forms.required")}`),
});
