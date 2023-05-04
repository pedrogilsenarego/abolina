import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai"
import { Book } from "../../../slicer/books/books.types";
import { i18n } from "../../../translations/i18n";
import { newBookTypes } from "../../../constants/admin";
import { fetchBook } from "../../../services/adminServices";

const deleteIcon = (
  <ImCross fontSize='1rem' color='black' style={{ cursor: "pointer" }} />
);

const editIcon = (
  <AiFillEdit fontSize='1.2rem' color='black' style={{ cursor: "pointer" }} />
);

const mapBookItem = (book: Book, pos: number) => {
  return {
    id: pos,
    title: book.title,
    createdDate: book.createdDate,
    newBook: {

      value: book.newBook,
      confirmationButtonLabel: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.accept"
      ),
      declineButtonLabel: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.deny"
      ),
      confirmationDescription: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.confirmationDescription"
      ),
      confirmationRequired: true,
      confirmationTitle: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.confirmationTitle"
      ),
      options: newBookTypes,
      event: "newBook",
      label: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.tooltip"
      ),

    },
    actions: [
      {
        buttonType: "icon",
        event: "edit",
        icon: editIcon,
        label: "Edit Book",

      },
      {
        buttonType: "icon",
        event: "delete",
        icon: deleteIcon,
        label: i18n.t(
          "modules.admin.manageBooks.tableList.delete.tooltip"
        ),
        confirmationButtonLabel: i18n.t(
          "modules.admin.manageBooks.tableList.delete.accept"
        ),
        declineButtonLabel: i18n.t(
          "modules.admin.manageBooks.tableList.delete.deny"
        ),
        confirmationDescription: i18n.t(
          "modules.admin.manageBooks.tableList.delete.confirmationDescription"
        ),
        confirmationRequired: true,
        confirmationTitle: i18n.t(
          "modules.admin.manageBooks.tableList.delete.confirmationTitle"
        ),
      },
    ],
  };
};

const mapBooksItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any, pos: number) => mapBookItem(p, pos)) };
};

export { mapBooksItems };






export const mapInitialForm = (data: any) => {


  return {
    title: data?.title || "",
    titleEN: data?.titleEN || "",
    author: data?.author || "",
    collections: data?.collections || "",
    number: data?.number || 0,
    authorResume: data?.authorResume || "",
    authorResumeEN: data?.authorResumeEN || "",
    designer: data?.designer || "",
    designerResume: data?.designerResume || "",
    designerResumeEN: data?.designerResumeEN || "",
    translator: data?.translator || "",
    translatorResume: data?.translatorResume || "",
    translatorResumeEN: data?.translatorResumeEN || "",
    language: data?.language || "",
    weight: data?.weight || "",
    size: data?.size || "",
    resume: data?.resume || "",
    resumeEN: data?.resumeEN || "",
    price: data?.price || null,
    coverPage2: data?.coverPage || [],
    content: data?.content || [],
    pages: data?.pages || null,

  }

}
