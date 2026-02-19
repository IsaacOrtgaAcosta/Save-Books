// import Modal from "../../pure/modal/Modal";
// import Cookies from "js-cookie";
import { useContext, useEffect, useRef, useState } from "react";
import './saveBooks.css';
import { ModalContext } from "../../useContext/ModalContext";

function SaveBooks({index, selectedValue, setSelectedValue}) {
    const {showModal, setShowModal, modalIndex, setModalIndex} = useContext(ModalContext);
    const option = useRef();
   
    const activeModal = () => {
        setShowModal(!showModal);
        setModalIndex(index)
        if(selectedValue === 'bookshelf'){
          setSelectedValue('Estantería');
        }
        if(selectedValue === 'library'){
          setSelectedValue('Biblioteca');
        }
    }

    


  return (
    <div className="saveButtonContent">
      <button className="saveBookButton" onClick={activeModal}>Guardar Libro</button>
      <select 
      className="selectBook" 
      name="saveBook"
      ref={option}
      onChange={() => 
      setSelectedValue(option.current.value)
      }>
      <option value='choice' disabled>
        Dónde guardar
      </option>
        <option value="bookshelf">Estantería (leídos)</option>
        <option value="library">Biblioteca (pendientes)</option>
      </select>
    </div>
  );
}
export default SaveBooks;
