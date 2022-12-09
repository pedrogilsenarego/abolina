import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCarroussell } from "../../../slicer/books/books.actions";
import { i18n } from "../../../translations/i18n";

const useManageCarroussel = (data) => {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const data2 =
    [
      {
        title: `${i18n.t("modules.admin.manageCarroussell.imagesKeep")}`,
        data,
      },
      {
        title: `${i18n.t("modules.admin.manageCarroussell.imagesDelete")}`,
        data,
      },
    ] || [];
  const [list, setList] = useState(data2);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handleDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].data.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].data.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const handleSubmit = () => {
    dispatch(updateCarroussell(list[0].data));
  };

  return { handleDragEnter, dragging, list, handleDragStart, handleSubmit };
};

export default useManageCarroussel;