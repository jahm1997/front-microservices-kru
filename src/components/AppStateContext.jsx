import React, { createContext, useState, useContext } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [globalState, setGlobalState] = useState({});
  const [contactos, setContactos] = useState([]);
  const [tareas, setTareas] = useState([]);

  return (
    <AppStateContext.Provider
      value={{
        globalState,
        setGlobalState,
        contactos,
        setContactos,
        tareas,
        setTareas,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
