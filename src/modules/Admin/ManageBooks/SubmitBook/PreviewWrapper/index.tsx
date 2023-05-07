import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import Button from "../../../../../components/Buttons/Button"
import { ROUTE_PATHS } from "../../../../../constants/routes";
import { setBook } from "../../../../../slicer/books/books.actions";
import { i18n } from "../../../../../translations/i18n"

const PreviewWrapper = () => {
  const { values } = useFormikContext<any>();
  const dispatch = useDispatch()
  const handlePreview = () => {
    const newProduct = { ...values }

    if (values.content instanceof FileList) {
      newProduct.content = Array.from(values.content).map((file: any) => URL.createObjectURL(file));
    } else if (values.content instanceof File) {
      newProduct.content = [URL.createObjectURL(values.content)];
    }
    newProduct['content2'] = newProduct['content'];
    delete newProduct['content'];

    if (values.coverPage2 instanceof FileList) {
      newProduct.coverPage2 = Array.from(values.coverPage2).map((file: any) => URL.createObjectURL(file));
    } else if (values.coverPage2 instanceof File) {
      newProduct.coverPage2 = [URL.createObjectURL(values.coverPage2)];
    }
    newProduct['coverPage'] = newProduct['coverPage2'];
    delete newProduct['coverPage2'];

    dispatch(setBook(newProduct))
    const url = new URL(`${ROUTE_PATHS.BOOKS_BOOK.replace(":id", "preview")}`, window.location.origin);
    window.open(url.toString(), "_blank");
  }
  return (<>
    <Button label="Preview Book" onClick={handlePreview} />
  </>
  )
}

export default PreviewWrapper