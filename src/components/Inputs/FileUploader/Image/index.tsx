import { useState } from "react";
import { Colors } from "../../../../constants/pallette";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md"

interface Props {
  pos: number;
  image: any;
  deleteImage: (pos: number) => void;
}

const Image = ({ pos, image, deleteImage }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      key={pos}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: hover ? "lightGrey" : "transparent",
        width: "100%",
        height: "80px",
        border: `solid 3px ${Colors.tealc}`,
        borderRadius: "10px",
        padding: "10px",
        cursor: "grabbing"
      }}
    >

      <img
        alt=''
        draggable="false"
        style={{

          cursor: "pointer",
          height: "100%",
          borderRadius: "6px",
          objectFit: "cover"
        }}
        key={pos}
        src={URL.createObjectURL(image)}
      />
      <div style={{ display: "flex", columnGap: "5px" }}>
        <MdOutlineSearch size="1.5rem" color={Colors.darkGrey} style={{ cursor: "pointer" }} />

        <RiDeleteBinLine
          onClick={() => deleteImage(pos)}
          style={{ cursor: "pointer" }}
          size='1.5rem'
          color={Colors.darkGrey}
        />

      </div>
    </div>
  );
};

export default Image;
