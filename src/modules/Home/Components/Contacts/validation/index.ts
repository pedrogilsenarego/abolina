import * as Yup from "yup";

export const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Must be a valid Email").required("Required"),
});
