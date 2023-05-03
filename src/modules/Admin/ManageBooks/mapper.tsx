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
  console.log("data", data)

  return {
    title: data?.title || "",
    titleEN: data?.titleEN || "",
    author: data?.author || ""

  }

}
