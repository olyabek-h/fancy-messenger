import React, { createContext, useContext } from 'react';

const DispatchContext = createContext({});

export function DispatchProvider({ children, dispatch }) {
    return (
        <DispatchContext.Provider value={dispatch}>
            {children}
        </DispatchContext.Provider>
    )
}

export function useDispatch() {
    return useContext(DispatchContext);
}