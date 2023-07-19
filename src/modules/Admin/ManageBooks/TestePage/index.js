import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { useSelector } from "react-redux";
import { useKeyPress } from "../../../../hooks/useKeyPress";
import "./App.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <img src={props.image} alt="" width="100%" height="100%" />
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <h1>Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
});

function MyAlbum(props) {
  const [book, setBook] = useState();

  const [text, setText] = useState("ここに表示されます。");

  const leftButton = useKeyPress("ArrowLeft");
  const rightButton = useKeyPress("ArrowRight");
  const storeBook = useSelector((state) => state?.books?.books?.data[1] || {});

  console.log("book", book);

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div bgcolor="red">
      <div>
        <HTMLFlipBook
          width={550}
          height={650}
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          showCover={true}
          flippingTime={1200}
          style={{ margin: "0 auto" }}
          maxShadowOpacity={0.5}
          className="album-web"
        >
          <PageCover image={book?.coverPage[0] || ""} />
          <PageCover></PageCover>
          <Page number="1">
            <hr></hr>
            <p contentEditable="true">ここは編集可能です</p>
          </Page>
          <Page number="2">
            <hr></hr>
            <p>{text}</p>
          </Page>
          <Page number="3">
            <hr></hr>
          </Page>
          <Page number="4">
            <hr></hr>
          </Page>
          <PageCover></PageCover>
          <PageCover>see you</PageCover>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default MyAlbum;
