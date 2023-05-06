import { ImCross } from "react-icons/im";
import { AiFillEdit } from "react-icons/ai"
import { i18n } from "../../../../translations/i18n";
import { Book, Books, Carousel } from "../../../../slicer/books/books.types";



const deleteIcon = (
  <ImCross fontSize='1rem' color='black' style={{ cursor: "pointer" }} />
);

const editIcon = (
  <AiFillEdit fontSize='1.2rem' color='black' style={{ cursor: "pointer" }} />
);

const mapCarouselItem = (item: Carousel, pos: number, books: Book[]) => {
  return {
    id: pos,
    image: item?.image || "",
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
      options: books.map((item: Book) => item.title) || [],
      event: "link",
      label: i18n.t(
        "Link this Image to a book"
      ),

    },

    actions: [


    ],
  };
};

const mapCarouselItems = (cartItems: any, books: Book[]) => {
  return { rows: cartItems.map((p: any, pos: number) => mapCarouselItem(p, pos, books)) };
};

export { mapCarouselItems };





