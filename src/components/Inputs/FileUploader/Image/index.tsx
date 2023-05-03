import { useState } from "react";
import CardMedia from "../../../CardMedia";
import { Typography } from "@mui/material";

interface Props {
  pos: number;
  image: any;
  deleteImage: (pos: number) => void
}

const Image = ({ pos, image, deleteImage }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      key={pos}
      onClick={() => deleteImage(pos)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{ position: "relative" }}
    >
      {hover && (
        <Typography
          style={{
            color: "red",
            fontWeight: 800,

            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
          }}
        >
          Delete
        </Typography>
      )}
      <img
        alt=''
        style={{
          width: "100px",
          cursor: "pointer",
          height: "100px",
          opacity: hover ? 0.5 : 1,
        }}
        key={pos}
        src={URL.createObjectURL(image)}
      />
    </div>
  );
};

export default Image;
