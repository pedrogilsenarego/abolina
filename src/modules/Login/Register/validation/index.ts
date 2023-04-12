import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";




export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(`${i18n.t("forms.required")}`),
  email: Yup.string().email(`${i18n.t("forms.email")}`).required(`${i18n.t("forms.required")}`),
  password: Yup.string().required(`${i18n.t("forms.required")}`),
  acceptTerms: Yup.boolean().oneOf([true], `${i18n.t("forms.required")}`)
});
