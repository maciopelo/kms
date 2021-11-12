import { createContext, useReducer, useContext } from "react";
import jwt_decode from "jwt-decode";
import { authReducer } from "../reducers/auth";

let authTokens = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens"))
  : null;

let user = localStorage.getItem("authTokens")
  ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
  : null;

const authInitialState = {
  authTokens: authTokens,
  user: user,
  loading: false,
  error: null,
};

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const contextData = {
    authState: state,
    dispatch: dispatch,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
