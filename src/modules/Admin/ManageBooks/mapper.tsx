import { ImCross } from "react-icons/im";
import { Book } from "../../../slicer/books/books.types";
import { i18n } from "../../../translations/i18n";

const deleteIcon = (
  <ImCross fontSize='1em' color='black' style={{ cursor: "pointer" }} />
);

const mapBookItem = (book: Book, pos: number) => {
  return {
    id: pos,
    title: book.title,
    newBook: [
      {
        buttonType: "toggle",
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
        isActive: book.newBook ?? true,
        disabled: false,
        event: "newBook",
        label: i18n.t(
          "modules.admin.manageBooks.tableList.newBook.tooltip"
        ),
      },
    ],
    delete: [
      {
        buttonType: "icon",
        event: "delete",
        icon: deleteIcon,
        label: "Remove this watch",
      },
    ],
  };
};

const mapBooksItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any, pos: number) => mapBookItem(p, pos)) };
};

export { mapBooksItems };
