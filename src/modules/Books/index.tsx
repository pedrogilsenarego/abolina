import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../slicer/books/books.actions";

const Books = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    const books = dispatch(fetchBooks());
    console.log("books", books);
  }, [dispatch]);

  return (
    <div
      onClick={() => Navigate(ROUTE_PATHS.BOOKS_BOOK)}
      style={{ cursor: "pointer" }}
    >
      Click me
    </div>
  );
};

export default Books;
