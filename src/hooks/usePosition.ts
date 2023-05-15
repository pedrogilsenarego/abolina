import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPositionVertical } from "../slicer/general/general.actions";

const usePosition = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight > window.innerWidth) {
        dispatch(setPositionVertical(true));
      } else {
        dispatch(setPositionVertical(false));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {};
};

export default usePosition;
