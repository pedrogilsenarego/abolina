import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";




export const FORM_VALIDATION = Yup.object().shape({
  displayName: Yup.string().required(`${i18n.t("forms.required")}`),
});
