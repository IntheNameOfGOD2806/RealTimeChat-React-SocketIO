import PropTypes from "prop-types";
import * as React from "react";
import { createContext } from "react";
export const AuthContext = createContext();
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }
  const [authUser, setAuthUser] = React.useState(
    JSON.parse(localStorage.getItem("auth-user") || null)
  );
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser: (user) => {
          setAuthUser(user);
          localStorage.setItem("auth-user", JSON.stringify(user));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
