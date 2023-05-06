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





