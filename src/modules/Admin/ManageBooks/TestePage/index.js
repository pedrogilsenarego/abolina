import React, { useEffect, useRef, useState } from "react";
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
      {props.children}
    </div>
  );
});

function MyAlbum(props) {
  const [book, setBook] = useState();
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(true);
  const [zoomRatio, setZoomRatio] = useState(1);
  const [text, setText] = useState("ここに表示されます。");
  const bookRef = useRef();
  const leftButton = useKeyPress("ArrowLeft");
  const rightButton = useKeyPress("ArrowRight");
  const listImages = book?.content || [];
  const storeBook = useSelector((state) => state?.books?.books?.data[1] || {});

  console.log("book", book);

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (leftButton) {
      handleMove("left");
    }
    if (rightButton) {
      handleMove("right");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftButton, rightButton]);

  const handleMove = (direction) => {
    if (page >= listImages.length / 2 + 5 && direction === "right") return;
    if (page <= 0 && direction === "left") return;
    setZoom(false);
    setTimeout(() => {
      bookRef.current.pageFlip().turnToPage(page);
    }, [20]);
    setTimeout(() => {
      if (direction === "left") {
        bookRef.current.pageFlip().flipPrev();
        return;
      }
      bookRef.current.pageFlip().flipNext();
      return;
    }, [50]);
  };

  return (
    <div>
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
          ref={bookRef}
          onFlip={(e) => setPage(e.data)}
          mobileScrollSupport={true}
        >
          <PageCover image={book?.coverPage[0] || ""} />
          <PageCover />
          <Page>
            <p>{book?.title}</p>
            <p>{book?.author}</p>
          </Page>
          {listImages.map((item, index) => {
            return (
              <Page>
                <img src={item} alt="" width="100%" height="100%" />
              </Page>
            );
          })}
          {listImages.length % 2 === 0 && <Page />}
          <PageCover></PageCover>
          <PageCover>see you</PageCover>
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default MyAlbum;
