import { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer } from "../reducers/auth";
import { authUser } from "../actions";

const authInitialState = {
  user: null,
  isLogged: null,
  loading: false,
  error: false,
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

  useEffect(() => {
    authUser(dispatch);
  }, []);

  const contextData = {
    authState: state,
    dispatch: dispatch,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
