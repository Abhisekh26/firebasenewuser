import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// export const AuthContextProvider = (props) => {
//   const intialToken=localStorage.getItem("token")
//   const [token, setToken] = useState(intialToken);

//   const userIsLoggedIn = !!token;

//   function loginHandler(token) {
//     setToken(token);
//     localStorage.setItem('token',token)
//   }

//   function logoutHandler() {
//     setToken(null);
//     localStorage.removeItem("token")
//   }
//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };


export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [timeoutId, setTimeoutId] = useState(null);

  const userIsLoggedIn = !!token;

  useEffect(() => {
    const logoutAfterTimeout = () => {
      const id = setTimeout(() => {
        logoutHandler();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
      setTimeoutId(id);
    };

    if (userIsLoggedIn) {
      logoutAfterTimeout();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [token, userIsLoggedIn]); // useEffect dependency array

  function loginHandler(token) {
    setToken(token);
    localStorage.setItem("token", token);
    logoutAfterTimeout(); // Reset timeout on login
  }

  function logoutHandler() {
    setToken(null);
    localStorage.removeItem("token");
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear timeout on logout
    }
  }

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
