import * as Yup from "yup";
import { i18n } from "../../../../translations/i18n";


const IMAGE_FORMATS_MESSAGE = (fileFormats: string[]) =>
  fileFormats.map((i) => i.split('/')[1]).join(', ')

const onlySpecifiTypes = (fileFormats: string[]): Yup.TestConfig<FileList> => ({
  name: 'onlySpecifiFormats',
  message: `Only these formats are accepted (${IMAGE_FORMATS_MESSAGE(
    fileFormats
  )})`,
  test: (f: FileList) => f && f.length > 0 && fileFormats.includes(f[0].type),
})

const fileSize = (max: number, unit = 'MB'): Yup.TestConfig<FileList> => ({
  name: 'fileSize',
  message: `${i18n.t(
    'sponsoredProducts.view.addProduct.fileUpload.fileUploader.validation.fileSize'
  )} ${max}${unit}`,
  test: (f: FileList) => f && f[0]?.size <= 1000000 * max,
})

const fileRequired = (): Yup.TestConfig<FileList> => ({
  name: 'fileRequired',
  message: `i18n.t(
    'sponsoredProducts.view.addProduct.fileUpload.fileUploader.validation.required'
  )`,
  test: (f: FileList) => f && f.length > 0,
})

export const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  authorResume: Yup.string().required("Required"),
  designer: Yup.string().required("Required"),
  designerResume: Yup.string().required("Required"),
  translator: Yup.string().required("Required"),
  translatorResume: Yup.string().required("Required"),
  language: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  size: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  resume: Yup.string().required("Required"),
  coverPage2: Yup
  .mixed()
  .test(fileRequired())
  .test(fileSize(0.5))
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
