import { ImCross } from "react-icons/im";

const deleteIcon = (
  <ImCross fontSize='1em' color='black' style={{ cursor: "pointer" }} />
);

const mapBookItem = (cartItems: any, pos: number) => {
  return {
    id: pos,
    title: cartItems.title,
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
