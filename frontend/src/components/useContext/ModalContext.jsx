import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const ModalContext = createContext([]);

export const ModalProvider = ({children}) =>  {
    const [showModal, setShowModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(-1);

    return(
        <ModalContext.Provider value={{ showModal, setShowModal, modalIndex, setModalIndex }}>  
        { children }
        </ModalContext.Provider>
    )
};

ModalProvider.propTypes = {
    children : PropTypes.node.isRequired,
};