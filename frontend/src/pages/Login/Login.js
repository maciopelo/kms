import React from "react";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import AppNameWithImage from "../../components/molecules/AppNameWithImage/AppNameWithImage";
import styles from "./Login.module.scss";
import { useAuthContext } from "../../store/contexts/AuthContext";
import { Redirect } from "react-router-dom";

const Login = () => {
  const {
    authState: { isLogged },
  } = useAuthContext();

  return !isLogged ? (
    <main className={styles.container}>
      <LoginForm />
      <AppNameWithImage />
    </main>
  ) : (
    <Redirect to="/home" />
  );
};

export default Login;
