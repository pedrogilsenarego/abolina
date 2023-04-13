import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";

export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required(`${i18n.t("forms.required")}`),
  email: Yup.string()
    .email(`${i18n.t("forms.email")}`)
    .required(`${i18n.t("forms.required")}`),
  password: Yup.string()
    .required(`${i18n.t("forms.required")}`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&<^~_-])[A-Za-z\d@$!%*#?&<^~_-]{8,}$/

,
      `${i18n.t("forms.password")}`
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must Match")
    .required(`${i18n.t("forms.required")}`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&<^~_-])[A-Za-z\d@$!%*#?&<^~_-]{8,}$/

,
      `${i18n.t("forms.password")}`
    ),
  acceptTerms: Yup.boolean().oneOf([true], `${i18n.t("forms.required")}`),
});
