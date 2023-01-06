import { useState } from "react";

interface Props {
  item: string;
  pos: number;
  mobile: boolean;
  current: number;
}

const Image = ({ item, pos, mobile, current }: Props) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <>
      <img
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          width: "62vw",

          objectFit: "cover",
          boxShadow:
            hover && !mobile && !mobile && current + 1 === pos
              ? "0 24px 30px 0px #00000026"
              : "0 4px 16px 0px #00000040",
          borderRadius: "4px",
          transition: "all 0.2s ease-in-out",
          transform: hover && !mobile && current + 1 === pos ? "translate(0px,-12px)" : "translate(0,0",
        }}
        key={pos}
        src={item}
        alt={item}
      />
    </>
  )
}

export default Image