import { Typography } from "@mui/material";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
  title: string;
  children: React.ReactNode;
};

const BasicAccordeon = ({ title, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography onClick={() => setOpen(!open)}>{title}</Typography>
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {open && children}
    </>
  );
};

export default BasicAccordeon;
