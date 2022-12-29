import { useState } from "react";

interface Props {
  item: string;
  pos: number;
  mobile: boolean
}

const Image = ({ item, pos, mobile }: Props) => {
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
            hover && !mobile
              ? "10px 16px 10px #00000066"
              : "4px 4px 4px #00000066",
          borderRadius: "4px",
          transform: hover && !mobile ? "translate(-6px,-12px)" : "translate(0,0",
        }}
        key={pos}
        src={item}
        alt={item}
      />
    </>
  )
}

export default Image