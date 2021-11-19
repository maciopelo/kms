import React from "react";
import { useAuthContext } from "../store/contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isLogged },
  } = useAuthContext();

  if (isLogged === null) return null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
