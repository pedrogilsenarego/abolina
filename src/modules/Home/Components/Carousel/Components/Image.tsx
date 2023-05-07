import { useState } from "react";

interface Props {
  item: string;
  pos: number;
  mobile: boolean;
  current: number;
  onClick?: (pos: number) => void
}

const Image = ({ item, pos, mobile, current, onClick }: Props) => {
  const [hover, setHover] = useState<boolean>(false);


  return (
    <>
      <img
        draggable={false}
        onClick={() => { if (onClick) onClick(pos) }}
        onMouseEnter={() => { setHover(true); console.log(pos, current) }}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          width: "55vw",

          objectFit: "cover",
          boxShadow:
            hover && !mobile && !mobile && pos % 2 !== 0
              ? "0 24px 30px 0px #00000026"
              : "0 4px 16px 0px #00000040",
          borderRadius: "4px",

          transition: "all 0.2s ease-in-out",
          opacity: pos % 2 !== 0 ? 1 : 0.5,
          transform:
            hover && !mobile && pos % 2 !== 0
              ? "translate(0px,-12px) scale(1.0)"
              : pos % 2 !== 0 ? "translate(0px,0px) scale(1)" : "translate(0px,0px) scale(0.9)",
        }}
        key={pos}
        src={item}
        alt={item}
      />
    </>
  );
};

export default Image;
