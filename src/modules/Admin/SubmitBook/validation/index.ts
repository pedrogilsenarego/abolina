import * as Yup from "yup";

export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  authorResume: Yup.string().required("Required"),
  designer: Yup.string().required("Required"),
  translator: Yup.string().required("Required"),
  language: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  resume: Yup.string().required("Required")
});
