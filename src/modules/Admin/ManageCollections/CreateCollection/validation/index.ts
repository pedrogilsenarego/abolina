import * as Yup from "yup";
import { i18n } from "../../../../../translations/i18n";


export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required(`${i18n.t("forms.required")}`), 
  titleEN: Yup.string().required(`${i18n.t("forms.required")}`), 
    resume: Yup.string().required(`${i18n.t("forms.required")}`),
  resumeEN: Yup.string().required(`${i18n.t("forms.required")}`),

});
