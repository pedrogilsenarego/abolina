import * as Yup from "yup";

export const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid Email").required("Required"),
  subject:Yup.string().required("Required"),
  description:Yup.string().required("Required"),
});
