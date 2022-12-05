import * as Yup from "yup";

export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
});
