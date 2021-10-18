import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(/*null*/ initialToken);
  //!! -> This simply converts this truthy or falsy value to a true or false boolean value.
  const userIsLoggedIn = !!token; // !!token -> if token is string that's not empty, return true - if token is string that's empty, return false

  const loginHandler = (token) => {
    setToken(token);
    // If the user logs in, we wanna to store that token in LOCAL STORAGE
    // ("token", token) -> a key and a value
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
