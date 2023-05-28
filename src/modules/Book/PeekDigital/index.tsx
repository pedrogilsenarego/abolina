import { useSelector } from "react-redux";
import { State } from "../../../slicer/types";

interface Props {
  fullScreen: boolean;
  setFullScreen: (fullScreen: boolean) => void;
}

const PeekDigital = ({ fullScreen, setFullScreen }: Props) => {
  const link = useSelector<State, string>((state) => state.books.book.peekDigital || "")
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${link}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default PeekDigital;
