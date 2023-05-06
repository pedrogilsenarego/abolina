import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCarroussell } from "../../../slicer/books/books.actions";
import { i18n } from "../../../translations/i18n";

const useManageCarroussel = () => {
  const dispatch = useDispatch();
  const [dragging, setDragging] = useState(false);
  const carroussell = useSelector((state) => state.books.carroussell);

  const [list, setList] = useState([
    {
      title: `${i18n.t("modules.admin.manageCarroussell.imagesKeep")}`,
      data: [],
    },
    {
      title: `${i18n.t("modules.admin.manageCarroussell.imagesDelete")}`,
      data: [],
    },
  ]);

  useEffect(() => {
    const data2 =
      [
        {
          title: `${i18n.t("modules.admin.manageCarroussell.imagesKeep")}`,
          data: carroussell,
        },
        {
          title: `${i18n.t("modules.admin.manageCarroussell.imagesDelete")}`,
          data: [
            {
              image:
                "https://tse2.mm.bing.net/th?id=OIP.QzyAIlQNT1x6uFTv6SYlewHaHa&pid=Api&P=0",
            },
          ],
        },
      ] || [];
    setList(data2);
  }, [carroussell]);

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
    dispatch(updateCarroussell(list));
  };

  return {
    handleDragEnter,
    dragging,
    list,
    setList,
    handleDragStart,
    handleSubmit,
  };
};

export default useManageCarroussel;
