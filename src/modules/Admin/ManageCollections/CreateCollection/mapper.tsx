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

    createdDate: book.createdDate,


    actions: [

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
        label: "Delete collection",
        confirmationButtonLabel: i18n.t(
          "modules.admin.manageBooks.tableList.delete.accept"
        ),
        declineButtonLabel: i18n.t(
          "modules.admin.manageBooks.tableList.delete.deny"
        ),
        confirmationDescription: "This is not reversible",
        confirmationRequired: true,
        confirmationTitle: "Delete collection",
      },
    ],
  };
};

const mapCollectionsItems = (cartItems: any) => {
  return { rows: cartItems.map((p: any, pos: number) => mapBookItem(p, pos)) };
};

export { mapCollectionsItems };






export const mapInitialForm = (data: any) => {


  return {
    title: data?.title || "",
    titleEN: data?.titleEN || "",
    caracteristics: data?.caracteristics || [],
    resume: data?.resume || "",
    resumeEN: data?.resumeEN || "",


  }

}
