import React, { createContext, useContext } from 'react'

const AppStateContext = createContext({});

export function AppStateProvider({ children, state }) {
    return (
        <AppStateContext.Provider value={state}>
            {children}
        </AppStateContext.Provider>
    )
}

export function useAppState() {
    return useContext(AppStateContext);
}