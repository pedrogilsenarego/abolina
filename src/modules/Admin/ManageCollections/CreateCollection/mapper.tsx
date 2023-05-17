import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai"
import { Book } from "../../../../slicer/books/books.types";
import { i18n } from "../../../../translations/i18n";
import { IoMdSettings } from "react-icons/io"

const deleteIcon = (
  <ImCross fontSize='1rem' color='black' style={{ cursor: "pointer" }} />
);

const editIcon = (
  <AiFillEdit fontSize='1.2rem' color='black' style={{ cursor: "pointer" }} />
);

const settingsIcon = (
  <IoMdSettings fontSize='1.2rem' color='black' style={{ cursor: "pointer" }} />
);

const mapBookItem = (book: Book, pos: number) => {
  return {
    id: pos,
    title: book.title,
    collection: book.collections || "",
    createdDate: book.createdDate,
    newBook: book.newBook || "",
    discount: book.discount || "Not Defined",
    actions: [
      {
        buttonType: "icon",
        event: "settings",
        icon: settingsIcon,
        label: "Settings ",

      },
      {
        buttonType: "icon",
        event: "edit",
        icon: editIcon,
        label: "Edit",

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
