import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";




export const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email(`${i18n.t("forms.email")}`).required(`${i18n.t("forms.required")}`),
  password: Yup.string().required(`${i18n.t("forms.required")}`)
});
