import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const CounterContext = createContext(null);

export const CounterProvider = ({ children }) => {
    const [startIn, setStartIn] = useState(0);

    return (
        <CounterContext.Provider value={{ startIn, setStartIn }}>
        {children}
        </CounterContext.Provider>
    );
};

CounterProvider.propTypes = {
    children: PropTypes.node.isRequired,
}