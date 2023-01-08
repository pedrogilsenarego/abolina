import { Card, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Colors } from "../../../constants/pallette";

interface Props {
  duration?: number;
  children: any;
}

export default function CardMine({ children, duration }: Props) {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))
  const CardMotion = motion(Card);
  return (
    <CardMotion
      initial={{ opacity: 0, y: "50px" }}
      animate={{ opacity: 1, y: "0px" }}
      transition={{ duration: duration || 0.7 }}
      style={{
        borderRadius: "20px",
        boxShadow: "3px 3px 10px  #00000066",
        backgroundColor: Colors.champagne,
        padding: mobile ? "20px" : "35px",
        height: "100%",
      }}
    >
      {children}
    </CardMotion>
  );
}
