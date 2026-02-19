import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./results.css";
import notImage from "../../../assets/public/img/noCover.png";
import CounterSelector from "../../container/counterSelector/CounterSelector";
import SaveBooks from "../../container/saveBooks/SaveBooks";
import { ModalContext, ModalProvider } from "../../useContext/ModalContext";
import Modal from "../modal/Modal";

function Results({ booksData, noData }) {
  const hasBooks = booksData?.length > 0;
  const [expandedDescription, setExpandedDescription] = useState([]);
  const { showModal, modalIndex } = useContext(ModalContext);
  const [selectedValue, setSelectedValue] = useState("bookshelf");

  const ShowDescription = (bookId) => {
    if (expandedDescription.includes(bookId)) {
      setExpandedDescription(expandedDescription.filter((id) => id !== bookId));
    } else {
      setExpandedDescription([...expandedDescription, bookId]);
    }
  };

  return (
    <>
      <div className="resultsContent">
        {hasBooks && <CounterSelector />}
        {hasBooks
          ? booksData.map((book, index) => (
              <div className="booksContent" key={index}>
                <img
                  className="bookImg"
                  src={
                    book.imageLinks?.smallThumbnail ||
                    book.imageLinks?.thumbnail ||
                    notImage
                  }
                  alt={book.title}
                />
                <h2 className="bookTitle">
                  {book?.title || "Título no disponible"}
                </h2>
                <p className="bookYear">
                  {book?.publishedDate || "Fecha no disponible"}
                </p>
                <p className="bookAuthor">
                  {book?.authors || "Autor no disponible"}
                </p>
                <p className="bookDescription">
                  {expandedDescription.includes(book.id)
                    ? book?.description || "Descripción no disponible"
                    : book?.description &&
                      book.description.split(" ").length > 50
                    ? `${book.description.split(" ").slice(0, 50).join(" ")}`
                    : book?.description || "Descripción no disponible"}
                  {book?.description &&
                    book.description.split(" ").length > 50 && (
                      <span
                        id={`readMore_${book.id}`}
                        onClick={() => ShowDescription(book.id)}
                        className="readMore"
                      >
                        {expandedDescription.includes(book.id)
                          ? "leer menos"
                          : "leer más..."}
                      </span>
                    )}
                </p>
                <SaveBooks
                  index={index}
                  booksData={booksData}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
                />
              </div>
            ))
          : noData && <p>{noData}</p>}
        {hasBooks && <CounterSelector />}
      </div>
      {showModal && (
        <Modal 
        modalIndex={modalIndex} 
        booksData={booksData}
        selectedValue={selectedValue} 
        setSelectedValue={setSelectedValue}
        />
      )}
    </>
  );
}

Results.propTypes = {
  booksData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      resume: PropTypes.string,
      year: PropTypes.string,
      editorial: PropTypes.string,
      cover: PropTypes.string,
    })
  ).isRequired,
  noData: PropTypes.bool,
};

export default Results;
