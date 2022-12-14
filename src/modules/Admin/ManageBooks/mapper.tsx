import { ImCross } from "react-icons/im";
import { Book } from "../../../slicer/books/books.types";

const deleteIcon = (
  <ImCross fontSize='1em' color='black' style={{ cursor: "pointer" }} />
);

const mapBookItem = (book: Book, pos: number) => {
  return {
    id: pos,
    title: book.title,
    newBook: [{
      buttonType: 'toggle',
      confirmationButtonLabel: 'Yes',
      declineButtonLabel: 'No',
      confirmationDescription:
        'Are you sure you want to disable this package?',
      confirmationRequired: true,
      confirmationTitle: 'Disable Package',
      isActive: book.newBook ?? true,
      disabled: false,
      event: 'newBook',
      label: 'Disable Package',
    }],
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
