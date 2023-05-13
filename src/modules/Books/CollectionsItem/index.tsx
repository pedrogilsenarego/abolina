import { Typography } from "@mui/material";
import { Collection } from "../utilsBooks";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Colors } from "../../../constants/pallette";
import { useState } from "react";

interface Props {
  pos: number;
  item: Collection;
}

const CollectionsItem = ({ pos, item }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div
        key={pos}
        style={{ display: "flex", columnGap: "40px", alignItems: "center" }}
      >
        <Typography style={{ fontSize: "18px" }}>{item.name}</Typography>
        {open ? (
          <RiArrowUpSLine
            color={Colors.tealc}
            size='2rem'
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        ) : (
          <RiArrowDownSLine
            color={Colors.tealc}
            size='2rem'
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      {open && item?.books.map((item, pos) => {
        return (
          <Typography key={pos}>{item}</Typography>
        )
      })}
    </div>
  );
};

export default CollectionsItem;
