import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai"
import { i18n } from "../../../../translations/i18n";
import { Carousel } from "../../../../slicer/books/books.types";



const deleteIcon = (
  <ImCross fontSize='1rem' color='black' style={{ cursor: "pointer" }} />
);

const editIcon = (
  <AiFillEdit fontSize='1.2rem' color='black' style={{ cursor: "pointer" }} />
);

const mapCarouselItem = (item: Carousel, pos: number) => {
  return {
    id: pos,
    image: item.image,
    link: {

      value: item.link,
      confirmationButtonLabel: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.accept"
      ),
      declineButtonLabel: i18n.t(
        "modules.admin.manageBooks.tableList.newBook.deny"
      ),
      confirmationDescription: "Are you sure you want to change this image connection to a book?",
      confirmationRequired: true,
      confirmationTitle: "Link this Image to a book",
      options: ["newBookTypes", "sqdqdw"],
      event: "link",
      label: i18n.t(
        "Link this Image to a book"
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

const mapCarouselItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any, pos: number) => mapCarouselItem(p, pos)) };
};

export { mapCarouselItems };





