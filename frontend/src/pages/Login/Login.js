import React from "react";
import LoginForm from "../../components/organisms/LoginForm/LoginForm";
import AppNameWithImage from "../../components/molecules/AppNameWithImage/AppNameWithImage";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <main className={styles.container}>
      <LoginForm />
      <AppNameWithImage />
    </main>
  );
};

export default Login;
