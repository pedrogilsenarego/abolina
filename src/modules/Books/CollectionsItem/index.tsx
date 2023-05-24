import { Typography } from "@mui/material";
import { Collection } from "../utilsBooks";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Colors } from "../../../constants/pallette";
import { useState } from "react";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useNavigate } from "react-router";

interface Props {
  pos: number;
  item: Collection;
  setCollection: (collection: string) => void;
}

const CollectionsItem = ({ pos, item, setCollection }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (title: string) => {
    setOpen(!open);
    if (open) {
      setCollection("");
    } else setCollection(title);
  };

  return (
    <div>
      <div
        onClick={() => {
          handleClick(item.name);
        }}
        key={pos}
        style={{
          display: "flex",
          columnGap: "40px",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography style={{ fontSize: "18px" }}>{item.name}</Typography>
        {open ? (
          <RiArrowUpSLine
            color={Colors.tealc}
            size='2rem'
            style={{ cursor: "pointer" }}
          />
        ) : (
          <RiArrowDownSLine
            color={Colors.tealc}
            size='2rem'
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      {open &&
        item?.books.map((item, pos) => {
          return (
            <Typography
              onClick={() =>
                navigate(ROUTE_PATHS.BOOKS_BOOK.replace(":id", item.id))
              }
              key={pos}
              style={{
                textAlign: "right",
                marginRight: "40px",
                cursor: "pointer",
              }}
            >
              {item.title}
            </Typography>
          );
        })}
    </div>
  );
};

export default CollectionsItem;
