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
        onClick={() => { if (onClick) onClick(pos) }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          width: "55vw",

          objectFit: "cover",
          boxShadow:
            hover && !mobile && !mobile && current + 1 === pos
              ? "0 24px 30px 0px #00000026"
              : "0 4px 16px 0px #00000040",
          borderRadius: "4px",

          transition: "all 0.2s ease-in-out",
          opacity: current + 1 === pos ? 1 : 0.5,
          transform:
            hover && !mobile && current + 1 === pos
              ? "translate(0px,-12px) scale(1.0)"
              : current + 1 === pos ? "translate(0px,0px) scale(1)" : "translate(0px,0px) scale(0.9)",
        }}
        key={pos}
        src={item}
        alt={item}
      />
    </>
  );
};

export default Image;
