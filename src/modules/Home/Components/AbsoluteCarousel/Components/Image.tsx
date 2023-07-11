import { useEffect, useState } from "react";

interface Props {
  item: string;
  pos: number;
  mobile: boolean;
  current: number;
  onClick?: (pos: number) => void;
}

const Image = ({ item, pos, mobile, current, onClick }: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [initialTransition, setInitialTransition] = useState<boolean>(false);

  const timeinitialTransition = current === pos ? 1.5 : 3;

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => {
      setInitialTransition(true);
    }, timeinitialTransition * 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacity = isMounted ? (current === pos ? 1 : 0.5) : 0;
  const transition = initialTransition
    ? "all 0.5s ease-in-out"
    : `all ${timeinitialTransition}s ease-in-out`;

  return (
    <>
      <img
        draggable={false}
        onClick={() => {
          if (onClick) onClick(pos);
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          width: "55vw",
          aspectRatio: 16 / 6,
          objectFit: "cover",
          boxShadow:
            hover && current === pos
              ? "0 24px 30px 0px #00000026"
              : "0 4px 16px 0px #00000040",
          borderRadius: "4px",
          transition: transition,
          opacity: opacity,
          transform:
            hover && current === pos
              ? "translate(0px,-12px) scale(1.0)"
              : current === pos
              ? "translate(0px,0px) scale(1)"
              : "translate(0px,0px) scale(0.9)",
        }}
        key={pos}
        src={item}
        alt={item}
      />
    </>
  );
};

export default Image;
