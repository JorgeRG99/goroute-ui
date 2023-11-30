/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    id: null,
    avatar: null,
    username: null,
    name: null,
    surname: null,
    email: null,
    password: null,
    birth: null,
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
