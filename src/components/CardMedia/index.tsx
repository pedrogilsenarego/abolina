import { useState } from "react";
import { Box, CardMedia as MuiCardMedia, Typography } from "@mui/material";

interface Props {
  image: string | undefined;
  alt?: string;
  height?: string;
  width?: string;
  onClick?: () => void;
  borderRadius?: string;
  leafThrough?: boolean;
  leafShadowPosition?: "left" | "right";
}

const CardMedia = ({
  image,
  alt,
  onClick,
  height,
  width,
  borderRadius,
  leafThrough,
  leafShadowPosition,
}: Props) => {
  const [imageLoading, setImageLoading] = useState(true);
  const handleClick = () => {
    if (onClick) onClick();
  };
  return (
    <div style={{ position: "relative" }}>
      {imageLoading && (
        <Typography
          color='black'
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            marginTop: "auto",
            marginBottom: "auto",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Loading...
        </Typography>
      )}
      {leafThrough && leafShadowPosition && (
        <Box
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",

            backgroundColor: "transparent",
            boxShadow:
              leafShadowPosition === "right"
                ? "inset 9px -10px 30px -7px rgb(0 0 0 / 70%)"
                : "inset -9px -10px 30px -7px rgb(0 0 0 / 70%)",
          }}
        ></Box>
      )}

      <MuiCardMedia
        onLoad={() => setImageLoading(false)}

        style={{
          borderRadius: borderRadius ?? "4px",
          cursor: "pointer",
          opacity: imageLoading ? 0 : 1,
          objectFit: "cover"
        }}
        component='img'
        height={height || "120"}

        width={width || "auto"}
        image={image || ""}
        alt={alt || ""}
        onClick={handleClick}
      />
    </div>
  );
};

export default CardMedia;
