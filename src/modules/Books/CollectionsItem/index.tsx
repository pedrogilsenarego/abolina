import { Typography } from "@mui/material";
import { Collection } from "../utilsBooks";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Colors } from "../../../constants/pallette";
import { useEffect, useState } from "react";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useNavigate } from "react-router";

interface Props {
  pos: number;
  item: Collection;
  collection: string;
  setCollection: (collection: string) => void;
}

const CollectionsItem = ({ pos, item, setCollection, collection }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClick = (title: string) => {
    setOpen(!open);
    if (open) {
      setCollection("");
    } else setCollection(title);
  };

  useEffect(() => {
    if (collection !== item.name) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection])

  return (
    <div style={{ width: "100%" }}>
      <div
        onClick={() => {
          handleClick(item.name);
        }}
        key={pos}
        style={{
          width: "100%",

          display: "flex",
          columnGap: "20px",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: 800
          }}
        >
          {item.name}
        </Typography>
        {open ? (
          <RiArrowUpSLine
            color={Colors.tealc}
            size='1rem'
            style={{ cursor: "pointer" }}
          />
        ) : (
          <RiArrowDownSLine
            color={Colors.tealc}
            size='1rem'
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
                width: "100%",
                textAlign: "left",
                marginRight: "40px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
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
