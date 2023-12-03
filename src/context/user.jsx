import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    id: null,
    authToken: null,
    avatar: null,
    username: null,
    name: null,
    surname: null,
    email: null,
    birth: null,
    biography: null,
    followers: null,
    followed: null,
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
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
