import { Title } from "../../../styles";
import { i18n } from "../../../translations/i18n";
import CollectionsItem from "../CollectionsItem";

type Props = {
  collections: any;
  collection: string;
  setCollection: (collection: string) => void;
};

const Collections = ({ collections, collection, setCollection }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      <Title
        style={{
          textDecoration: "underline",
          textAlign: "left",
          marginRight: "20%",
          textTransform: "uppercase",
        }}
      >
        {i18n.t("modules.books.collections")}
      </Title>
      <div
        style={{
          width: "100%",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          rowGap: "10px",
        }}
      >
        {collections.map((item: any, pos: number) => {
          return (
            <CollectionsItem
              pos={pos}
              item={item}
              collection={collection}
              setCollection={setCollection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
