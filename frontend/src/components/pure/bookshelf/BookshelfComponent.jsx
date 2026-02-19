import { useState } from "react";
import Cookies from "js-cookie";
import './bookshelf.css';
function BookshelfComponent ()  {
  const savedBook = Cookies.get("book");
  const [books, setBooks] = useState(JSON.parse(decodeURIComponent(savedBook)));
  const book = JSON.parse(decodeURIComponent(savedBook));
  
  const deleteBookfromCookies = (index) => {
    const newBooksArr = [...books];
    newBooksArr.splice(index, 1);

    Cookies.set("book", JSON.stringify(newBooksArr), {expires: 1})
    setBooks(newBooksArr)
  }
  return (
    <div className="bookshelfContent">
    <h2>Estantería</h2>
    <h2>Libros leídos</h2>
    <div className='readedBooksContent'>
{books.length > 0 ?  books.map((book, index) => (
  <div className="bookshelfBooks" key={index}>
  <h2>{book.title}</h2>
  <p>{book.authors}</p>
  <p>{book.publishedDate}</p>
  <img src={book.image}></img>
  <span className="spanDeleteBook" onClick={deleteBookfromCookies}>Eliminar</span>
  {book.comment &&<div className="commentContent">
   <h5>Tu comentario:</h5>
  <p>{book.comment}</p></div>}
  </div>
)) : 'No hay datos'}
    </div>
    </div>
  )
}
export default BookshelfComponent;