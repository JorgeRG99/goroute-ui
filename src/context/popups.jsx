/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState({});

  return (
    <PopupContext.Provider
      value={{
        popups,
        setPopups,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
