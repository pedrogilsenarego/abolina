import * as Yup from "yup";
import { i18n } from "../../../../../translations/i18n";

const IMAGE_FORMATS_MESSAGE = (fileFormats: string[]) =>
  fileFormats.map((i) => i.split("/")[1]).join(", ");

const onlySpecifiTypes = (fileFormats: string[]): Yup.TestConfig<FileList> => ({
  name: "onlySpecifiFormats",
  message: `Only these formats are accepted (${IMAGE_FORMATS_MESSAGE(
    fileFormats
  )})`,
  test: (f: FileList) => f && f.length > 0 && fileFormats.includes(f[0].type),
});

const fileSize = (max: number, unit = "MB"): Yup.TestConfig<FileList> => ({
  name: "fileSize",
  message: `${i18n.t("forms.fileSize")} ${max}${unit}`,
  test: (f: FileList) => f && f[0]?.size <= 1000000 * max,
});


export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required(`${i18n.t("forms.required")}`),
  author: Yup.string().required(`${i18n.t("forms.required")}`),
  collections: Yup.string().required(`${i18n.t("forms.required")}`),
  authorResume: Yup.string().required(`${i18n.t("forms.required")}`),
  authorResumeEN: Yup.string().required(`${i18n.t("forms.required")}`),
  language: Yup.string().required(`${i18n.t("forms.required")}`),
  weight: Yup.string().required(`${i18n.t("forms.required")}`),
  size: Yup.string().required(`${i18n.t("forms.required")}`),
  price: Yup.number().required(`${i18n.t("forms.required")}`),
  resume: Yup.string().required(`${i18n.t("forms.required")}`),
  resumeEN: Yup.string().required(`${i18n.t("forms.required")}`),
  pages: Yup.number().required(`${i18n.t("forms.required")}`),
  coverPage2: Yup
  .mixed()
  .required(`${i18n.t("forms.required")}`)
  .test(fileSize(0.5))
  .test(
    onlySpecifiTypes(
       [
        // 'image/jpeg',
        // 'image/jpg',
        // 'image/gif',
        // 'image/png',
        // 'image/pdf',
        "image/webp"
      ]
    )
  ),
  content: Yup
  .mixed()
  .required(`${i18n.t("forms.required")}`)
  .test(fileSize(0.5))
  .test(
    onlySpecifiTypes(
       [
        // 'image/jpeg',
        // 'image/jpg',
        // 'image/gif',
        // 'image/png',
        // 'image/pdf',
        "image/webp"
      ]
    )
  ),
});
