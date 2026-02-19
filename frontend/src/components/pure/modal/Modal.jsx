import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../useContext/ModalContext";
import "./modal.css";

function Modal({ booksData, selectedValue, setSelectedValue }) {
  const { setShowModal, modalIndex } = useContext(ModalContext);
  const [comment, setComment] = useState("");
  const [saveButtonText, setSaveButtonText] = useState('Guardar en')
  const [existSelectedValue, setExisteSelectedValue] = useState(true);
  const closeModal = () => {
    setShowModal(false);
  };

  const saveCookies = () => {
    setSaveButtonText('Guardando...');
    setExisteSelectedValue(false);
    const bookToSave = booksData[modalIndex];
    const savedBook = Cookies.get("book");
    const bookArr = savedBook ? JSON.parse(decodeURIComponent(savedBook)) : []
    console.log(bookArr)
    if (bookArr.length < 5){

   
    bookArr.push(
      {
        title: bookToSave?.title,
        authors: bookToSave?.authors[0],
        publishedDate: bookToSave.publishedDate,
        image: bookToSave?.imageLinks?.thumbnail,
        comment,
      },
    );
    Cookies.set("book", JSON.stringify(bookArr), { expires: 1 });
   
    setTimeout(() => {
      setShowModal(false)
      setExisteSelectedValue(true);
    }, '1000');
    
   }else if(bookArr.length = 5){
    alert('Ya has guardado el máximo de libros permitidos');
   }
  };
  return (
    <div className="modalOverlay" onClick={closeModal}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h4 className="modalTitle">Comenta la obra:</h4>
        <textarea
          maxLength="150"
          className="textArea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ejemplo: La trama da muchos giros, un thriller que me llenó de emociones en cada capítulo. En esta obra el autor dio un giro con respecto al estilo de su anterior novela. 
  a(Máximo 150 caracteres)"
        ></textarea>
        <button className="saveButtonModal" onClick={saveCookies}>
          {saveButtonText} {existSelectedValue ? selectedValue : ''}
        </button>
      </div>
    </div>
  );
}

export default Modal;
