import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";

const IMAGE_FORMATS_MESSAGE = (fileFormats: string[]) =>
  fileFormats.map((i) => i.split("/")[1]).join(", ");

const onlySpecifiTypes = (fileFormats: string[]): Yup.TestConfig<any> => ({
  name: "onlySpecifiFormats",
  message: `Only these formats are accepted (${IMAGE_FORMATS_MESSAGE(
    fileFormats
  )})`,
  test: (f: any) => f && fileFormats.includes(f.type),
});

const fileSize = (max: number, unit = "MB"): Yup.TestConfig<any> => ({
  name: "fileSize",
  message: `${i18n.t("forms.fileSize")} ${max}${unit}`,
  test: (f: any) => f && f?.size <= 1000000 * max,
});

export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required(`${i18n.t("forms.required")}`),
  author: Yup.string().required(`${i18n.t("forms.required")}`),
  authorResume: Yup.string().required(`${i18n.t("forms.required")}`),
  designer: Yup.string().required(`${i18n.t("forms.required")}`),
  designerResume: Yup.string().required(`${i18n.t("forms.required")}`),
  translator: Yup.string().required(`${i18n.t("forms.required")}`),
  translatorResume: Yup.string().required(`${i18n.t("forms.required")}`),
  language: Yup.string().required(`${i18n.t("forms.required")}`),
  weight: Yup.string().required(`${i18n.t("forms.required")}`),
  size: Yup.string().required(`${i18n.t("forms.required")}`),
  price: Yup.number().required(`${i18n.t("forms.required")}`),
  resume: Yup.string().required(`${i18n.t("forms.required")}`),
  coverPage2: Yup
  .mixed()
  .required(`${i18n.t("forms.required")}`)
  .test(fileSize(2))
  .test(
    onlySpecifiTypes(
       [
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/png',
        'image/pdf',
      ]
    )
  ),
});
