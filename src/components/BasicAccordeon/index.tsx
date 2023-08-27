import { Typography } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Colors } from "../../constants/pallette";

type Props = {
  title: string;
  children: React.ReactNode;
};

const BasicAccordeon = ({ title, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          fontSize="18px"
          fontWeight="bold"
          onClick={() => setOpen(!open)}
        >
          {title}
        </Typography>
        {open ? (
          <IoIosArrowUp color={Colors.tealc} />
        ) : (
          <IoIosArrowDown color={Colors.tealc} />
        )}
      </div>
      {open && children}
    </>
  );
};

export default BasicAccordeon;
